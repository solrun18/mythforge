import React from 'react';
import { SUBPLOT_TYPES } from '../data/library.js';
import { useWorldBible, useWorldBibleActions } from '../context/WorldBibleContext.jsx';

const MAX_SUBPLOTS = 2;

export default function SubplotPicker() {
  const worldBible = useWorldBible();
  const { lockField } = useWorldBibleActions();
  const selected = worldBible.plot.subplotTypes || [];

  function toggle(id) {
    const isSelected = selected.includes(id);
    if (isSelected) {
      lockField('plot', 'subplotTypes', selected.filter((s) => s !== id));
      return;
    }
    if (selected.length >= MAX_SUBPLOTS) return; // at cap — ignore, don't force a swap
    lockField('plot', 'subplotTypes', [...selected, id]);
  }

  function handleSurpriseMe() {
    const shuffled = [...SUBPLOT_TYPES].sort(() => Math.random() - 0.5);
    lockField('plot', 'subplotTypes', shuffled.slice(0, 1).map((s) => s.id));
  }

  function handleClearAll() {
    lockField('plot', 'subplotTypes', []);
  }

  return (
    <div className="gen-block">
      <div className="gen-block__header">
        <div>
          <h3>Subplot Flavor</h3>
          <p className="gen-block__hint">Pick up to two — or none, if you want the main plot to stand alone.</p>
        </div>
        <div className="gen-block__actions">
          <button type="button" className="btn btn-ghost-small" onClick={handleSurpriseMe}>
            Surprise me
          </button>
          <button type="button" className="btn btn-ghost-small" onClick={handleClearAll} disabled={!selected.length}>
            Clear
          </button>
        </div>
      </div>
      <div className="option-grid option-grid--two">
        {SUBPLOT_TYPES.map((type) => {
          const isSelected = selected.includes(type.id);
          const disabled = !isSelected && selected.length >= MAX_SUBPLOTS;
          return (
            <button
              key={type.id}
              type="button"
              className={`option-card${isSelected ? ' option-card--selected' : ''}`}
              onClick={() => toggle(type.id)}
              disabled={disabled}
            >
              <span className="option-card__corner option-card__corner--tl" />
              <span className="option-card__corner option-card__corner--tr" />
              <span className="option-card__corner option-card__corner--bl" />
              <span className="option-card__corner option-card__corner--br" />
              <h4 className="option-card__title">{type.label}</h4>
              <p className="option-card__desc">{type.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
