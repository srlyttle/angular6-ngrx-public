import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotesProvider } from '../../notes/providers/notes.provider';
import * as fromStore from '../store/index';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import * as fromAuth from '../../auth/store/reducers/index';
import { UserDetails } from 'src/app/auth/models/auth';
import { editorConfigValue } from '../../notes/services/editor-config.service';
import * as fromSelectors from '../../tasks/store/selectors/tasks.selectors';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotesState } from '../../notes/store/reducers/notes.reducer';
import { BsModalRef } from 'ngx-bootstrap';
import { Task } from '../models/tasks.model';
import * as tasksActions from '../store/actions';
import * as fromSharedSelectors from '../../shared/store/selectors/form-select.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-note',
  templateUrl: './task-note.component.html',
  styleUrls: ['./task-note.component.scss'],
})
export class TaskNoteComponent implements OnInit {
  constructor(
    private notesProvider: NotesProvider,
    private store: Store<NotesState>,
    public bsModalRef: BsModalRef
  ) {
    this.noteForm = this.createFormGroup();
  }

  ngOnInit() {
    this.editorConfig = editorConfigValue;
    this.projectList$ = this.store.select(fromSharedSelectors.getProjectList);
    this.technologyList$ = this.store.select(fromSharedSelectors.getTechnologyList);
    this.subjectAreas$ = this.store.select(fromSharedSelectors.getSubjectAreas);
    this.courseList$ = this.store.select(fromSharedSelectors.getCourseList);
    this.gitRepoList$ = this.store.select(fromSharedSelectors.getGitRepoList);
    this.milestoneList$ = this.store.select(fromSharedSelectors.getMilestoneList);
    this.subjectAreas$ = this.store.select(fromSharedSelectors.getSubjectAreas);
    this.store.select(fromSelectors.getUser).subscribe(user => (this.user = user));
    this.store.select(fromSelectors.getSelectedTask).subscribe(task => {
      if (task) {
        Object.keys(task).forEach(name => {
          if (this.noteForm.controls[name]) {
            this.noteForm.controls[name].patchValue(task[name]);
          }
        });
        this.workItem = task;
      }

    });
  }
  workItem: Task;
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
    this.bsModalRef.hide();
  }

  createFormGroup() {
    return new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      content: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      course: new FormControl(null),
      courseSection: new FormControl(null),
      project: new FormControl(),
      technology: new FormControl(null, [Validators.required]),
      subjectArea: new FormControl(null, [Validators.required]),
      gitRepo: new FormControl(null),
      gitCommit: new FormControl(null),
      htmlContent: new FormControl(null),
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.noteForm.invalid) {
      return;
    }
    const note = {
      ...this.noteForm.value,
      user: this.user,
    };
    this.notesProvider.saveNote(note, false);
    this.bsModalRef.hide();
  }
}
