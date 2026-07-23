import React from 'react';
import GeneratorBlock from '../components/GeneratorBlock.jsx';
import SubplotPicker from '../components/SubplotPicker.jsx';
import { useWorldBible } from '../context/WorldBibleContext.jsx';

const MAIN_BEATS = [
  { field: 'beat_call', category: 'beat_call' },
  { field: 'beat_threshold', category: 'beat_threshold' },
  { field: 'beat_trials', category: 'beat_trials' },
  { field: 'beat_ordeal', category: 'beat_ordeal' },
  { field: 'beat_climax', category: 'beat_climax' },
  { field: 'beat_resolution', category: 'beat_resolution' },
];

export default function StepPlot({ onContinue, onBack }) {
  const worldBible = useWorldBible();
  const subplotTypes = worldBible.plot.subplotTypes || [];

  return (
    <div className="step">
      <div className="step__intro">
        <h2>Plot Points</h2>
        <p>A condensed hero's-journey skeleton, plus whatever subplot flavor you want running alongside it.</p>
      </div>

      <SubplotPicker />

      {subplotTypes.map((id) => (
        <GeneratorBlock key={id} section="plot" field={`subplot_${id}`} category={`subplot_${id}`} count={3} />
      ))}

      {MAIN_BEATS.map(({ field, category }) => (
        <GeneratorBlock key={field} section="plot" field={field} category={category} count={3} />
      ))}

      <div className="step__actions step__actions--split">
        <button type="button" className="btn btn-ghost-small" onClick={onBack}>
          ← Back
        </button>
        <button type="button" className="btn btn-primary" onClick={onContinue}>
          Continue to Opening Scene →
        </button>
      </div>
    </div>
  );
}
