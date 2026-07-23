import React from 'react';

const STEPS = ['World', 'Map', 'Magic', 'Characters', 'Portraits', 'Plot', 'Scene', 'Story Kit'];

export default function ProgressSteps({ current }) {
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
          <span className="progress-steps__index">{i < current ? '✦' : i + 1}</span>
          <span>{label}</span>
        </li>
      ))}
    </ol>
  );
}
