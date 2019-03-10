import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TasksComponent } from './containers/tasks.component';
import { TasksAddComponent } from './containers/tasks-add.component';
import { TaskTimerComponent } from './containers/task-timer.component';

const tasksRoutes = [
  { path: '', component: TasksComponent },
  { path: 'add', component: TasksAddComponent },
  { path: 'start', component: TaskTimerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(tasksRoutes)],
  exports: [RouterModule],
})
export class TasksRoutingModule { }
