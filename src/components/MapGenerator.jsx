import React, { useState } from 'react';
import { generateImage } from '../lib/imageClient.js';
import { MAP_PLACEHOLDER_SVG } from '../assets/mapPlaceholder.js';
import { SKIPPED } from '../lib/constants.js';
import { useWorldBible, useWorldBibleActions } from '../context/WorldBibleContext.jsx';
import { useGenerationMode } from '../context/GenerationModeContext.jsx';
import GenerationModeToggle from './GenerationModeToggle.jsx';

function buildMapPrompt(worldBible) {
  const premise = worldBible.worldBuilding.premise;
  const geography = worldBible.worldBuilding.geography;
  const premiseText = premise && premise !== SKIPPED ? premise.title + ': ' + premise.description : 'a high-fantasy secondary world';
  const geoText = geography && geography !== SKIPPED ? geography.title + ': ' + geography.description : 'varied, dramatic terrain';

  return (
    `A detailed and realistic fantasy world map, rendered terrain with visible mountain shading, ` +
    `forest density, coastlines, and lighting — not a stylized or cartoon-icon map. ` +
    `World premise: ${premiseText}. Geography: ${geoText}. ` +
    `Top-down cartographic view, rich color, painterly realism, no text or labels on the map itself.`
  );
}

export default function MapGenerator() {
  const worldBible = useWorldBible();
  const { lockField } = useWorldBibleActions();
  const { mode } = useGenerationMode('map');
  const map = worldBible.map;

  const [loading, setLoading] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');
  const [newLocationNote, setNewLocationNote] = useState('');

  async function handleGenerate() {
    setLoading(true);
    const prompt = buildMapPrompt(worldBible);
    const result = await generateImage(prompt, '1024x1024', mode);
    if (result.source === 'ai') {
      lockField('map', 'imageDataUrl', result.imageDataUrl);
      lockField('map', 'prompt', prompt);
      lockField('map', 'source', 'ai');
    } else {
      lockField('map', 'source', 'unavailable');
    }
    setLoading(false);
  }

  function handleAddLocation(e) {
    e.preventDefault();
    if (!newLocationName.trim()) return;
    const location = { id: `loc-${Date.now()}`, name: newLocationName.trim(), note: newLocationNote.trim() };
    lockField('map', 'locations', [...(map.locations || []), location]);
    setNewLocationName('');
    setNewLocationNote('');
  }

  function handleRemoveLocation(id) {
    lockField('map', 'locations', (map.locations || []).filter((l) => l.id !== id));
  }

  const hasImage = Boolean(map.imageDataUrl);
  const isUnavailable = map.source === 'unavailable' && !hasImage;

  return (
    <div className="gen-block">
      <div className="gen-block__header">
        <div>
          <h3>World Map</h3>
          <p className="gen-block__hint">Detailed, realistic style — seeded from your world premise and geography.</p>
        </div>
        {hasImage && (
          <button
            type="button"
            className="btn btn-ghost-small"
            onClick={handleGenerate}
            disabled={loading || mode === 'local'}
            title={mode === 'local' ? 'Switch to AI to regenerate' : undefined}
          >
            {loading ? 'Drawing…' : 'Regenerate'}
          </button>
        )}
      </div>

      {!hasImage && !loading && (
        <div className="opening-scene__cta">
          <button
            type="button"
            className="btn btn-primary-small"
            onClick={handleGenerate}
            disabled={mode === 'local'}
          >
            {mode === 'local' ? 'Switch to AI to generate a map' : 'Generate Map'}
          </button>
        </div>
      )}

      {loading && <div className="gen-block__loading">✦ drawing the map…</div>}

      {!loading && hasImage && (
        <img className="map-image" src={map.imageDataUrl} alt="Generated world map" />
      )}

      {!loading && isUnavailable && (
        <div className="image-placeholder" dangerouslySetInnerHTML={{ __html: MAP_PLACEHOLDER_SVG }} />
      )}

      {!loading && (
        <div className="gen-block__footer">
          <GenerationModeToggle modeKey="map" compact />
          {hasImage && <p className="gen-block__source">✦ AI generated</p>}
        </div>
      )}

      <div className="location-list">
        <h4>Named Locations</h4>
        {(map.locations || []).length === 0 && <p className="summary-empty">No locations added yet.</p>}
        <ul>
          {(map.locations || []).map((loc) => (
            <li key={loc.id}>
              <span><strong>{loc.name}</strong>{loc.note ? ` — ${loc.note}` : ''}</span>
              <button type="button" className="btn btn-link" onClick={() => handleRemoveLocation(loc.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <form className="location-form" onSubmit={handleAddLocation}>
          <input
            type="text"
            placeholder="Location name"
            value={newLocationName}
            onChange={(e) => setNewLocationName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Short note (optional)"
            value={newLocationNote}
            onChange={(e) => setNewLocationNote(e.target.value)}
          />
          <button type="submit" className="btn btn-ghost-small">Add</button>
        </form>
      </div>
    </div>
  );
}
