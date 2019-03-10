import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { TaskTimerComponent } from './task-timer.component';
import { DebugElement } from '@angular/core';
import { expectedStates } from '../api-samples';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';
import * as fromRoot from '../../../app/store/reducers';
import * as fromShared from '../../shared/store/index';
import * as fromTasks from '../store/index';
describe('TaskTimerComponent', () => {
  let component: TaskTimerComponent;
  let fixture: ComponentFixture<TaskTimerComponent>;
  let store: Store<fromRoot.State>;
  let el: DebugElement;
  const workItems = expectedStates.expectedTasksState;
  const workItem = workItems[1];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule,
        StoreModule.forRoot({ ...fromRoot.reducers, tasks: combineReducers(fromTasks.reducers) })],
      declarations: [TaskTimerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTimerComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    el = fixture.debugElement;
    store.dispatch(new fromTasks.LoadTasksSuccess([workItem]));
    store.dispatch(new fromTasks.LoadSelectedTask(workItem));
  });

  describe('Initialisation', () => {


    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
  describe('Work Item fromTask', () => {
    it('should be set from LoadSelectedTask sUBSCRIPTION', () => {
      fixture.detectChanges();
      expect(component.workItem._id).toBe(workItem._id);
    });

  });

  describe('Form Population', () => {
    it('form valid when work item populated', () => {
      component.ngOnInit();
      expect(component.timerForm.valid).toBeTruthy();
    });
    it('form values are set', () => {
      component.ngOnInit();
      expect(component.timerForm.valid).toBeTruthy();
      const controlArray = <FormArray>component.timerForm.get('acceptance');
      controlArray.controls[0].setValue(true);
      expect(controlArray.controls[0].value).toBe(true);
      expect(controlArray.controls[1].value).toBe(false);

    });
  })
  describe('Work Item Details', () => {
    beforeEach(() => {
      component.workItem = workItem;
    })
    it('should have the details of the selected task', () => {

      expect(component.workItem).toBeTruthy();
      expect(component.workItem.text).toBe(workItem.text);
      expect(component.workItem.project).toBe(workItem.project);
      expect(component.workItem.subjectArea).toBe(workItem.subjectArea);
      expect(component.workItem.description).toBe(workItem.description);
      expect(component.workItem.acceptance.length).toBe(2);
      expect(component.workItem.acceptance[0].text).toBe(workItem.acceptance[0].text);
      expect(component.workItem.acceptance[0].complete).toBe(workItem.acceptance[0].complete);
    });
    it('should display details of the selected task', () => {
      fixture.detectChanges();
      expect(el.query(By.css('[xauto-workitem-project]')).nativeElement.textContent).toBe(workItem.project);
      expect(el.query(By.css('[xauto-workitem-description]')).nativeElement.textContent).toBe(workItem.description);
    });
  });
  describe('Timer Functionality', () => {
    beforeEach(() => {
      component.workItem = workItem;
    })
    it('start click should initiate', () => {
      el.query(By.css('[xauto-timerform-start-button]')).triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.isRunning).toBeTruthy();
      el.query(By.css('[xauto-timerform-pause-button]')).triggerEventHandler('click', null);
      expect(component.isRunning).toBeFalsy();
    })
  });
});
