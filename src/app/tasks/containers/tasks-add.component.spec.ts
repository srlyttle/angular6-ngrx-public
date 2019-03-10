// import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { TasksAddComponent } from './tasks-add.component';
// import { Store } from '@ngrx/store';
// import { RouterTestingModule } from '@angular/router/testing';
// import { TasksProvider } from '../providers/tasks.provider';
// import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
// import { TasksState } from 'src/app/tasks/store';
// import { TestStore } from '../../../testing/store';
// describe('TasksAddComponent', () => {
//   let component: TasksAddComponent;
//   let fixture: ComponentFixture<TasksAddComponent>;
//   let store: TestStore<TasksState>;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [RouterTestingModule, ReactiveFormsModule, FormsModule],
//       providers: [
//         {
//           provide: TasksProvider,
//           useClass: class {
//             saveTask = jasmine.createSpy('saveTask');
//           },
//         },
//         {
//           provide: LocalStorageService,
//           useClass: class {
//             isLoggedIn = jasmine.createSpy('isLoggedIn');
//           },
//         },
//         { provide: Store, useClass: TestStore },
//       ],

//       declarations: [TasksAddComponent],
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TasksAddComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
