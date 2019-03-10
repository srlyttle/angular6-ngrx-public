import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TaskNoteComponent } from './task-note.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NotesProvider } from 'src/app/notes/providers/notes.provider';
import { BsModalRef } from 'ngx-bootstrap';
import { Store } from '@ngrx/store';

import { TestStore } from '../../../testing/store';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import { RouterTestingModule } from '@angular/router/testing';
describe('TaskNoteComponent', () => {
    let component: TaskNoteComponent;
    let fixture: ComponentFixture<TaskNoteComponent>;
    let notesProvider: NotesProvider;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, RouterTestingModule],

            providers: [
                {
                    provide: NotesProvider,
                    useClass: class {
                        saveNote = jasmine.createSpy('saveNote');
                    },
                },
                { provide: Store, useClass: TestStore },
                {
                    provide: LocalStorageService,
                    useClass: class {
                        isLoggedIn = jasmine.createSpy('isLoggedIn');
                    },
                },
                BsModalRef
            ],
            declarations: [TaskNoteComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskNoteComponent);
        component = fixture.componentInstance;
        notesProvider = TestBed.get(NotesProvider);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
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
    });;
});
