import React, { useState } from 'react';
import { generateOpeningScene } from '../lib/generateClient.js';
import { SKIPPED } from '../lib/constants.js';
import { useWorldBible, useWorldBibleActions } from '../context/WorldBibleContext.jsx';

export default function OpeningSceneGenerator() {
  const worldBible = useWorldBible();
  const { lockField } = useWorldBibleActions();
  const locked = worldBible.openingScene.scene;
  const isSkipped = locked === SKIPPED;
  const isSet = locked && !isSkipped;

  const [loading, setLoading] = useState(false);
  const [draftText, setDraftText] = useState(isSet ? locked.text : '');

  async function handleGenerate() {
    setLoading(true);
    const { text, source } = await generateOpeningScene(worldBible);
    setDraftText(text);
    lockField('openingScene', 'scene', { text, source });
    setLoading(false);
  }

  function handleSkip() {
    lockField('openingScene', 'scene', SKIPPED);
  }

  function handleTryAgain() {
    lockField('openingScene', 'scene', null);
  }

  function handleSaveEdit(text) {
    setDraftText(text);
    if (isSet) lockField('openingScene', 'scene', { ...locked, text });
  }

  if (isSkipped) {
    return (
      <div className="gen-block gen-block--skipped">
        <div className="gen-block__header">
          <h3>Opening Scene</h3>
          <button type="button" className="btn btn-link" onClick={handleTryAgain}>Try again</button>
        </div>
        <p className="skipped-note">— Skipped —</p>
      </div>
    );
  }

  return (
    <div className="gen-block">
      <div className="gen-block__header">
        <div>
          <h3>Opening Scene <span className="badge-optional">optional</span></h3>
          <p className="gen-block__hint">A few paragraphs of prose to kick the story off, drawn from everything you've built so far.</p>
        </div>
        {isSet && (
          <div className="gen-block__actions">
            <button type="button" className="btn btn-ghost-small" onClick={handleGenerate} disabled={loading}>
              {loading ? 'Writing…' : 'Regenerate'}
            </button>
            <button type="button" className="btn btn-ghost-small" onClick={handleSkip} disabled={loading}>
              Clear
            </button>
          </div>
        )}
      </div>

      {!isSet && !loading && (
        <div className="opening-scene__cta">
          <button type="button" className="btn btn-primary-small" onClick={handleGenerate}>
            Generate Opening Scene
          </button>
          <button type="button" className="btn btn-ghost-small" onClick={handleSkip}>
            Skip this bonus step
          </button>
        </div>
      )}

      {loading && <div className="gen-block__loading">✦ writing the first page…</div>}

      {isSet && !loading && (
        <>
          <textarea
            className="opening-scene__textarea"
            value={draftText}
            onChange={(e) => handleSaveEdit(e.target.value)}
            rows={10}
          />
          <p className="gen-block__source">
            {locked.source === 'ai' ? '✦ AI generated' : '✦ Local template (add an API key for real AI prose)'}
          </p>
        </>
      )}
    </div>
  );
}
