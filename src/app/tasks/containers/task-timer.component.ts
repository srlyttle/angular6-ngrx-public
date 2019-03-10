import { Component, OnInit } from '@angular/core';
import { Task, Acceptance } from '../models/tasks.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable, Subscription, interval } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTasks from '../store/index';
import * as fromShared from '../../shared/store/index';

@Component({
  selector: 'app-task-timer',
  templateUrl: './task-timer.component.html',
  styleUrls: ['./task-timer.component.scss']
})
export class TaskTimerComponent implements OnInit {

  public workItem: Task;
  public timerForm: FormGroup;
  public acceptanceCriteria: Acceptance[];
  public loaded: boolean;
  public message: string;
  public timer: number;
  public pausedTime: number;
  public minutes;
  public seconds;
  public intervalObs: Observable<any>;
  public intervalSub: Subscription;
  public isRunning: boolean;
  public pommodoroMode: boolean;
  public shortBreakMode: boolean;
  public longBreakMode: boolean;
  public notes: string[];
  public timerConstants = {
    TWENTY_FIVE_MINUTES: 1500,
    ONE_SECOND: 1000,
    SIXTY_SECOND: 60,
    TEN: 10,
  }
  constructor(private fb: FormBuilder, private store: Store<fromTasks.TasksState>) { }

  ngOnInit() {
    this.timer = this.timerConstants.TWENTY_FIVE_MINUTES;
    this.store.dispatch(new fromShared.LoadSubjectAreas());
    this.store.select(fromTasks.getSelectedTask).subscribe(task => {
      if (task == null) {
        return;
      } else {
        this.workItem = {
          ...task,
        };
        this.notes = [...task.notes];
        this.acceptanceCriteria = [...this.workItem.acceptance];
        this.timerForm = this.createForm(this.workItem);
      }
    });
  }

  createForm(task: Task): FormGroup {
    const form = this.fb.group({
      timerMode: [1, Validators.required],
      userStory: [],
      taskText: [task.text, Validators.required],
      explantion: [task.description, Validators.required],
      acceptance: this.fb.array(this.acceptanceCriteria.map(a => this.fb.control(a.complete))),
    });
    this.loaded = true;
    return form;
  }
  initiateTimer() {
    this.isRunning = true;
    this.intervalObs = interval(this.timerConstants.ONE_SECOND);
    this.intervalSub = this.intervalObs.subscribe(x => {
      let minuteCalc = this.timer / this.timerConstants.SIXTY_SECOND;
      let secondCalc = this.timer % this.timerConstants.SIXTY_SECOND;
      this.minutes = parseInt(minuteCalc.toString(), this.timerConstants.TEN);
      this.seconds = parseInt(secondCalc.toString(), this.timerConstants.TEN);

      this.minutes = this.minutes < this.timerConstants.TEN ? '0' + this.minutes : this.minutes;
      this.seconds = this.seconds < this.timerConstants.TEN ? '0' + this.seconds : this.seconds;
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.finish();
      }
    });
  }

  start() {
    this.workItem.started = new Date();
    this.initiateTimer();
  }

  pause() {
    this.isRunning = false;
    this.intervalSub.unsubscribe();
    this.pausedTime = this.timer;
  }

  reset() {
    this.isRunning = false;
    this.timer = this.timerConstants.TWENTY_FIVE_MINUTES;
    this.seconds = null;
  }

  finish() {
    let timeSpentAlready = this.workItem.timeSpent;
    let timeSpent = this.timerConstants.TWENTY_FIVE_MINUTES; - this.timer;

    this.workItem.finished = new Date();
    let entireTimeSpent = timeSpent + timeSpentAlready;
    const acceptance = this.timerForm.value.acceptance;
    let acceptanceItems = [];
    acceptance.map((a, i) => {
      let acceptance = {
        complete: a,
        text: this.acceptanceCriteria[i].text,
      };
      acceptanceItems.push(acceptance);
    });
    const itemToSave = {
      ...this.workItem,
      acceptance: acceptanceItems,
      notes: this.notes,
      timeSpent: entireTimeSpent,
    };

    this.store.dispatch(new fromTasks.AddTask(itemToSave));
    if (this.intervalSub) {
      this.intervalSub.unsubscribe();
    }
  }



}
