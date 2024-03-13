// tutorial.actions.ts
import { createAction, props } from '@ngrx/store';
import { Tutorial } from '../models/tutorial.model';

export const cargarTutoriales = createAction('[Tutoriales] Cargar Tutoriales');
export const cargarTutorial = createAction('[Tutoriales] Cargar un Tutorial', props<{ id: any }>());
export const agregarTutorial = createAction('[Tutoriales] Agregar Tutorial', props<{ tutorial: Tutorial }>());
export const actualizarTutorial = createAction('[Tutoriales] Actualizar Tutorial', props<{ id: any, changes: Tutorial }>());
export const eliminarTutorial = createAction('[Tutoriales] Eliminar Tutorial', props<{ id: any }>());
export const eliminarTodosTutorial = createAction('[Tutoriales] Eliminar Todos Tutorial');
