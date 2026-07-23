import React, { createContext, useContext, useMemo, useReducer } from 'react';

const initialState = {
  worldBuilding: {
    premise: null,
    geography: null,
    peoples: null,
    originMyth: null,
    historicalEvent: null,
    government: null,
  },
  magicSystem: {
    hardOrSoft: null, // { id: 'hard' | 'soft', title, description } or SKIPPED
    source: null,
    access: null,
    costs: null,
    attitude: null,
  },
  map: {
    imageDataUrl: null,
    prompt: null,
    source: null, // 'ai' | 'unavailable'
    locations: [], // [{ id, name, note }]
  },
  characters: {
    protagonist: null,
    mentor: null,
    rival: null,
    antagonist: null,
    // Each locked character entry is { title, description, portraitDataUrl?, portraitSource? }
  },
  plot: {
    subplotTypes: [], // array of subplot ids from SUBPLOT_TYPES, max 2
    beat_call: null,
    beat_threshold: null,
    beat_trials: null,
    beat_ordeal: null,
    beat_climax: null,
    beat_resolution: null,
    // subplot_<id> fields are added dynamically once a subplot type is picked
  },
  openingScene: {
    scene: null, // { text, source } — plain generated prose, not a card pick
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOCK_FIELD': {
      const { section, field, value } = action;
      return {
        ...state,
        [section]: { ...state[section], [field]: value },
      };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const WorldBibleStateContext = createContext(null);
const WorldBibleDispatchContext = createContext(null);

export function WorldBibleProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <WorldBibleStateContext.Provider value={state}>
      <WorldBibleDispatchContext.Provider value={dispatch}>
        {children}
      </WorldBibleDispatchContext.Provider>
    </WorldBibleStateContext.Provider>
  );
}

export function useWorldBible() {
  const state = useContext(WorldBibleStateContext);
  if (!state) throw new Error('useWorldBible must be used within WorldBibleProvider');
  return state;
}

export function useWorldBibleActions() {
  const dispatch = useContext(WorldBibleDispatchContext);
  if (!dispatch) throw new Error('useWorldBibleActions must be used within WorldBibleProvider');

  return useMemo(
    () => ({
      lockField: (section, field, value) => dispatch({ type: 'LOCK_FIELD', section, field, value }),
      reset: () => dispatch({ type: 'RESET' }),
    }),
    [dispatch]
  );
}
