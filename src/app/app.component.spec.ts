import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_BASE_HREF } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { NotesProvider } from './notes/providers/notes.provider';
import { AuthModule } from './auth/auth.module';
import { EffectsModule } from '@ngrx/effects';
import { TasksModule } from './tasks/tasks.module';
import { FormSelectProvider } from './shared/providers/form-select.provider';

describe('AppComponent', () => {
  const metaReducers = [];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        CoreModule,
        AuthModule,
        TasksModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}, { metaReducers }),
        EffectsModule.forRoot([]),
      ],
      declarations: [AppComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, NotesProvider, FormSelectProvider!],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
