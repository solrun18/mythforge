import React from 'react';
import { SKIPPED } from '../lib/constants.js';
import { useWorldBible, useWorldBibleActions } from '../context/WorldBibleContext.jsx';

const CHOICES = [
  {
    id: 'hard',
    title: 'Hard Magic',
    description:
      'Clear rules, costs, and limits. Magic works like a fictional science — the reader can predict what it can and can’t solve, and it can fairly resolve plot conflicts.',
  },
  {
    id: 'soft',
    title: 'Soft Magic',
    description:
      'Mysterious and underexplained on purpose. Used for wonder and atmosphere rather than problem-solving — magic should not be the thing that saves your characters.',
  },
];

export default function HardSoftChoice() {
  const worldBible = useWorldBible();
  const { lockField } = useWorldBibleActions();
  const locked = worldBible.magicSystem.hardOrSoft;
  const isSkipped = locked === SKIPPED;
  const isLocked = locked && !isSkipped;

  function handleChange() {
    lockField('magicSystem', 'hardOrSoft', null);
  }

  if (isSkipped) {
    return (
      <div className="gen-block gen-block--skipped">
        <div className="gen-block__header">
          <h3>Hard or Soft Magic</h3>
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
          <h3>Hard or Soft Magic</h3>
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
          <h3>Hard or Soft Magic</h3>
          <p className="gen-block__hint">This shapes every choice after it — pick a point on the spectrum, or skip it.</p>
        </div>
        <div className="gen-block__actions">
          <button
            type="button"
            className="btn btn-ghost-small"
            onClick={() => lockField('magicSystem', 'hardOrSoft', CHOICES[Math.floor(Math.random() * CHOICES.length)])}
          >
            Surprise me
          </button>
          <button type="button" className="btn btn-ghost-small" onClick={() => lockField('magicSystem', 'hardOrSoft', SKIPPED)}>
            Skip
          </button>
        </div>
      </div>
      <div className="option-grid option-grid--two">
        {CHOICES.map((choice) => (
          <button
            key={choice.id}
            type="button"
            className="option-card"
            onClick={() => lockField('magicSystem', 'hardOrSoft', choice)}
          >
            <span className="option-card__corner option-card__corner--tl" />
            <span className="option-card__corner option-card__corner--tr" />
            <span className="option-card__corner option-card__corner--bl" />
            <span className="option-card__corner option-card__corner--br" />
            <h4 className="option-card__title">{choice.title}</h4>
            <p className="option-card__desc">{choice.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
