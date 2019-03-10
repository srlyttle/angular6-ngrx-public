import { Injectable } from '@angular/core';
import { Task } from '../models/tasks.model';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class TasksProvider {
  private subject = new Subject<any>();

  constructor(private httpClient: HttpClient, private router: Router) {}
  getTasks(): Observable<Task[]> {
    let headers = new HttpHeaders().set('Authorization', localStorage.getItem('jwtToken'));
    return this.httpClient.get<Task[]>(environment.endpoints.tasksUrl, { headers }).pipe(
      map(tasks => {
        return tasks.map(task => {
          let acceptanceCompletedNumber;
          let acceptancePercentComplete = 0;
          if (task.acceptance) {
            acceptanceCompletedNumber = task.acceptance.filter(acceptance => {
              return acceptance.complete;
            });
          }
          task.completePercentage = acceptanceCompletedNumber
            ? (acceptanceCompletedNumber.length / task.acceptance.length) * 100
            : 0;
          return task;
        });
      })
    );
  }

  saveTask(task: Task) {
    const company = '77 Software';
    const newTask = { ...task, company };
    let headers = new HttpHeaders().set('Authorization', localStorage.getItem('jwtToken'));
    return this.httpClient.post(environment.endpoints.tasksUrl, newTask, { headers });
    // .subscribe(response => {
    //   this.router.navigate(['/tasks']);
    // });
  }
  getSubjectAreas(): Observable<any> {
    return this.httpClient.get<{ name: string }>(environment.endpoints.subjectAreaUrl);
  }

  saveSubjectAreas(subjectArea): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', localStorage.getItem('jwtToken'));
    return this.httpClient.post(environment.endpoints.subjectAreaUrl, { name: subjectArea }, { headers });
  }
}
