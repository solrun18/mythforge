import React, { forwardRef } from 'react';
import { SKIPPED } from '../lib/constants.js';
import { SUBPLOT_TYPES } from '../data/library.js';

const SUBPLOT_LABEL_BY_ID = Object.fromEntries(SUBPLOT_TYPES.map((s) => [s.id, s.label]));

function PrintEntryList({ entries }) {
  const visible = Object.entries(entries).filter(([, entry]) => entry && entry !== SKIPPED);
  if (!visible.length) return <p className="pdf-sheet__empty">— none —</p>;
  return visible.map(([field, entry]) => (
    <div key={field} className="pdf-sheet__entry">
      <div className="pdf-sheet__entry-row">
        {entry.portraitDataUrl && (
          <img src={entry.portraitDataUrl} alt="" className="pdf-sheet__thumb" />
        )}
        <h4>{entry.title}</h4>
      </div>
      <p>{entry.description}</p>
    </div>
  ));
}

/**
 * Hidden, print-only rendering of the Story Kit, used solely as the
 * html2canvas capture source for the PDF export. Kept entirely separate
 * from the on-screen summary (StepSummary.jsx) because the two have
 * different goals: the on-screen version is a spacious, readable card
 * layout with a responsive multi-width grid; this version is a fixed-width,
 * single font-size, tightly-spaced sheet designed to pack onto one A4 page.
 *
 * Rendering at a fixed pixel width (rather than the responsive on-screen
 * grid) is what keeps every section's text the same final size in the
 * PDF — capturing elements of different on-screen widths and stretching
 * them all to the same page width is what caused the font-size mismatch
 * between sections in the previous version.
 */
const StoryKitPrintSheet = forwardRef(function StoryKitPrintSheet({ worldBible, worldName }, ref) {
  const { worldBuilding, map, magicSystem, characters, plot, openingScene } = worldBible;
  const subplotTypes = plot.subplotTypes || [];
  const scene = openingScene.scene;
  const hasScene = scene && scene !== SKIPPED;
  const hasMap = Boolean(map?.imageDataUrl);
  const locations = map?.locations || [];
  const hasLocations = locations.length > 0;

  return (
    <div ref={ref} className="pdf-sheet">
      <div className="pdf-sheet__title" data-pdf-block>
        <p className="pdf-sheet__eyebrow">✦ Mythforge Story Kit ✦</p>
        <h2>{worldName}</h2>
      </div>

      {(hasMap || hasLocations) && (
        <div className="pdf-sheet__block" data-pdf-block>
          <h3>Map</h3>
          {hasMap && <img src={map.imageDataUrl} alt="World map" className="pdf-sheet__map" />}
          {hasLocations && (
            <p className="pdf-sheet__locations">
              {locations.map((loc) => `${loc.name}${loc.note ? ` (${loc.note})` : ''}`).join('  ·  ')}
            </p>
          )}
        </div>
      )}

      <div className="pdf-sheet__grid" data-pdf-block>
        <div className="pdf-sheet__section">
          <h3>World Building</h3>
          <PrintEntryList entries={worldBuilding} />
        </div>

        <div className="pdf-sheet__section">
          <h3>Magic System</h3>
          <PrintEntryList entries={magicSystem} />
        </div>

        <div className="pdf-sheet__section">
          <h3>Characters</h3>
          <PrintEntryList entries={characters} />
        </div>

        <div className="pdf-sheet__section">
          <h3>Plot</h3>
          {subplotTypes.length > 0 && (
            <p className="pdf-sheet__tags">
              {subplotTypes.map((id) => SUBPLOT_LABEL_BY_ID[id] || id).join('  ·  ')}
            </p>
          )}
          <PrintEntryList
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
        </div>
      </div>

      {hasScene && (
        <div className="pdf-sheet__block" data-pdf-block>
          <h3>Opening Scene</h3>
          <p>{scene.text}</p>
        </div>
      )}
    </div>
  );
});

export default StoryKitPrintSheet;
