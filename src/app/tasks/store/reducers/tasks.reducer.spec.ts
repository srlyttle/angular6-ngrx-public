import * as fromTasksReducer from './tasks.reducer';
import * as fromTasksActions from '../actions/tasks.actions';
const action = new describe('Tasks Reducer', () => {
  it('LOAD_TASKS', () => {
    const initialState = fromTasksReducer.initialState;
    const action = new fromTasksActions.LoadTasks();
    const state = fromTasksReducer.reducer(initialState, action);
    const expectedState = null;
    expect(state.entities).toEqual({});
  });
});
