import React from 'react';
import OpeningSceneGenerator from '../components/OpeningSceneGenerator.jsx';

export default function StepOpeningScene({ onContinue, onBack }) {
  return (
    <div className="step">
      <div className="step__intro">
        <h2>Opening Scene</h2>
        <p>A bonus step — entirely optional. Skip it if you'd rather keep this at the outline level.</p>
      </div>

      <OpeningSceneGenerator />

      <div className="step__actions step__actions--split">
        <button type="button" className="btn btn-ghost-small" onClick={onBack}>
          ← Back
        </button>
        <button type="button" className="btn btn-primary" onClick={onContinue}>
          Continue to Story Kit →
        </button>
      </div>
    </div>
  );
}
