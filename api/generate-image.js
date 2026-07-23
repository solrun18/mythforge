// Vercel serverless function: POST /api/generate-image
// Body: { prompt: string, size?: string }
// Uses the OpenAI Images API (server-side only — key never reaches the client).
// If OPENAI_API_KEY isn't configured, or the request fails for any reason,
// responds with { source: 'unavailable' } so the client can show a
// placeholder graphic instead of erroring out.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(200).json({ source: 'unavailable' });
  }

  const { prompt, size = '1024x1024' } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'A text prompt is required' });
  }

  try {
    const model = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, prompt, size, n: 1 }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`OpenAI Images API ${response.status}: ${errBody}`);
    }

    const data = await response.json();
    const item = data.data?.[0];
    if (!item) throw new Error('No image returned');

    // gpt-image-1 typically returns base64; some models/configs return a URL instead.
    if (item.b64_json) {
      return res.status(200).json({ source: 'ai', imageDataUrl: `data:image/png;base64,${item.b64_json}` });
    }
    if (item.url) {
      return res.status(200).json({ source: 'ai', imageUrl: item.url });
    }
    throw new Error('Response contained neither b64_json nor url');
  } catch (err) {
    console.error('Mythforge /api/generate-image error:', err);
    return res.status(200).json({ source: 'unavailable' });
  }
}
