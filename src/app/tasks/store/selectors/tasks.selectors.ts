import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromAuthReducer from '../../../auth/store/reducers/auth.reducers';
import { TasksState } from '../reducers';
import { Task } from '../../models/tasks.model';
export const getTasksFeatureState = createFeatureSelector<TasksState>('tasks');
export const getAuthFeatureState = createFeatureSelector<fromAuthReducer.State>('auth');

export const getTasksState = createSelector(
  getTasksFeatureState,
  (state: TasksState) => {
    return state.tasks;
  }
);
export const getTasksEntitles = createSelector(
  getTasksState,
  state => state.entities
);

export const getAllTasks = createSelector(
  getTasksEntitles,
  (entities: { [id: number]: Task }) => {
    return Object.keys(entities).map(entityKey => {
      return entities[entityKey];
    });
  }
);

export const getSelectedTask = createSelector(
  getTasksState,
  s => {
    return s.selectedTask;
  }
);
export const getAuthState = createSelector(
  getAuthFeatureState,
  state => {
    return state;
  }
);
export const getUser = createSelector(
  getAuthState,
  state => {
    if (state) {
      return state.user;
    }
  }
);
