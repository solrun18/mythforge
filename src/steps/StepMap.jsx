import React from 'react';
import MapGenerator from '../components/MapGenerator.jsx';

export default function StepMap({ onContinue, onBack }) {
  return (
    <div className="step">
      <div className="step__intro">
        <h2>World Map</h2>
        <p>Optional — generate a map from your world premise and geography, and jot down any key locations.</p>
      </div>

      <MapGenerator />

      <div className="step__actions step__actions--split">
        <button type="button" className="btn btn-ghost-small" onClick={onBack}>
          ← Back
        </button>
        <button type="button" className="btn btn-primary" onClick={onContinue}>
          Continue to Magic System →
        </button>
      </div>
    </div>
  );
}
