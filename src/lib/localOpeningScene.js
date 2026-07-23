import { SKIPPED } from './constants.js';

function fieldTitle(entry, fallback) {
  if (!entry || entry === SKIPPED) return fallback;
  return entry.title;
}

// A light template-based "opening scene" for when no API key is configured.
// Nowhere near as good as real generation, but keeps the app fully usable
// end-to-end without any setup.
export function generateLocalOpeningScene(worldBible) {
  const premise = fieldTitle(worldBible.worldBuilding.premise, 'a world balanced on the edge of something unnamed');
  const geography = fieldTitle(worldBible.worldBuilding.geography, 'a land of uncertain borders');
  const protagonist = fieldTitle(worldBible.characters.protagonist, 'a stranger no one had noticed yet');
  const magicSource = fieldTitle(worldBible.magicSystem.source, 'a power no one fully understood');

  const openers = [
    `The first thing anyone noticed about ${geography} was how quiet it had become. Not peaceful — quiet the way a held breath is quiet.`,
    `No one in ${geography} talked about ${premise} anymore. That, more than anything, was how you knew it was true.`,
    `${protagonist} had learned to stop asking questions about ${magicSource}. That stopped being an option today.`,
  ];

  const middles = [
    `Word of it reached the edges of ${geography} before nightfall, the way bad news always travels faster than good.`,
    `It should have been an ordinary day — the kind that gets forgotten the moment it ends. It was not going to be that kind of day.`,
    `Somewhere beneath the surface of ${premise}, something old was finally paying attention.`,
  ];

  const closers = [
    `${protagonist} did not yet know how much of what came next would be their fault. That, too, would come later.`,
    `Whatever ${magicSource} had been waiting for, it had apparently decided the wait was over.`,
    `There was no going back to how things were an hour ago. There rarely is, once a story actually begins.`,
  ];

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return [pick(openers), pick(middles), pick(closers)].join('\n\n');
}
