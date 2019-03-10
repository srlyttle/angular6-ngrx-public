export interface Acceptance {
  complete: boolean;
  text: string;
}

export interface Task {
  _id: string;
  user: any;
  company: any;
  project: string;
  milestone: string;
  course: string;
  courseSection: string;
  subjectArea: string;
  text: string;
  description: string;
  acceptance: Acceptance[];
  timeSpent: number;
  completePercentage: number;
  started: Date;
  finished: Date;
  notes: string[];
}
