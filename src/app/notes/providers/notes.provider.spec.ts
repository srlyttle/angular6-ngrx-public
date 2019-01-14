import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Http } from '@angular/http';

import { NotesProvider } from './notes.provider';
import { HttpServiceMock } from '../../../mocks/http.service.mock';
import * as fromApiSamples from '../api-samples';

import { AppModule } from 'src/app/app.module';

describe('Notes Provider', () => {
  let provider: NotesProvider;
  let http: Http;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterTestingModule,
      ],
      providers: [
        NotesProvider,
        {
          provide: Http,
          useClass: HttpServiceMock,
        },
      ],
    });
    http = TestBed.get(Http);
    provider = TestBed.get(NotesProvider);
  });
  it('notes get', () => {
    spyOn(provider, 'getNotes').and.returnValue(of(fromApiSamples.mockResponses.hasNotesResponse));
    provider.getNotes().subscribe(result => {
      expect(result).toEqual(fromApiSamples.mockResponses.hasNotesResponse);
    });
  });
});
