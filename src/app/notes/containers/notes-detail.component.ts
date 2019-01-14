import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

import { NotesProvider } from '../providers/notes.provider';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import { UserDetails } from 'src/app/auth/models/auth';
import { Note } from '../models/notes.model';
import { editorConfigValue } from '../services/editor-config.service';
import { NotesState } from '../store/reducers/notes.reducer';
import * as fromAuth from '../../auth/store';
import * as fromSelectors from '../store/selectors/notes.selectors';
import * as fromSharedSelectors from '../../shared/store/selectors/form-select.selector';
import * as notesActions from '../store/actions/notes.actions';
@Component({
  selector: 'app-notes-detail',
  templateUrl: './notes-detail.component.html',
  styleUrls: ['./notes-detail.component.scss'],
})
export class NotesDetailComponent implements OnInit, OnDestroy {
  noteDetailSubscription: Subscription;
  constructor(
    private notesProvider: NotesProvider,
    private store: Store<NotesState>,
    private localStorageService: LocalStorageService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    if (this.localStorageService.isLoggedIn()) {
      this.store.dispatch(new fromAuth.SignIn(this.localStorageService.user));
    } else {
      this.router.navigate(['/']);
    }
    this.editorConfig = editorConfigValue;

    this.noteDetailSubscription = this.store.select(fromSelectors.getSelectedNote).subscribe(note => {
      this.selectedNote = note;
      this.store.dispatch(new notesActions.LoadSelectedNote(this.selectedNote));
      this.noteForm = this.createFormGroup(this.selectedNote);
    });
    this.projectList$ = this.store.select(fromSharedSelectors.getProjectList);
    this.technologyList$ = this.store.select(fromSharedSelectors.getTechnologyList);
    this.subjectAreas$ = this.store.select(fromSharedSelectors.getSubjectAreas);
    this.courseList$ = this.store.select(fromSharedSelectors.getCourseList);
    this.gitRepoList$ = this.store.select(fromSharedSelectors.getGitRepoList);
    this.milestoneList$ = this.store.select(fromSharedSelectors.getMilestoneList);
  }

  ngOnDestroy() {
    this.noteDetailSubscription.unsubscribe();
  }
  formSelectLists$: any;
  editorConfig: any;
  user: UserDetails;
  noteForm: FormGroup;
  htmlContent: any = null;
  selectedNote: Note;
  submitted: boolean = false;
  subjectAreas$: Observable<string[]>;
  projectList$: Observable<string[]>;
  technologyList$: Observable<string[]>;
  courseList$: Observable<string[]>;
  gitRepoList$: Observable<string[]>;
  milestoneList$: Observable<string[]>;
  get f() {
    return this.noteForm.controls;
  }
  createFormGroup(note) {
    if (!note) {
      return;
    }
    return new FormGroup({
      title: new FormControl(note.title, [Validators.required, Validators.minLength(5)]),
      content: new FormControl(note.content, [Validators.required, Validators.minLength(10)]),
      course: new FormControl(note.course),
      courseSection: new FormControl(note.courseSection),
      project: new FormControl(note.project),
      technology: new FormControl(note.technology, [Validators.required]),
      subjectArea: new FormControl(note.subjectArea, [Validators.required]),
      gitRepo: new FormControl(note.gitRepo),
      gitCommit: new FormControl(note.gitCommit),
      htmlContent: new FormControl(note.htmlContent),
    });
  }
  onSubmit() {
    const note = { ...this.noteForm.value, user: this.user, _id: this.selectedNote._id };
    this.submitted = true;
    if (this.noteForm.invalid) {
      return;
    }
    this.notesProvider.saveNote(note, true);
  }

  cancel() {
    this.location.back();
  }
}
