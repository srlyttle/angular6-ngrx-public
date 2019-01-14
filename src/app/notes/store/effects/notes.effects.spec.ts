import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, empty, Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';

import { NotesProvider } from '../../providers/notes.provider';
import { NotesEffect } from './notes.effects';

import * as fromApiSamples from '../../api-samples';
import * as fromActions from '../actions/notes.actions';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}
describe('Notes Effects', () => {
  let notesProvider;
  let actions$: TestActions;
  let effects: NotesEffect;
  const notesResponse = fromApiSamples.mockResponses.hasNotesResponse;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [NotesProvider, NotesEffect, { provide: Actions, useFactory: getActions }],
    });
    actions$ = TestBed.get(Actions);
    notesProvider = TestBed.get(NotesProvider);
    effects = TestBed.get(NotesEffect);
    spyOn(notesProvider, 'getNotes').and.returnValue(of(notesResponse));
  });
  it('should work as expected', () => {
    const action = new fromActions.LoadNotes();
    const completion = new fromActions.LoadNotesSuccess(notesResponse);
    actions$.stream = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });
    expect(effects.loadNotes$).toBeObservable(expected);
  });
});
