import { createSelector } from '@ngrx/store';
import * as fromRoute from '../../../store';
import * as fromFeature from '../reducers/';
import * as fromNotes from '../reducers/notes.reducer';

import { Note } from '../../models/notes.model';

export const getNotesState = createSelector(
  fromFeature.getNotesFeatureState,
  (state: fromFeature.NotesFeatureState) => {
    if (state) {
      return state.notes;
    }
  }
);

export const getNoteEntitles = createSelector(
  getNotesState,
  fromNotes.getNotesEntities
);
export const getSelectedNote = createSelector(
  getNoteEntitles,
  fromRoute.getRouterState,
  (entities, router): Note => {
    if (entities && router) {
      return router.state && entities[router.state.params.noteId];
    }
  }
);
export const getAllNotes = createSelector(
  getNoteEntitles,
  entities => {
    if (entities) {
      return Object.keys(entities).map(entityKey => {
        return entities[entityKey];
      });
    }
  }
);

export const getLoadedSuccess = createSelector(
  getNotesState,
  fromNotes.getNotesLoaded
);
