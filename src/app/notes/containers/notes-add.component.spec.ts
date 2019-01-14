import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';

import { NotesAddComponent } from './notes-add.component';
import { NotesProvider } from '../providers/notes.provider';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import * as fromRoot from '../../../app/store/reducers';
import * as fromReducers from '../store/reducers';
import * as fromShared from '../../shared/store';

describe('NotesAddComponent', () => {
  let component: NotesAddComponent;
  let fixture: ComponentFixture<NotesAddComponent>;
  let notesProvider: NotesProvider;
  let localStorageService;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotesAddComponent],

      imports: [
        RouterTestingModule,
        StoreModule.forRoot({ ...fromRoot.reducers, notes: combineReducers(fromReducers.reducers) }),
        ModalModule.forRoot(),
      ],
      providers: [
        LocalStorageService,
        BsModalRef,
        {
          provide: NotesProvider,
          useClass: class {
            saveNote = jasmine.createSpy('saveNote');
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesAddComponent);
    component = fixture.componentInstance;
    notesProvider = TestBed.get(NotesProvider);
    localStorageService = TestBed.get(LocalStorageService);
    store = TestBed.get(Store);
    localStorageService = TestBed.get(LocalStorageService);
    spyOn(component.router, 'navigate').and.returnValue(true);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(localStorageService, 'isLoggedIn').and.returnValue(true);
    store.dispatch(new fromShared.LoadSubjectAreas());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not call save if note form is not valid', () => {
    component.onSubmit();
    expect(notesProvider.saveNote).toHaveBeenCalledTimes(0);
  });
  it('should call save if note form is not valid', () => {
    let title = component.noteForm.controls['title'];
    let content = component.noteForm.controls['content'];
    let technology = component.noteForm.controls['technology'];
    let subjectArea = component.noteForm.controls['subjectArea'];
    title.setValue(' this is a valid title');
    content.setValue(' this is a valid content vcalue for validation');
    technology.setValue(' angular');
    subjectArea.setValue(' reactive forms');
    component.onSubmit();
    expect(notesProvider.saveNote).toHaveBeenCalled;
  });
});
