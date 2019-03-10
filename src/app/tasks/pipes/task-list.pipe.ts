import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/tasks.model';

@Pipe({
  name: 'ordertask',
})
export class OrderByPipe implements PipeTransform {
  transform(values: Array<Task>, args?: string): Array<Task> {
    values.sort((a: Task, b: Task) => {
      if (a.started < b.started) {
        return 1;
      } else if (a.started > b.started) {
        return -1;
      } else {
        return 0;
      }
    });
    return values;
  }
}
