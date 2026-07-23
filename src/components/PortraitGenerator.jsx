import React, { useState } from 'react';
import { generateImage } from '../lib/imageClient.js';
import { PORTRAIT_PLACEHOLDER_SVG } from '../assets/portraitPlaceholder.js';
import { useWorldBible, useWorldBibleActions } from '../context/WorldBibleContext.jsx';
import { useGenerationMode } from '../context/GenerationModeContext.jsx';
import GenerationModeToggle from './GenerationModeToggle.jsx';

function buildPortraitPrompt(character, roleLabel) {
  return (
    `A painterly, dramatic high-fantasy character portrait in a book-cover illustration style — ` +
    `rich jewel-tone lighting, evocative and romantic, not photorealistic. ` +
    `Character (${roleLabel}): ${character.title}. ${character.description} ` +
    `Portrait framing, shoulders-up or three-quarter view, detailed clothing and expression.`
  );
}

export default function PortraitGenerator({ role, roleLabel }) {
  const worldBible = useWorldBible();
  const { lockField } = useWorldBibleActions();
  const { mode } = useGenerationMode(`portrait_${role}`);
  const character = worldBible.characters[role];
  const [loading, setLoading] = useState(false);

  if (!character) return null; // handled by parent (skipped/unset characters don't get a portrait slot)

  async function handleGenerate() {
    setLoading(true);
    const prompt = buildPortraitPrompt(character, roleLabel);
    const result = await generateImage(prompt, '1024x1024', mode);
    if (result.source === 'ai') {
      lockField('characters', role, { ...character, portraitDataUrl: result.imageDataUrl, portraitSource: 'ai' });
    } else {
      lockField('characters', role, { ...character, portraitSource: 'unavailable' });
    }
    setLoading(false);
  }

  const hasPortrait = Boolean(character.portraitDataUrl);
  const isUnavailable = character.portraitSource === 'unavailable' && !hasPortrait;

  return (
    <div className="portrait-card">
      {loading && <div className="image-placeholder-loading">✦</div>}
      {!loading && hasPortrait && <img src={character.portraitDataUrl} alt={character.title} />}
      {!loading && !hasPortrait && (
        <div className="image-placeholder" dangerouslySetInnerHTML={{ __html: PORTRAIT_PLACEHOLDER_SVG }} />
      )}
      <h4>{character.title}</h4>
      <p className="gen-block__hint">{roleLabel}</p>
      <GenerationModeToggle modeKey={`portrait_${role}`} compact />
      <button
        type="button"
        className="btn btn-ghost-small"
        onClick={handleGenerate}
        disabled={loading || mode === 'local'}
        title={mode === 'local' ? 'Switch to AI to generate' : undefined}
      >
        {loading ? 'Painting…' : mode === 'local' ? 'Needs AI' : hasPortrait ? 'Regenerate' : 'Generate Portrait'}
      </button>
      {isUnavailable && mode === 'ai' && <p className="gen-block__source">Add OPENAI_API_KEY to generate portraits</p>}
    </div>
  );
}
