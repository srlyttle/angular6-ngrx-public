import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesComponent } from './notes.component';
import { ActionReducer, StoreModule, Store, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../../app/store/reducers';
import * as fromReducers from '../store/reducers';
import * as fromActions from '../store/actions/notes.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MyFilterPipe } from '../pipes/notes-list.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import * as fromApiSamples from '../api-samples';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ ...fromRoot.reducers, notes: combineReducers(fromReducers.reducers) }),

        RouterTestingModule,
        FormsModule,
      ],
      declarations: [NotesComponent, MyFilterPipe],
      providers: [LocalStorageService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(component.router, 'navigate').and.returnValue(true);
    spyOn(component.store, 'dispatch').and.callThrough();
    store.dispatch(new fromActions.LoadNotesSuccess(fromApiSamples.expectedState.expectedNotesState));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
