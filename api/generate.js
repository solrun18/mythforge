import { CATEGORY_META } from '../src/data/library.js';

// Vercel serverless function: POST /api/generate
// Two response shapes depending on category:
//   - Normal categories: { source: 'ai', options: [{ id, title, description }, ...] }
//   - category === 'openingScene': { source: 'ai', scene: '<prose text>' }
// If ANTHROPIC_API_KEY isn't configured (or anything goes wrong), responds
// with { source: 'local-fallback-required' } so the client can fall back.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(200).json({ source: 'local-fallback-required' });
  }

  const { category, context, count = 4 } = req.body || {};
  const meta = CATEGORY_META[category];
  if (!meta) {
    return res.status(400).json({ error: `Unknown category: ${category}` });
  }

  const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5';
  const isOpeningScene = category === 'openingScene';

  const userContent = isOpeningScene
    ? `Write a short OPENING SCENE for this high-fantasy story — 3 to 4 paragraphs of evocative prose that ` +
      `draws on the specific world, magic system, characters, and plot points already chosen below. Ground it ` +
      `in concrete, specific details from the World Bible rather than generic fantasy imagery. Do not summarize ` +
      `the whole plot — just open the story.\n\n` +
      `World Bible:\n${JSON.stringify(context || {}, null, 2)}\n\n` +
      `Respond with ONLY the prose itself — no title, no headers, no commentary, no markdown formatting.`
    : `${meta.aiInstruction}\n\n` +
      `World Bible context chosen so far (may be partial):\n${JSON.stringify(context || {}, null, 2)}\n\n` +
      `Return exactly ${count} options as a JSON array. Each item must be an object with a "title" ` +
      `(2-6 words, evocative) and a "description" (1-3 sentences, high-fantasy tone). ` +
      `Respond with ONLY the JSON array, nothing else.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: isOpeningScene ? 900 : 1024,
        system:
          'You are the creative worldbuilding engine behind Mythforge, a high-fantasy story generator. ' +
          'You generate secondary-world (non-Earth) high fantasy content in a mythic, evocative tone. ' +
          (isOpeningScene
            ? 'Respond with ONLY the requested prose — no JSON, no markdown fences, no commentary.'
            : 'Every option in a batch must be clearly distinct from the others in tone and content. ' +
              'Respond with ONLY valid JSON — no prose, no markdown code fences, no commentary.'),
        messages: [{ role: 'user', content: userContent }],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Anthropic API ${response.status}: ${errBody}`);
    }

    const data = await response.json();
    const text = data.content?.find((block) => block.type === 'text')?.text || '';

    if (isOpeningScene) {
      const scene = text.trim();
      if (!scene) throw new Error('Model returned empty scene');
      return res.status(200).json({ source: 'ai', scene });
    }

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array found in model response');

    const parsed = JSON.parse(jsonMatch[0]);
    const stamp = Date.now();
    const options = parsed
      .filter((opt) => opt && opt.title && opt.description)
      .map((opt, i) => ({
        id: `${category}-ai-${stamp}-${i}`,
        title: String(opt.title),
        description: String(opt.description),
      }));

    if (!options.length) throw new Error('Model returned no usable options');

    return res.status(200).json({ source: 'ai', options });
  } catch (err) {
    console.error('Mythforge /api/generate error:', err);
    // Fail soft: let the client fall back to the local generator rather
    // than showing an error state for what's meant to be a fun tool.
    return res.status(200).json({ source: 'local-fallback-required' });
  }
}
