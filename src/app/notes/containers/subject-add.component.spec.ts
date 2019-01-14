import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap';

import { SubjectAddComponent } from './subject-add.component';
import * as fromRoot from '../../../app/store/reducers';
import * as fromReducers from '../store/reducers';

describe('SubjectAddComponent', () => {
  let component: SubjectAddComponent;
  let fixture: ComponentFixture<SubjectAddComponent>;
  let store: Store<fromRoot.State>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ ...fromRoot.reducers, products: combineReducers(fromReducers.reducers) }),
      ],
      providers: [BsModalRef],
      declarations: [SubjectAddComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
