import * as fromTasks from './tasks.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface TasksState {
  tasks: fromTasks.TasksState;
}

export const reducers: ActionReducerMap<TasksState> = {
  tasks: fromTasks.reducer,
};
