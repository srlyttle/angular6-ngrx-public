// import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

// import { TasksComponent } from './tasks.component';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { StoreModule } from '@ngrx/store';
// import { reducers } from '../store/reducers';
// import { RouterTestingModule } from '@angular/router/testing';
// import { TasksProvider } from '../providers/tasks.provider';
// import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
// import { Store } from '@ngrx/store';
// import { TasksState } from 'src/app/tasks/store';
// import { TestStore } from '../../../testing/store';
// import * as fromTasks from '../store/reducers/tasks.reducer';
// import { LoadingState } from 'src/app/shared/models/loading.model';
// describe('TasksComponent', () => {
//   let component: TasksComponent;
//   let fixture: ComponentFixture<TasksComponent>;
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
//       declarations: [TasksComponent],
//     }).compileComponents();
//   }));

//   beforeEach(inject([Store], (testStore: TestStore<TasksState>) => {
//     const sampleState = {
//       tasksData: {
//         taskList: [],
//         selectedTask: null,
//         formSelectLists: {
//           countries: ['USA', 'Germany', 'Italy', 'France'],

//           requestTypes: ['Claim', 'Feedback', 'Help Request'],

//           projectList: ['Learn', 'Burger Builder', 'Dev Connector', 'Tasked'],
//           milestoneList: ['Sprint 1', 'Sprint 2', 'Sprint 3'],

//           technologyList: ['Angular', 'Node', 'React', 'Git'],

//           subjectAreaList: ['[NODE] Express', '[ANGULAR] Forms', 'Routing', 'Testing', 'workflow', 'ngrx'],

//           courseList: ['Node Meade', 'Motto NGRX', 'Max React'],

//           gitRepoList: ['Repo1', 'Repo2', 'Repo3'],
//         },
//         loading: LoadingState.NOT_SENT,
//         error: null,
//       },
//     };
//     fixture = TestBed.createComponent(TasksComponent);
//     component = fixture.componentInstance;
//     store = testStore; // save store reference for use in tests
//     store.setState({ tasks: sampleState }); // set default state
//     fixture.detectChanges();
//   }));

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
