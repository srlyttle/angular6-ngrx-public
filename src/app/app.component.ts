import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRootStore from './store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'taskmaster';
  message = 'Loading Data';
  loaded: boolean = false;
  constructor(private store: Store<fromRootStore.State>, private cdRef: ChangeDetectorRef) {}
  ngOnInit() {}
}
