export const GRADE_LEVELS = [
  'Grade1',
  'Grade2',
  'Grade3',
  'Grade4',
  'Grade5',
  'Grade6',
  'Grade7',
  'Grade8',
  'Grade9',
  'Grade10',
  'Grade11',
  'Grade12',
] as const;

export type GradeLevel = (typeof GRADE_LEVELS)[number];

export interface Classroom {
  id: string;
  gradeLevelEnum: GradeLevel;
  name: string;
}

export interface CreateClassroomPayload {
  gradeLevelEnum: GradeLevel;
  name: string;
}

export interface UpdateClassroomPayload {
  gradeLevelEnum: GradeLevel;
  name: string;
}