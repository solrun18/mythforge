import React from 'react';
import { useWorldBible, useWorldBibleActions } from '../context/WorldBibleContext.jsx';
import { worldBibleToMarkdown, downloadMarkdown } from '../lib/exportWorldBible.js';
import { SKIPPED } from '../lib/constants.js';
import { SUBPLOT_TYPES } from '../data/library.js';

const SUBPLOT_LABEL_BY_ID = Object.fromEntries(SUBPLOT_TYPES.map((s) => [s.id, s.label]));

function EntryList({ entries }) {
  const visible = Object.entries(entries).filter(([, entry]) => entry && entry !== SKIPPED);
  if (!visible.length) return <p className="summary-empty">Nothing here — every field was skipped.</p>;
  return visible.map(([field, entry]) => (
    <div key={field} className="summary-entry">
      {entry.portraitDataUrl && (
        <img src={entry.portraitDataUrl} alt={entry.title} className="summary-entry__portrait" />
      )}
      <h4>{entry.title}</h4>
      <p>{entry.description}</p>
    </div>
  ));
}

export default function StepSummary({ onBack, onStartFresh }) {
  const worldBible = useWorldBible();
  const { reset } = useWorldBibleActions();

  function handleExport() {
    const markdown = worldBibleToMarkdown(worldBible, worldBible.worldBuilding.premise?.title || 'My World');
    const filename = `${(worldBible.worldBuilding.premise?.title || 'mythforge-world').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
    downloadMarkdown(filename, markdown);
  }

  function handleStartFresh() {
    reset();
    onStartFresh();
  }

  const { worldBuilding, map, magicSystem, characters, plot, openingScene } = worldBible;
  const subplotTypes = plot.subplotTypes || [];
  const scene = openingScene.scene;
  const hasScene = scene && scene !== SKIPPED;
  const hasMap = Boolean(map?.imageDataUrl);
  const hasLocations = (map?.locations || []).length > 0;

  return (
    <div className="step">
      <div className="step__intro">
        <h2>Your Story Kit</h2>
        <p>Everything you've locked in, in one place. Export it, then take it into whatever you write next.</p>
      </div>

      {(hasMap || hasLocations) && (
        <section className="summary-section summary-section--scene">
          <h3>Map</h3>
          {hasMap && <img src={map.imageDataUrl} alt="World map" className="map-image" />}
          {hasLocations && (
            <ul className="summary-locations">
              {map.locations.map((loc) => (
                <li key={loc.id}><strong>{loc.name}</strong>{loc.note ? ` — ${loc.note}` : ''}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      <div className="summary-grid">
        <section className="summary-section">
          <h3>World Building</h3>
          <EntryList entries={worldBuilding} />
        </section>

        <section className="summary-section">
          <h3>Magic System</h3>
          <EntryList entries={magicSystem} />
        </section>

        <section className="summary-section">
          <h3>Characters</h3>
          <EntryList entries={characters} />
        </section>

        <section className="summary-section">
          <h3>Plot</h3>
          {subplotTypes.length > 0 && (
            <p className="summary-subplot-tags">
              {subplotTypes.map((id) => (
                <span key={id} className="badge-optional">{SUBPLOT_LABEL_BY_ID[id] || id}</span>
              ))}
            </p>
          )}
          <EntryList
            entries={{
              ...Object.fromEntries(subplotTypes.map((id) => [`subplot_${id}`, plot[`subplot_${id}`]])),
              beat_call: plot.beat_call,
              beat_threshold: plot.beat_threshold,
              beat_trials: plot.beat_trials,
              beat_ordeal: plot.beat_ordeal,
              beat_climax: plot.beat_climax,
              beat_resolution: plot.beat_resolution,
            }}
          />
        </section>
      </div>

      {hasScene && (
        <section className="summary-section summary-section--scene">
          <h3>Opening Scene</h3>
          <p className="opening-scene__summary-text">{scene.text}</p>
        </section>
      )}

      <div className="step__actions step__actions--split">
        <button type="button" className="btn btn-ghost-small" onClick={onBack}>
          ← Back
        </button>
        <div className="step__actions-right">
          <button type="button" className="btn btn-ghost-small" onClick={handleStartFresh}>
            Start Fresh
          </button>
          <button type="button" className="btn btn-primary" onClick={handleExport}>
            Export as Markdown
          </button>
        </div>
      </div>

      <p className="summary-note">
        Mythforge keeps everything in this session only — nothing is saved once you close the tab.
        Export before you leave if you want to keep it. Portrait/map images are embedded as base64
        inside the exported Markdown, so the file may be a few MB if you generated several images.
      </p>
    </div>
  );
}
