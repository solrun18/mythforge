import React from 'react';
import GeneratorBlock from '../components/GeneratorBlock.jsx';

const FIELDS = [
  { field: 'protagonist', category: 'character_protagonist' },
  { field: 'mentor', category: 'character_mentor' },
  { field: 'rival', category: 'character_rival' },
  { field: 'antagonist', category: 'character_antagonist' },
];

export default function StepCharacters({ onContinue, onBack }) {
  return (
    <div className="step">
      <div className="step__intro">
        <h2>Characters</h2>
        <p>A small cast, shaped by the world and magic system you've already built. Skip any role that isn't part of this story.</p>
      </div>

      {FIELDS.map(({ field, category }) => (
        <GeneratorBlock key={field} section="characters" field={field} category={category} />
      ))}

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
