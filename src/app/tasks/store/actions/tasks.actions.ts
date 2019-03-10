import { Action } from '@ngrx/store';
import { Task } from '../../models/tasks.model';

export const LOAD_TASKS = '[TASKS] Load Tasks';
export const LOAD_TASKS_SUCCESS = '[TASKS] Load Tasks Success';
export const LOAD_TASKS_FAIL = '[TASKS] Load Tasks Fail';
export const LOAD_SELECTED_TASK = '[TASKS] Load Selected Task';

export const ADD_TASK = '[TASKS] Add Task';
export const ADD_TASK_SUCCESS = '[TASKS] Add Task Success';
export const ADD_TASK_FAIL = '[TASKS] Add Task Fail';

export class LoadTasks implements Action {
  readonly type = LOAD_TASKS;
}

export class LoadTasksSuccess implements Action {
  readonly type = LOAD_TASKS_SUCCESS;
  constructor(public payload: Task[]) {}
}

export class LoadTasksFail implements Action {
  readonly type = LOAD_TASKS_FAIL;
  constructor(public payload: any) {}
}
export class LoadSelectedTask implements Action {
  readonly type = LOAD_SELECTED_TASK;
  constructor(public payload: Task) {}
}

export class AddTask implements Action {
  readonly type = ADD_TASK;
  constructor(public payload: Task) {}
}
export class AddTaskSuccess implements Action {
  readonly type = ADD_TASK_SUCCESS;
  constructor(public payload: any) {}
}
export class AddTaskFail implements Action {
  readonly type = ADD_TASK_FAIL;
  constructor(public payload: any) {}
}

export type TasksAction =
  | LoadTasks
  | LoadTasksSuccess
  | LoadTasksFail
  | LoadSelectedTask
  | AddTask
  | AddTaskSuccess
  | AddTaskFail;
