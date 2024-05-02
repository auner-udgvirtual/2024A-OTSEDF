// productos.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as tutorialActions from './tutorial.actions';
import { Tutorial } from '../models/tutorial.model';

export const initialState: ReadonlyArray<Tutorial> = [];

export const tutorialsReducer = createReducer(
  initialState,
  // on(tutorialActions.cargarTutoriales, (state, { tutorials }) => ({ ...state, tutorials: tutorials })),
  on(tutorialActions.agregarTutorial, (state, { tutorial }) => ({ ...state, tutorials: [...state, tutorial] })),
  on(tutorialActions.actualizarTutorial, (state, { id, changes }) => ({
    ...state,
    tutorials: state.map(t => (t.id === id ? { ...t, ...changes } : t))
  })),
  on(tutorialActions.eliminarTutorial, (state, { id }) => ({ ...state, tutorials: state.filter(t => t.id !== id) })),
);
