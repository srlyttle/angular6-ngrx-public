import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NotesNavigationActionsComponent } from './notes-navigation-actions.component';

describe('NotesNavigationActionsComponent', () => {
  let component: NotesNavigationActionsComponent;
  let fixture: ComponentFixture<NotesNavigationActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotesNavigationActionsComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesNavigationActionsComponent);
    component = fixture.componentInstance;
    spyOn(component.router, 'navigate').and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
