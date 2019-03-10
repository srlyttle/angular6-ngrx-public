import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import * as tasksActions from '../actions/tasks.actions';
import * as fromTasksMapper from '../mappers/tasks.data-mapping';
import { TasksProvider } from '../../providers/tasks.provider';
import { Router } from '@angular/router';

@Injectable()
export class TasksEffect {
  constructor(private actions$: Actions, private tasksProvider: TasksProvider, private router: Router) {}

  @Effect()
  loadTasks$ = this.actions$.ofType(tasksActions.LOAD_TASKS).pipe(
    switchMap(() => {
      return this.tasksProvider.getTasks().pipe(
        map(tasks => {
          const mappedTasks = fromTasksMapper.mapTasks(tasks);
          return new tasksActions.LoadTasksSuccess(mappedTasks);
        }),
        catchError(error => of(new tasksActions.LoadTasksFail(error)))
      );
    })
  );
  @Effect()
  addTask$ = this.actions$.ofType(tasksActions.ADD_TASK).pipe(
    switchMap((action: tasksActions.AddTask) => {
      return this.tasksProvider.saveTask(action.payload).pipe(
        map(taskReturned => {
          return new tasksActions.AddTaskSuccess(taskReturned);
        }),
        tap(() => this.router.navigate(['/'])),
        catchError(error => of(new tasksActions.AddTaskFail(error)))
      );
    })
  );
}
