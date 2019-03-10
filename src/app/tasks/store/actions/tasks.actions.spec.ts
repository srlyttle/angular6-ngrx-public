import * as tasksActions from './tasks.actions';
import { expectedTasksState } from '../../api-samples/has-tasks-data/tasks-data-expectred-state';
import { ExpectedConditions } from 'protractor';

describe('Load Tasks', () => {
  it('should create an action', () => {
    const action = new tasksActions.LoadTasks();
    expect({
      ...action,
    }).toEqual({ type: tasksActions.LOAD_TASKS });
  });
});

describe('Load Notes', () => {
  it('should create an action', () => {
    const action = new tasksActions.LoadTasksSuccess(expectedTasksState);
    expect({
      ...action,
    }).toEqual({ type: tasksActions.LOAD_TASKS_SUCCESS, payload: expectedTasksState });
  });
});
