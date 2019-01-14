import * as notesActions from './notes.actions';
import { expectedNotesState } from '../../api-samples/has-notes-data/notes-data-expectred-state';

describe('Load Notes', () => {
  it('should create an action', () => {
    const action = new notesActions.LoadNotes();
    expect({
      ...action,
    }).toEqual({ type: notesActions.LOAD_NOTES });
  });
});

describe('Load Notes', () => {
  it('should create an action', () => {
    const action = new notesActions.LoadNotesSuccess(expectedNotesState);
    expect({
      ...action,
    }).toEqual({ type: notesActions.LOAD_NOTES_SUCCESS, payload: expectedNotesState });
  });
});
