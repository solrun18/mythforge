import { generateLocalOptions } from './localGenerator.js';
import { generateLocalOpeningScene } from './localOpeningScene.js';

// Tries the AI-backed serverless endpoint first. If it's unavailable
// (no API key configured, network error, bad response, etc.) it falls
// back to the local template generator so the app never dead-ends.
//
// `mode` is the user's chosen generation mode ('local' | 'ai') from the
// header toggle. When it's 'local', we skip the network call entirely —
// no cost, no latency, works offline. 'ai' keeps the old try-then-fallback
// behavior as a safety net in case the API is unavailable.
export async function generateOptions(category, context, count = 4, mode = 'local') {
  if (mode === 'local') {
    return { options: generateLocalOptions(category, count), source: 'local' };
  }
  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, context, count }),
    });

    if (!res.ok) throw new Error(`API responded ${res.status}`);

    const data = await res.json();

    if (data.source === 'local-fallback-required' || !Array.isArray(data.options) || data.options.length === 0) {
      throw new Error('AI generation unavailable');
    }

    return { options: data.options, source: 'ai' };
  } catch (err) {
    return { options: generateLocalOptions(category, count), source: 'local' };
  }
}

// Same fallback pattern, but for the opening-scene prose generator, which
// returns a single block of text instead of a batch of option cards.
export async function generateOpeningScene(worldBible, mode = 'local') {
  if (mode === 'local') {
    return { text: generateLocalOpeningScene(worldBible), source: 'local' };
  }
  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: 'openingScene', context: worldBible }),
    });

    if (!res.ok) throw new Error(`API responded ${res.status}`);

    const data = await res.json();

    if (data.source === 'local-fallback-required' || !data.scene) {
      throw new Error('AI generation unavailable');
    }

    return { text: data.scene, source: 'ai' };
  } catch (err) {
    return { text: generateLocalOpeningScene(worldBible), source: 'local' };
  }
}
