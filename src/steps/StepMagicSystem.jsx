import React from 'react';
import GeneratorBlock from '../components/GeneratorBlock.jsx';
import HardSoftChoice from '../components/HardSoftChoice.jsx';
import { useWorldBible } from '../context/WorldBibleContext.jsx';

const FIELDS = [
  { field: 'source', category: 'magicSource' },
  { field: 'access', category: 'magicAccess' },
  { field: 'costs', category: 'magicCosts' },
  { field: 'attitude', category: 'magicAttitude' },
];

export default function StepMagicSystem({ onContinue, onBack }) {
  const worldBible = useWorldBible();
  // Truthy for both a chosen option and the SKIPPED sentinel — either way,
  // the hard/soft question has been resolved and the rest can proceed.
  const hardOrSoftResolved = Boolean(worldBible.magicSystem.hardOrSoft);

  return (
    <div className="step">
      <div className="step__intro">
        <h2>Magic System</h2>
        <p>Pick a point on the hard/soft spectrum first (or skip it) — it changes what the rest of these questions mean.</p>
      </div>

      <HardSoftChoice />

      {hardOrSoftResolved &&
        FIELDS.map(({ field, category }) => (
          <GeneratorBlock key={field} section="magicSystem" field={field} category={category} />
        ))}

      <div className="step__actions step__actions--split">
        <button type="button" className="btn btn-ghost-small" onClick={onBack}>
          ← Back
        </button>
        <button type="button" className="btn btn-primary" onClick={onContinue}>
          Continue to Characters →
        </button>
      </div>
    </div>
  );
}
