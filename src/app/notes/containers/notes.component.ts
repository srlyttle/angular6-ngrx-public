import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Note } from '../models/notes.model';
import * as fromStore from '../store';
import { LoadNotes } from '../store/actions/notes.actions';
import { Router } from '@angular/router';
import { NotesState } from '../store/reducers/notes.reducer';
import * as fromAuth from '../../auth/store';
import * as fromShared from '../../shared/store/index';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import * as notesReducers from '../store/reducers/notes.reducer';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notes$: Observable<Note[]>;
  filter: any;
  loaded$: Observable<boolean>;
  constructor(
    public store: Store<NotesState>,
    public router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    if (this.localStorageService.isLoggedIn()) {
      this.store.dispatch(new fromAuth.SignIn(this.localStorageService.user));
    } else {
      this.router.navigate(['/login']);
    }
    this.store.dispatch(new LoadNotes());
    this.store.dispatch(new fromShared.LoadSubjectAreas());

    this.filter = { title: null, technology: null, subjectArea: null };
    this.notes$ = this.store.select(fromStore.getAllNotes);
    this.loaded$ = this.store.select(notesReducers.getNotesLoaded);
  }
}
