import React from 'react';
import { useGenerationMode } from '../context/GenerationModeContext.jsx';

// Local Roll / AI Roll switch for one generator instance (a single field,
// a single portrait, the map, the opening scene — whatever `modeKey`
// identifies). `compact` renders a smaller inline version sized to sit
// inside a gen-block header or a portrait card.
export default function GenerationModeToggle({ modeKey, label, compact = false }) {
  const { mode, setMode } = useGenerationMode(modeKey);

  return (
    <div className={`mode-toggle-wrap${compact ? ' mode-toggle-wrap--compact' : ''}`}>
      {label && <span className="mode-toggle-wrap__label">{label}:</span>}
      <div
        className={`mode-toggle${compact ? ' mode-toggle--compact' : ''}`}
        role="group"
        aria-label={label ? `Generation mode for ${label}` : 'Generation mode'}
      >
        <button
          type="button"
          className={`mode-toggle__option${mode === 'local' ? ' mode-toggle__option--active' : ''}`}
          onClick={() => setMode('local')}
        >
          Local
        </button>
        <button
          type="button"
          className={`mode-toggle__option${mode === 'ai' ? ' mode-toggle__option--active' : ''}`}
          onClick={() => setMode('ai')}
        >
          AI
        </button>
      </div>
    </div>
  );
}
