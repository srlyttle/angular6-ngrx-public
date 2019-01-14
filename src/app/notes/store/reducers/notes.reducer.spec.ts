import * as fromNotesReducer from './notes.reducer';
import * as fromNotesActions from '../actions/notes.actions';
import * as fromApiSamples from '../../api-samples';
import { Note } from '../../models/notes.model';

describe('Notes Reducer', () => {
  it('LOAD_NOTES', () => {
    const notesState = fromApiSamples.expectedState.expectedNotesState;
    const { initialState, reducer } = fromNotesReducer;
    const action = new fromNotesActions.LoadNotesSuccess(notesState);
    const state = reducer(initialState, action);
    const expectEntity: { [id: number]: Note } = {
      [notesState[0]._id]: notesState[0],
    };
    expect(state.entities).toEqual(expectEntity);
  });
});
