import { useReducer, useCallback } from 'react';
import type { Project } from '../data/projects';

export interface SceneState {
  activeProject: Project | null;
  visitHistory: string[];
  traceLines: [string, string][]; // derived pairs
  panelOpen: boolean;
}

type SceneAction =
  | { type: 'SELECT_PROJECT'; project: Project }
  | { type: 'CLOSE_PANEL' }
  | { type: 'RESET' };

function deriveTraceLines(history: string[]): [string, string][] {
  if (history.length < 2) return [];
  const lines: [string, string][] = [];
  for (let i = 1; i < history.length; i++) {
    lines.push([history[i - 1], history[i]]);
  }
  return lines;
}

function sceneReducer(state: SceneState, action: SceneAction): SceneState {
  switch (action.type) {
    case 'SELECT_PROJECT': {
      const newHistory = state.visitHistory.includes(action.project.id)
        ? state.visitHistory
        : [...state.visitHistory, action.project.id];
      return {
        ...state,
        activeProject: action.project,
        visitHistory: newHistory,
        traceLines: deriveTraceLines(newHistory),
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