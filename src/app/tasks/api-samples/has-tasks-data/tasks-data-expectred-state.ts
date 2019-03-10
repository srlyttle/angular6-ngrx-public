import { Task, Acceptance } from '../../models/tasks.model';

export const expectedTasksState: Task[] = [
  {
    _id: ' dsdsdsd',
    user: { name: 'simon' },
    company: '77 Software',
    project: 'Task Master',
    milestone: 'Sprint 5',
    course: null,
    courseSection: null,
    subjectArea: 'NGRX',
    text: 'Add new feature reducer',
    description: 'Add new feature reducer and implement tests',
    acceptance: [
      {
        complete: true,
        text: 'reducer created',
      },
      {
        complete: true,
        text: 'reducer created',
      },
    ],
    completePercentage: 0,
    timeSpent: 25,
    started: null,
    finished: null,
    notes: ['test note'],
  },
   {
    _id: ' dsdsdsd',
    user: { name: 'simon' },
    company: '77 Software',

    milestone: 'Sprint 5',
    course: null,
    courseSection: null,
    text: 'Work Item Text',
     project: 'Taskmaster',
     subjectArea: 'Work Item Subject Area',
     description: 'Work Item description',
    acceptance: [{ text: 'acceptance 1', complete: false }, { text: 'acceptance 2', complete: false }],
    completePercentage: 0,
    timeSpent: 25,
    started: null,
    finished: null,
    notes: ['test note'],
  },
];
