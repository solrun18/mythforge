import React, { useEffect, useRef, useState } from 'react';
import { useWorldBible, useWorldBibleActions } from '../context/WorldBibleContext.jsx';
import { worldBibleToMarkdown, downloadMarkdown } from '../lib/exportWorldBible.js';
import { exportBlocksAsPdf } from '../lib/exportPdf.js';
import StoryKitPrintSheet from '../components/StoryKitPrintSheet.jsx';
import Toast from '../components/Toast.jsx';
import SaveWorldModal from '../components/SaveWorldModal.jsx';
import AuthModal from '../components/auth/AuthModal.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { supabase } from '../lib/supabaseClient.js';
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
  const { isConfigured, user } = useAuth();
  const printSheetRef = useRef(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [pendingSave, setPendingSave] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [showSavedToast, setShowSavedToast] = useState(false);

  const worldName = worldBible.worldBuilding.premise?.title || 'My World';
  const slug = (worldBible.worldBuilding.premise?.title || 'mythforge-world').toLowerCase().replace(/[^a-z0-9]+/g, '-');

  function handleExportMarkdown() {
    const markdown = worldBibleToMarkdown(worldBible, worldName);
    downloadMarkdown(`${slug}.md`, markdown);
  }

  async function handleExportPdf() {
    setPdfError(false);
    setPdfLoading(true);
    try {
      const blocks = Array.from(printSheetRef.current.querySelectorAll('[data-pdf-block]'));
      await exportBlocksAsPdf(blocks, `${slug}.pdf`);
    } catch (err) {
      setPdfError(true);
    } finally {
      setPdfLoading(false);
    }
  }

  async function saveWorld(name) {
    setSaving(true);
    setSaveError('');
    const { error } = await supabase.from('worlds').insert({
      user_id: user.id,
      name,
      world_bible: worldBible,
    });
    setSaving(false);
    if (error) {
      setSaveError(error.message);
      return;
    }
    setSaveModalOpen(false);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 1600);
  }

  function handleSaveWorld() {
    if (!user) {
      setPendingSave(true);
      setAuthOpen(true);
      return;
    }
    setSaveError('');
    setSaveModalOpen(true);
  }

  // If the save was gated behind a login prompt, pick up right where we
  // left off once the user actually logs in — pop the naming modal
  // instead of making them click "Save World" a second time.
  useEffect(() => {
    if (user && pendingSave) {
      setPendingSave(false);
      setSaveError('');
      setSaveModalOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

      <div className="summary-capture">
        <div className="summary-capture__title">
          <p className="app-header__eyebrow">✦ Mythforge Story Kit ✦</p>
          <h2>{worldName}</h2>
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
      </div>

      <div className="pdf-sheet-offscreen">
        <StoryKitPrintSheet ref={printSheetRef} worldBible={worldBible} worldName={worldName} />
      </div>

      <div className="step__actions step__actions--split">
        <button type="button" className="btn btn-ghost-small" onClick={onBack}>
          ← Back
        </button>
        <div className="step__actions-right">
          <button type="button" className="btn btn-ghost-small" onClick={handleStartFresh}>
            Start Fresh
          </button>
          {isConfigured && (
            <button type="button" className="btn btn-ghost-small" onClick={handleSaveWorld} disabled={saving}>
              {saving ? 'Saving…' : 'Save World'}
            </button>
          )}
          <button type="button" className="btn btn-ghost-small" onClick={handleExportMarkdown}>
            Export as Markdown
          </button>
          <button type="button" className="btn btn-primary" onClick={handleExportPdf} disabled={pdfLoading}>
            {pdfLoading ? 'Preparing PDF…' : 'Export as PDF'}
          </button>
        </div>
      </div>

      {pdfError && (
        <p className="summary-note summary-note--error">
          Couldn't generate the PDF — try again, or use the Markdown export instead.
        </p>
      )}

      <p className="summary-note">
        Mythforge keeps everything in this session only unless you save it to your account.
        {isConfigured ? ' Log in and hit "Save World" to keep it, or export' : ' Export'} before you
        leave if you want to keep it. Portrait/map images are embedded directly in both export
        formats, so files may be a few MB if you generated several images.
      </p>

      <AuthModal isOpen={authOpen} onClose={() => { setAuthOpen(false); setPendingSave(false); }} initialMode="login" />
      <SaveWorldModal
        isOpen={saveModalOpen}
        defaultName={worldName}
        saving={saving}
        error={saveError}
        onCancel={() => setSaveModalOpen(false)}
        onConfirm={saveWorld}
      />
      <Toast show={showSavedToast}>Your world has been saved ✨</Toast>
    </div>
  );
}
