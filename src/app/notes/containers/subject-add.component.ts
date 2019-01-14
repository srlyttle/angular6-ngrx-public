import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap';

import { NotesState } from '../store/reducers/notes.reducer';
import * as fromSharedActions from '../../shared/store/actions/shared.actions';
import * as fromSharedSelectors from '../../shared/store/selectors/form-select.selector';

@Component({
  selector: 'app-subject-add',
  templateUrl: './subject-add.component.html',
  styleUrls: ['./subject-add.component.scss'],
})
export class SubjectAddComponent implements OnInit {
  subjectAreaForm: FormGroup;
  technologies$: any;
  constructor(private store: Store<NotesState>, public bsModalRef: BsModalRef) {
    this.subjectAreaForm = this.createFormGroup();
  }

  ngOnInit() {}
  createFormGroup() {
    this.technologies$ = this.store.select(fromSharedSelectors.getTechnologyList);
    return new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      technology: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    });
  }

  onSubjectSubmit() {
    let formValue = this.subjectAreaForm.value;
    let subjectArea = `[${formValue.technology.toUpperCase()}] ${formValue.name}`;
    this.store.dispatch(new fromSharedActions.AddSubjectAreas(subjectArea));
    this.bsModalRef.hide();
  }
}
