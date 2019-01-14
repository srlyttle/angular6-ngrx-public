import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { editorConfigValue } from '../services/editor-config.service';

import { NotesProvider } from '../providers/notes.provider';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import { UserDetails } from 'src/app/auth/models/auth';
import { SubjectAddComponent } from './subject-add.component';

import * as fromStore from '../store/index';
import * as fromAuth from '../../auth/store/index';
import * as fromShared from '../../shared/store';
import * as fromAuthStore from '../../auth/store';
import * as fromSharedSelectors from '../../shared/store/selectors/form-select.selector';
@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.scss'],
})
export class NotesAddComponent implements OnInit {
  constructor(
    private notesProvider: NotesProvider,
    private store: Store<fromStore.NotesFeatureState>,
    private sharedStore: Store<fromShared.SharedState>,
    private authStore: Store<fromAuthStore.AuthFeatureState>,
    private localStorageService: LocalStorageService,
    public router: Router,
    private location: Location,
    private bsModalRef: BsModalRef,
    private modalService: BsModalService
  ) {
    this.noteForm = this.createFormGroup();
  }

  ngOnInit() {
    this.store.dispatch(new fromShared.LoadSubjectAreas());
    this.projectList$ = this.sharedStore.select(fromSharedSelectors.getProjectList);
    this.technologyList$ = this.sharedStore.select(fromSharedSelectors.getTechnologyList);
    this.subjectAreas$ = this.sharedStore.select(fromSharedSelectors.getSubjectAreas);
    this.courseList$ = this.sharedStore.select(fromSharedSelectors.getCourseList);
    this.gitRepoList$ = this.sharedStore.select(fromSharedSelectors.getGitRepoList);
    this.milestoneList$ = this.sharedStore.select(fromSharedSelectors.getMilestoneList);
    if (this.localStorageService.isLoggedIn()) {
      this.store.dispatch(new fromAuth.SignIn(this.localStorageService.user));
    } else {
      this.router.navigate(['/']);
    }
    this.editorConfig = editorConfigValue;
    this.authStore.select(fromAuth.getAuthFeatureState).subscribe(user => {
      if (user && user.auth) {
        this.user = user.auth.user;
      }
    });
  }
  modalRef: BsModalRef;
  formSelectLists$: any;
  editorConfig: any;
  user: UserDetails;
  noteForm: FormGroup;
  htmlContent: any = null;
  submitted: boolean = false;
  hideDetailView: boolean = true;
  subjectAreas$: Observable<string[]>;
  projectList$: Observable<string[]>;
  technologyList$: Observable<string[]>;
  courseList$: Observable<string[]>;
  gitRepoList$: Observable<string[]>;
  milestoneList$: Observable<string[]>;
  get f() {
    return this.noteForm.controls;
  }
  toggleDetail() {
    this.hideDetailView = !this.hideDetailView;
  }
  cancel() {
    this.location.back();
  }
  createFormGroup() {
    return new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      content: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      course: new FormControl(null),
      courseSection: new FormControl(null),
      project: new FormControl(null),
      technology: new FormControl(null, [Validators.required]),
      subjectArea: new FormControl(null, [Validators.required]),
      gitRepo: new FormControl(null),
      gitCommit: new FormControl(null),
      htmlContent: new FormControl(null),
    });
  }
  openModalWithComponent() {
    const initialState = {
      list: [],
      title: '',
    };
    this.bsModalRef = this.modalService.show(SubjectAddComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  onSubmit() {
    this.submitted = true;
    if (this.noteForm.invalid) {
      return;
    }
    const note = { ...this.noteForm.value, user: this.user };
    this.notesProvider.saveNote(note, true);
  }
}
