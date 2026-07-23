import React from 'react';
import PortraitGenerator from '../components/PortraitGenerator.jsx';
import { SKIPPED } from '../lib/constants.js';
import { useWorldBible } from '../context/WorldBibleContext.jsx';

const ROLES = [
  { role: 'protagonist', label: 'Protagonist' },
  { role: 'mentor', label: 'Mentor' },
  { role: 'rival', label: 'Rival / Love Interest' },
  { role: 'antagonist', label: 'Antagonist' },
];

export default function StepPortraits({ onContinue, onBack }) {
  const worldBible = useWorldBible();
  const lockedRoles = ROLES.filter(({ role }) => {
    const entry = worldBible.characters[role];
    return entry && entry !== SKIPPED;
  });

  return (
    <div className="step">
      <div className="step__intro">
        <h2>Character Portraits</h2>
        <p>Painterly, book-cover style — a deliberate contrast to the map's realistic look.</p>
      </div>

      <div className="gen-block">
        {lockedRoles.length === 0 ? (
          <p className="summary-empty">No characters were locked in on the previous step, so there's nothing to illustrate yet. Go back to add one, or just continue.</p>
        ) : (
          <div className="portrait-grid">
            {lockedRoles.map(({ role, label }) => (
              <PortraitGenerator key={role} role={role} roleLabel={label} />
            ))}
          </div>
        )}
      </div>

      <div className="step__actions step__actions--split">
        <button type="button" className="btn btn-ghost-small" onClick={onBack}>
          ← Back
        </button>
        <button type="button" className="btn btn-primary" onClick={onContinue}>
          Continue to Plot →
        </button>
      </div>
    </div>
  );
}
