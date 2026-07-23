// Calls the image-generation serverless endpoint. Unlike the text
// generators, there's no meaningful "local fallback" for an actual image —
// instead, callers should show one of the static placeholder graphics
// (src/assets/*.svg) when source === 'unavailable'.
//
// In 'local' mode (the default), we skip the paid API call entirely and
// go straight to 'unavailable' so the placeholder shows immediately —
// image generation only ever happens when the user flips to 'ai' mode.
export async function generateImage(prompt, size = '1024x1024', mode = 'local') {
  if (mode === 'local') {
    return { source: 'unavailable' };
  }
  try {
    const res = await fetch('/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, size }),
    });

    if (!res.ok) throw new Error(`API responded ${res.status}`);

    const data = await res.json();

    if (data.source === 'unavailable') {
      return { source: 'unavailable' };
    }

    return {
      source: 'ai',
      imageDataUrl: data.imageDataUrl || data.imageUrl,
    };
  } catch (err) {
    return { source: 'unavailable' };
  }
}
