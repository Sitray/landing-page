import { useReducer, useCallback } from 'react';
import type { Project } from '../data/projects';

export interface SceneState {
  activeProject: Project | null;
  visitHistory: string[]; // unique visited projects
  lastProjectId: string | null; // last clicked (for trace, can be same as current)
  traceLines: [string, string][];
  panelOpen: boolean;
}

type SceneAction =
  | { type: 'SELECT_PROJECT'; project: Project }
  | { type: 'CLOSE_PANEL' }
  | { type: 'RESET' };

// No derivation - traceLines stored directly as transitions

function sceneReducer(state: SceneState, action: SceneAction): SceneState {
  switch (action.type) {
    case 'SELECT_PROJECT': {
      // Track all clicks for trace (not just unique visits)
      const newHistory = state.visitHistory.includes(action.project.id)
        ? state.visitHistory
        : [...state.visitHistory, action.project.id];
      
      // Add line from last clicked (can be same project, will create offset lines)
      const newTraceLines = state.lastProjectId !== null && state.lastProjectId !== action.project.id
        ? [...state.traceLines, [state.lastProjectId, action.project.id] as [string, string]]
        : state.traceLines;
      
      return {
        ...state,
        activeProject: action.project,
        visitHistory: newHistory,
        lastProjectId: action.project.id,
        traceLines: newTraceLines,
        panelOpen: true,
      };
    }
    case 'CLOSE_PANEL':
      return {
        ...state,
        activeProject: null,
        panelOpen: false,
      };
    case 'RESET':
      return {
        activeProject: null,
        visitHistory: [],
        lastProjectId: null,
        traceLines: [],
        panelOpen: false,
      };
    default:
      return state;
  }
}

const initialState: SceneState = {
  activeProject: null,
  visitHistory: [],
  lastProjectId: null,
  traceLines: [],
  panelOpen: false,
};

export function useSceneState() {
  const [state, dispatch] = useReducer(sceneReducer, initialState);

  const selectProject = useCallback((project: Project) => {
    dispatch({ type: 'SELECT_PROJECT', project });
  }, []);

  const closePanel = useCallback(() => {
    dispatch({ type: 'CLOSE_PANEL' });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    state,
    selectProject,
    closePanel,
    reset,
  };
}