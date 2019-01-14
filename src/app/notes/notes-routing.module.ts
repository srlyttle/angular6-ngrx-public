import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotesComponent } from './containers/notes.component';
import { NotesAddComponent } from './containers/notes-add.component';
import { NotesDetailComponent } from './containers/notes-detail.component';
import * as fromGuards from '../guards/';
const notesRoutes = [
  { path: '', component: NotesComponent },
  { path: 'add', component: NotesAddComponent },
  { path: 'detail/:noteId', component: NotesDetailComponent, canActivate: [fromGuards.NoteExistsGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(notesRoutes)],

  exports: [RouterModule],
})
export class NotesRoutingModule {}
