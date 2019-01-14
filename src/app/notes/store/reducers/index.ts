import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromNotes from './notes.reducer';

export interface NotesFeatureState {
  notes: fromNotes.NotesState;
}

export const reducers: ActionReducerMap<NotesFeatureState> = {
  notes: fromNotes.reducer,
};

export const getNotesFeatureState = createFeatureSelector<NotesFeatureState>('notesFeature');
