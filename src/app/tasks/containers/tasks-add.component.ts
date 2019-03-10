import { Component, OnInit } from '@angular/core';
import { TasksProvider } from '../providers/tasks.provider';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromAuth from '../../auth/store/reducers/index';
import { editorConfigValue } from '../../notes/services/editor-config.service';
import * as fromSelectors from '../store/selectors';
import { UserDetails } from 'src/app/auth/models/auth';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { NotesFeatureState } from 'src/app/notes/store';
import { TestStore } from '../../../testing/store';
import * as fromSharedSelectors from '../../shared/store/selectors/form-select.selector';
import { Subscription, Observable } from 'rxjs';
import { Task } from '../models/tasks.model';
import * as taskActions from '../store/actions/tasks.actions';
@Component({
  selector: 'app-tasks-add',
  templateUrl: './tasks-add.component.html',
  styleUrls: ['./tasks-add.component.scss'],
})
export class TasksAddComponent implements OnInit {
  constructor(
    private tasksProvider: TasksProvider,
    private store: Store<NotesFeatureState>,
    private localStorageService: LocalStorageService,
    private router: Router,
    private location: Location,
    private activatedRouteRoute: ActivatedRoute
  ) {
    this.taskForm = this.createFormGroup();
  }

  ngOnInit() {
    // this.store.dispatch(new taskssActions.LoadSubjectAreas());
    this.projectList$ = this.store.select(fromSharedSelectors.getProjectList);
    this.technologyList$ = this.store.select(fromSharedSelectors.getTechnologyList);
    this.subjectAreas$ = this.store.select(fromSharedSelectors.getSubjectAreas);
    this.courseList$ = this.store.select(fromSharedSelectors.getCourseList);
    this.gitRepoList$ = this.store.select(fromSharedSelectors.getGitRepoList);
    this.milestoneList$ = this.store.select(fromSharedSelectors.getMilestoneList);
    //  this.store.select(fromSelectors.getUser).subscribe(user => (this.user = user));
    this.store.select(fromSelectors.getUser).subscribe(user => (this.user = user));
    this.store.select(fromSelectors.getSelectedTask).subscribe(task => {
      if (task !== null) {
        this.selectedTask = task;
      }
    });
    this.routeSubscription = this.activatedRouteRoute.queryParams.subscribe(params => {
      if (params['populate']) {
        if (params['populate'] === 'true') {
          this.populate = true;
        }
      } else {
        this.populate = false;
      }
    });
  }

  subjectAreas$: Observable<string[]>;
  projectList$: Observable<string[]>;
  technologyList$: Observable<string[]>;
  courseList$: Observable<string[]>;
  gitRepoList$: Observable<string[]>;
  milestoneList$: Observable<string[]>;
  selectedTask: Task;
  populate: boolean = false;
  routeSubscription: Subscription;

  user: UserDetails;
  taskForm: FormGroup;
  htmlContent: any = null;
  submitted: boolean = false;
  hideDetailView: boolean = true;
  get f() {
    return this.taskForm.controls;
  }
  toggleDetail() {
    this.hideDetailView = !this.hideDetailView;
  }
  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  createFormGroup() {
    return new FormGroup({
      text: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      project: new FormControl(null, [Validators.required]),
      milestone: new FormControl(null),
      subjectArea: new FormControl(null, [Validators.required]),
      course: new FormControl(null),
      courseSection: new FormControl(null),

      acceptance: new FormArray([new FormControl([])]),
      timeSpent: new FormControl(0),
    });
  }
  get acceptanceCriteria(): FormArray {
    return <FormArray>this.taskForm.get('acceptance');
  }
  onAddAcceptance() {
    (this.taskForm.controls.acceptance as FormArray).push(new FormControl(null));
  }
  populateFromSelected() {
    const excluded = ['acceptance', 'timeSpent'];
    Object.keys(this.selectedTask).forEach(name => {
      if (this.taskForm.controls[name]) {
        const isExcluded = excluded.indexOf(name) > -1;
        if (!isExcluded) {
          this.taskForm.controls[name].patchValue(this.selectedTask[name]);
        }
      }
    });
  }
  onSubmit() {
    this.submitted = true;
    let criteria = this.acceptanceCriteria.value;
    let acceptanceItems = [];
    if (criteria.length > 0) {
      acceptanceItems = criteria.map(criteriaText => {
        return { text: criteriaText, done: false };
      });
    } else {
      return;
    }
    if (this.taskForm.invalid) {
      return;
    }

    const task = { ...this.taskForm.value, user: this.user, acceptance: acceptanceItems };
    this.store.dispatch(new taskActions.AddTask(task));
  }
}
