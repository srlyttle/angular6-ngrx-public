import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Note } from '../models/notes.model';

@Injectable()
export class NotesProvider {
  public noteAddedSubject = new Subject<any>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  noteAdded(noteText) {
    this.noteAddedSubject.next(noteText);
  }

  getNotes(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(environment.endpoints.notesUrl);
  }

  saveNote(note, redirectOnSave) {
    let headers = new HttpHeaders().set('Authorization', localStorage.getItem('jwtToken'));
    this.noteAddedSubject.next(note.title);
    this.httpClient.post(environment.endpoints.notesUrl, note, { headers }).subscribe(response => {
      if (redirectOnSave) {
        this.router.navigate(['/notes']);
      }
    });
  }

  getSubjectAreas(): Observable<any> {
    return this.httpClient.get<{ name: string }>(environment.endpoints.subjectAreaUrl);
  }

  saveSubjectAreas(subjectArea): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', localStorage.getItem('jwtToken'));
    return this.httpClient.post(environment.endpoints.subjectAreaUrl, { name: subjectArea }, { headers });
  }
}
