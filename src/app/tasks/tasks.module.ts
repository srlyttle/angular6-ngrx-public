import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './containers/tasks.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store';
import { reducers } from './store/reducers';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxEditorModule } from 'ngx-editor';
import { TasksAddComponent } from './containers/tasks-add.component';
import { TasksProvider } from './providers/tasks.provider';
import { TaskNoteComponent } from './containers/task-note.component';
import { OrderByPipe } from './pipes/task-list.pipe';
import { TaskTimerComponent } from './containers/task-timer.component';
@NgModule({
  declarations: [TasksComponent, TasksAddComponent, TaskNoteComponent, OrderByPipe, TaskTimerComponent],
  providers: [TasksProvider],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommonModule,
    SharedModule,
    NgxEditorModule,
    TasksRoutingModule,
    StoreModule.forFeature('tasks', reducers),
    EffectsModule.forFeature(effects),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [TaskNoteComponent],
})
export class TasksModule {}
