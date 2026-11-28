export interface Student {
  id: string;
  name: string;
  studentCode: string;
  classroomId: string;
  classroomName: string;
}

export interface CreateStudentPayload {
  name: string;
  classroomId: string;
}

export interface UpdateStudentPayload {
  name: string;
  classroomId: string;
}