import React from 'react';

const STEPS = ['World', 'Map', 'Magic', 'Characters', 'Portraits', 'Plot', 'Scene', 'Story Kit'];

export default function ProgressSteps({ current, onNavigate }) {
  return (
    <ol className="progress-steps">
      {STEPS.map((label, i) => (
        <li
          key={label}
          className={
            'progress-steps__item' +
            (i === current ? ' progress-steps__item--active' : '') +
            (i < current ? ' progress-steps__item--done' : '')
          }
        >
          <button
            type="button"
            className="progress-steps__button"
            onClick={() => onNavigate(i)}
            aria-current={i === current ? 'step' : undefined}
          >
            <span className="progress-steps__index">{i < current ? '✦' : i + 1}</span>
            <span>{label}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}
