import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NotesProvider } from './providers/notes.provider';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './containers/notes.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store';
import { reducers } from './store/reducers';
import { NotesAddComponent } from './containers/notes-add.component';
import { NotesDetailComponent } from './containers/notes-detail.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxEditorModule } from 'ngx-editor';
import { MyFilterPipe } from './pipes/notes-list.pipe';
import { SubjectAddComponent } from './containers/subject-add.component';
import * as fromGuards from '../guards/';
// RECOMMENDED
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { NotesNavigationActionsComponent } from './components/notes-navigation-actions/notes-navigation-actions.component';
@NgModule({
  declarations: [NotesComponent, NotesAddComponent, NotesDetailComponent, MyFilterPipe, SubjectAddComponent, NotesNavigationActionsComponent],
  providers: [BsModalRef, ...fromGuards.guards],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommonModule,
    SharedModule,
    NgxEditorModule,
    NotesRoutingModule,
    StoreModule.forFeature('notesFeature', reducers),
    EffectsModule.forFeature(effects),
    ModalModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [SubjectAddComponent],
})
export class NotesModule {}
