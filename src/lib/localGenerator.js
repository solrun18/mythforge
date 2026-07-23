import { LIBRARY } from '../data/library.js';

// Fisher-Yates shuffle so repeated calls don't just re-sort predictably.
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Local, no-API fallback generator. Picks a random, non-repeating subset
// from the content library for the given category. Works with zero setup,
// so Mythforge is fully usable before anyone adds an API key.
export function generateLocalOptions(category, count = 4) {
  const pool = LIBRARY[category] || [];
  const picked = shuffle(pool).slice(0, Math.min(count, pool.length));
  const stamp = Date.now();
  return picked.map((item, i) => ({
    id: `${category}-local-${stamp}-${i}`,
    title: item.title,
    description: item.description,
  }));
}
