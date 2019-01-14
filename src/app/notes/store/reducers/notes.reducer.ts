import { Note } from '../../models/notes.model';
import { LoadingState } from '../../../shared/models/loading.model';
import * as fromActions from '../actions/notes.actions';
export interface NotesState {
  entities: { [id: number]: Note };
  selectedNote: Note;
  loading: LoadingState;
  error: any;
  notes: any; // for testing purposes
}

export const initialState: NotesState = {
  entities: {},
  selectedNote: null,
  loading: LoadingState.NOT_SENT,
  error: null,
  notes: {},
};
export function reducer(state = initialState, action: fromActions.NotesAction): NotesState {
  switch (action.type) {
    case fromActions.LOAD_NOTES:
      return {
        ...state,
        loading: LoadingState.PENDING,
      };
    case fromActions.LOAD_NOTES_SUCCESS:
      const notes = action.payload;
      const entities = notes.reduce(
        (entities: { [id: number]: Note }, note: Note) => {
          return {
            ...entities,
            [note._id]: note,
          };
        },
        { ...state.entities }
      );
      return {
        ...state,
        loading: LoadingState.SUCCESS,
        entities,
      };

    case fromActions.LOAD_NOTES_FAIL:
      return {
        ...state,
        loading: LoadingState.ERROR,
        error: action.payload,
      };

    case fromActions.LOAD_SELECTED_NOTE:
      const selectedNote = action.payload ? state.entities[action.payload._id] : null;

      return {
        ...state,
        selectedNote,
      };

    default:
      return state;
  }
}

export const getNotesEntities = (state: NotesState) => {
  if (state) {
    return state.entities;
  }
};
export const getSelectedNoteFromState = (state: NotesState) => state.selectedNote;
export const getNotesLoaded = (state: NotesState) => {
  return state.loading === LoadingState.SUCCESS;
};
