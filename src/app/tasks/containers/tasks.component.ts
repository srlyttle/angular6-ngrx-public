import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromTasks from '../store/index';
import { Observable } from 'rxjs';
import { Task } from '../models/tasks.model';
import { Router } from '@angular/router';
import * as fromAuth from '../../auth/store';
import * as fromShared from '../../shared/store/index';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Task[]>;
  constructor(
    private store: Store<fromTasks.TasksState>,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    if (this.localStorageService.isLoggedIn()) {
      this.store.dispatch(new fromAuth.SignIn(this.localStorageService.user));
    } else {
      this.router.navigate(['/login']);
    }
    this.store.dispatch(new fromShared.LoadSubjectAreas());
    this.store.dispatch(new fromTasks.LoadTasks());
    this.tasks$ = this.store.select(fromTasks.getAllTasks);
  }
  onTaskStart(task) {
    this.store.dispatch(new fromTasks.LoadSelectedTask(task));
    this.router.navigate(['/start'], { queryParams: { populate: false } });
  }
  onTaskCopy(task) {
    this.store.dispatch(new fromTasks.LoadSelectedTask(task));
    this.router.navigate(['/add'], { queryParams: { populate: true } });
  }
  goToRoute(route) {
    this.router.navigate([route]);
  }
}
