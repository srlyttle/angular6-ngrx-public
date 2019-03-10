import { Task } from '../../models/tasks.model';
import { LoadingState } from '../../../shared/models/loading.model';
import * as fromActions from '../actions/tasks.actions';

export interface TasksState {
  entities: { [id: number]: Task };
  selectedTask: Task;
  loading: LoadingState;
  error: any;
}

export const initialState: TasksState = {
  entities: {},
  selectedTask: null,
  loading: LoadingState.NOT_SENT,
  error: null,
};
export function reducer(state = initialState, action: fromActions.TasksAction): TasksState {
  switch (action.type) {
    case fromActions.LOAD_TASKS:
      return {
        ...state,
        loading: LoadingState.PENDING,
      };
    case fromActions.LOAD_TASKS_SUCCESS:
      const tasks: Task[] = action.payload;
      const entities = tasks.reduce(
        (entities: { [id: number]: Task }, task: Task) => {
          return {
            ...entities,
            [task._id]: task,
          };
        },
        { ...state.entities }
      );
      return {
        ...state,
        loading: LoadingState.SUCCESS,
        entities,
      };

    case fromActions.LOAD_TASKS_FAIL:
      return {
        ...state,
        loading: LoadingState.ERROR,
        error: action.payload,
      };
    case fromActions.ADD_TASK_SUCCESS: {
      const taskAdded = action.payload;
      const newEntities = {
        ...state.entities,
        [taskAdded._id]: taskAdded,
      };
      return {
        ...state,
        entities: newEntities,
      };
    }

    case fromActions.LOAD_SELECTED_TASK:
      const selectedTask = state.entities[action.payload._id];
      return {
        ...state,
        selectedTask,
      };

    default:
      return state;
  }
}
