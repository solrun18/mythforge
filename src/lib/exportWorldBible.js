import { SKIPPED } from './constants.js';
import { SUBPLOT_TYPES } from '../data/library.js';

const WB_LABELS = {
  premise: 'World Premise',
  geography: 'Geography & Climate',
  peoples: 'Dominant Peoples',
  originMyth: 'Origin Myth',
  historicalEvent: 'Defining Historical Event',
  government: 'Governing Power Structure',
};

const MS_LABELS = {
  hardOrSoft: 'Hard / Soft Magic',
  source: 'Source of Magic',
  access: 'Who Can Use It, and How',
  costs: 'Costs & Limits',
  attitude: 'Cultural Attitude Toward Magic',
};

const CHAR_LABELS = {
  protagonist: 'Protagonist',
  mentor: 'Mentor',
  rival: 'Rival / Love Interest',
  antagonist: 'Antagonist',
};

const BEAT_LABELS = {
  beat_call: 'Ordinary World & Call to Adventure',
  beat_threshold: 'Crossing the Threshold',
  beat_trials: 'Trials, Allies & Enemies',
  beat_ordeal: 'The Ordeal',
  beat_climax: 'Climax',
  beat_resolution: 'Resolution',
};

const SUBPLOT_LABEL_BY_ID = Object.fromEntries(SUBPLOT_TYPES.map((s) => [s.id, s.label]));

function appendEntries(lines, sectionState, labelMap) {
  for (const [field, label] of Object.entries(labelMap)) {
    const entry = sectionState[field];
    if (!entry || entry === SKIPPED) continue;
    lines.push(`### ${label}: ${entry.title}`);
    lines.push(entry.description, '');
  }
}

function appendCharacterEntries(lines, characters, labelMap) {
  for (const [field, label] of Object.entries(labelMap)) {
    const entry = characters[field];
    if (!entry || entry === SKIPPED) continue;
    lines.push(`### ${label}: ${entry.title}`);
    lines.push(entry.description, '');
    if (entry.portraitDataUrl) {
      lines.push(`![${entry.title} portrait](${entry.portraitDataUrl})`, '');
    }
  }
}

export function worldBibleToMarkdown(worldBible, worldName = 'Untitled World') {
  const lines = [`# ${worldName}`, '', '_Generated with Mythforge_', ''];

  lines.push('## World Building', '');
  appendEntries(lines, worldBible.worldBuilding, WB_LABELS);

  const map = worldBible.map;
  if (map && (map.imageDataUrl || (map.locations || []).length)) {
    lines.push('## Map', '');
    if (map.imageDataUrl) {
      lines.push(`![World map](${map.imageDataUrl})`, '');
    }
    if ((map.locations || []).length) {
      lines.push('**Named locations:**', '');
      for (const loc of map.locations) {
        lines.push(`- **${loc.name}**${loc.note ? ` — ${loc.note}` : ''}`);
      }
      lines.push('');
    }
  }

  lines.push('## Magic System', '');
  appendEntries(lines, worldBible.magicSystem, MS_LABELS);

  lines.push('## Characters', '');
  appendCharacterEntries(lines, worldBible.characters, CHAR_LABELS);

  lines.push('## Plot', '');
  const subplotTypes = worldBible.plot.subplotTypes || [];
  if (subplotTypes.length) {
    lines.push(`**Subplot flavor:** ${subplotTypes.map((id) => SUBPLOT_LABEL_BY_ID[id] || id).join(', ')}`, '');
    for (const id of subplotTypes) {
      const entry = worldBible.plot[`subplot_${id}`];
      if (!entry || entry === SKIPPED) continue;
      lines.push(`### ${SUBPLOT_LABEL_BY_ID[id] || id} Arc: ${entry.title}`);
      lines.push(entry.description, '');
    }
  }
  appendEntries(lines, worldBible.plot, BEAT_LABELS);

  const scene = worldBible.openingScene.scene;
  if (scene && scene !== SKIPPED) {
    lines.push('## Opening Scene', '');
    lines.push(scene.text, '');
  }

  return lines.join('\n');
}

export function downloadMarkdown(filename, markdown) {
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
