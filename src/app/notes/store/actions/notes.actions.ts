import { Action } from '@ngrx/store';
import { Note } from '../../models/notes.model';

export const LOAD_NOTES = '[Notes] Load Notes';
export const LOAD_NOTES_SUCCESS = '[Notes] Load Notes Success';
export const LOAD_NOTES_FAIL = '[Notes] Load Notes Fail';
export const LOAD_SELECTED_NOTE = '[Notes] Load Selected Notes';

export class LoadNotes implements Action {
  readonly type = LOAD_NOTES;
}

export class LoadNotesSuccess implements Action {
  readonly type = LOAD_NOTES_SUCCESS;
  constructor(public payload: Note[]) {}
}

export class LoadNotesFail implements Action {
  readonly type = LOAD_NOTES_FAIL;
  constructor(public payload: any) {}
}
export class LoadSelectedNote implements Action {
  readonly type = LOAD_SELECTED_NOTE;
  constructor(public payload: Note) {}
}

export type NotesAction = LoadNotes | LoadNotesSuccess | LoadNotesFail | LoadSelectedNote;
