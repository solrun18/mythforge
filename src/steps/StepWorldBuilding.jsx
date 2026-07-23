import React from 'react';
import GeneratorBlock from '../components/GeneratorBlock.jsx';

const FIELDS = [
  { field: 'premise', category: 'premise' },
  { field: 'geography', category: 'geography' },
  { field: 'peoples', category: 'peoples' },
  { field: 'originMyth', category: 'originMyth' },
  { field: 'historicalEvent', category: 'historicalEvent' },
  { field: 'government', category: 'government' },
];

export default function StepWorldBuilding({ onContinue }) {
  return (
    <div className="step">
      <div className="step__intro">
        <h2>World Building</h2>
        <p>
          Start with the bones of your secondary world. Pick what speaks to you, reroll what
          doesn't, or skip any field entirely — nothing is forced or pre-picked for you.
        </p>
      </div>

      {FIELDS.map(({ field, category }) => (
        <GeneratorBlock key={field} section="worldBuilding" field={field} category={category} />
      ))}

      <div className="step__actions">
        <button type="button" className="btn btn-primary" onClick={onContinue}>
          Continue to Magic System →
        </button>
      </div>
    </div>
  );
}
