import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { NotesProvider } from '../../providers/notes.provider';
import * as notesActions from '../actions/notes.actions';
import * as fromNotesMapper from '../mappers/notes.data-mapping';

@Injectable()
export class NotesEffect {
  constructor(private actions$: Actions, private notesProvider: NotesProvider) {}

  @Effect()
  loadNotes$ = this.actions$.ofType(notesActions.LOAD_NOTES).pipe(
    switchMap(() => {
      return this.notesProvider.getNotes().pipe(
        map(notes => {
          const mappedNotes = fromNotesMapper.mapNotes(notes);
          return new notesActions.LoadNotesSuccess(mappedNotes);
        }),
        catchError(error => of(new notesActions.LoadNotesFail(error)))
      );
    })
  );
}
