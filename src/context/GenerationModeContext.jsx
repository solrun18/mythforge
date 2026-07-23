import React, { createContext, useCallback, useContext, useState } from 'react';

// Generation mode is scoped per individual generator instance — one switch
// per field/category (e.g. "premise", "character_protagonist", a specific
// portrait's role, the map, the opening scene). There is no global or
// per-step mode; every key defaults to 'local' until its own switch is
// flipped, so nothing costs money until deliberately opted into.
const GenerationModeContext = createContext(null);

export function GenerationModeProvider({ children }) {
  const [modes, setModes] = useState({});

  const setKeyMode = useCallback((key, mode) => {
    setModes((prev) => ({ ...prev, [key]: mode }));
  }, []);

  return (
    <GenerationModeContext.Provider value={{ modes, setKeyMode }}>
      {children}
    </GenerationModeContext.Provider>
  );
}

// Usage: const { mode, setMode } = useGenerationMode('character_protagonist');
export function useGenerationMode(key) {
  const ctx = useContext(GenerationModeContext);
  if (!ctx) throw new Error('useGenerationMode must be used within GenerationModeProvider');
  const mode = ctx.modes[key] ?? 'local';
  const setMode = (nextMode) => ctx.setKeyMode(key, nextMode);
  return { mode, setMode };
}
