import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

import { NotesProvider } from '../providers/notes.provider';
import { NotesDetailComponent } from './notes-detail.component';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import * as fromRoot from '../../../app/store/reducers';
import * as fromReducers from '../store/reducers';

describe('NotesDetailComponent', () => {
  let component: NotesDetailComponent;
  let localStorageService;
  let fixture: ComponentFixture<NotesDetailComponent>;
  let store: Store<fromRoot.State>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({ ...fromRoot.reducers, notes: combineReducers(fromReducers.reducers) }),
        RouterTestingModule,
      ],
      providers: [
        {
          provide: NotesProvider,
          useClass: class {
            saveNote = jasmine.createSpy('saveNote');
          },
        },
        {
          provide: LocalStorageService,
          useClass: class {
            isLoggedIn = jasmine.createSpy('isLoggedIn');
          },
        },
      ],
      declarations: [NotesDetailComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    localStorageService = TestBed.get(LocalStorageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
