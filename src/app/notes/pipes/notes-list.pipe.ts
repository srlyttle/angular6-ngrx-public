import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../models/notes.model';

@Pipe({
  name: 'myfilter',
  pure: false,
})
export class MyFilterPipe implements PipeTransform {
  transform(items: Note[], filter: Note): any {
    if (!items || (!filter.subjectArea && !filter.title && !filter.technology)) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => {
      let titleFilter = filter.title !== null ? filter.title.toUpperCase() : item.title;
      let technologyFilter = filter.technology !== null ? filter.technology.toUpperCase() : item.technology;
      let subjectAreaFilter = filter.subjectArea !== null ? filter.subjectArea.toUpperCase() : item.subjectArea;
      return (
        (item.title ? item.title.toUpperCase().indexOf(titleFilter.toUpperCase()) !== -1 : false) &&
        (item.technology ? item.technology.toUpperCase().indexOf(technologyFilter.toUpperCase()) !== -1 : false) &&
        (item.subjectArea ? item.subjectArea.toUpperCase().indexOf(subjectAreaFilter.toUpperCase()) !== -1 : false)
      );
    });
  }
}
