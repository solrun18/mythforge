import React, { useEffect, useState } from 'react';
import OptionCard from './OptionCard.jsx';
import { generateOptions } from '../lib/generateClient.js';
import { CATEGORY_META } from '../data/library.js';
import { SKIPPED } from '../lib/constants.js';
import { useWorldBible, useWorldBibleActions } from '../context/WorldBibleContext.jsx';

// The core "generate -> present -> select, randomize, or skip -> lock in"
// loop, reused for every world-building, magic-system, character, and
// plot-beat sub-prompt.
//
// Three ways a field can resolve:
//   - Locked to a chosen option (reviewed and confirmed, or randomized)
//   - Explicitly skipped (SKIPPED sentinel) — shown as its own quiet state
//   - Left in-progress — if the user never acts on it, it's just absent
//     from the World Bible. No field is ever auto-filled with a default.
export default function GeneratorBlock({ section, field, category, count = 4 }) {
  const worldBible = useWorldBible();
  const { lockField } = useWorldBibleActions();
  const meta = CATEGORY_META[category];
  const locked = worldBible[section][field];
  const isSkipped = locked === SKIPPED;
  const isLocked = locked && !isSkipped;

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState(null);
  const [selected, setSelected] = useState(null);
  const [draftText, setDraftText] = useState('');

  async function runGenerate() {
    setLoading(true);
    setSelected(null);
    const { options: opts, source: src } = await generateOptions(category, worldBible, count);
    setOptions(opts);
    setSource(src);
    setLoading(false);
  }

  useEffect(() => {
    if (!locked) runGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked]);

  function handleSelect(option) {
    setSelected(option);
    setDraftText(option.description);
  }

  function handleLockIn() {
    if (!selected) return;
    lockField(section, field, { ...selected, description: draftText });
  }

  function handleChange() {
    lockField(section, field, null);
  }

  function handleSkip() {
    lockField(section, field, SKIPPED);
  }

  function handleRandomize() {
    if (!options.length) return;
    const pick = options[Math.floor(Math.random() * options.length)];
    lockField(section, field, pick);
  }

  if (isSkipped) {
    return (
      <div className="gen-block gen-block--skipped">
        <div className="gen-block__header">
          <h3>{meta.label}</h3>
          <button type="button" className="btn btn-link" onClick={handleChange}>Try again</button>
        </div>
        <p className="skipped-note">— Skipped —</p>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="gen-block gen-block--locked">
        <div className="gen-block__header">
          <h3>{meta.label}</h3>
          <button type="button" className="btn btn-link" onClick={handleChange}>Change</button>
        </div>
        <div className="locked-summary">
          <h4>{locked.title}</h4>
          <p>{locked.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gen-block">
      <div className="gen-block__header">
        <div>
          <h3>{meta.label}</h3>
          <p className="gen-block__hint">{meta.hint}</p>
        </div>
        {!selected && (
          <div className="gen-block__actions">
            <button type="button" className="btn btn-ghost-small" onClick={runGenerate} disabled={loading}>
              {loading ? 'Conjuring…' : 'Reroll'}
            </button>
            <button type="button" className="btn btn-ghost-small" onClick={handleRandomize} disabled={loading || !options.length}>
              Surprise me
            </button>
            <button type="button" className="btn btn-ghost-small" onClick={handleSkip} disabled={loading}>
              Skip
            </button>
          </div>
        )}
      </div>

      {loading && <div className="gen-block__loading">✦ weaving possibilities…</div>}

      {!loading && !selected && (
        <>
          <div className="option-grid">
            {options.map((opt) => (
              <OptionCard key={opt.id} option={opt} isSelected={false} onSelect={handleSelect} />
            ))}
          </div>
          <p className="gen-block__source">
            {source === 'ai' ? '✦ AI generated' : '✦ Local roll (add an API key for AI generation)'}
          </p>
        </>
      )}

      {!loading && selected && (
        <div className="confirm-panel">
          <h4>{selected.title}</h4>
          <textarea
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            rows={3}
          />
          <div className="confirm-panel__actions">
            <button type="button" className="btn btn-ghost-small" onClick={() => setSelected(null)}>
              Back to options
            </button>
            <button type="button" className="btn btn-primary-small" onClick={handleLockIn}>
              Lock it in
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
