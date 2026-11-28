import { apiClient } from '@/shared/lib/api-client';
import type { GradeLevel } from '@/features/classrooms/types/classroom.types';
import type {
  CreateStudentPayload,
  Student,
  UpdateStudentPayload,
} from '../types/student.types';

export const studentApi = {
  getAll: (gradeLevel?: GradeLevel) => {
    const query = gradeLevel ? `?gradeLevelEnum=${gradeLevel}` : '';
    return apiClient.get<Student[]>(`/students${query}`);
  },

  getById: (id: string) =>
    apiClient.get<Student>(`/students/${id}`),

  create: (payload: CreateStudentPayload) =>
    apiClient.post<Student>('/students', payload),

  update: (id: string, payload: UpdateStudentPayload) =>
    apiClient.put<Student>(`/students/${id}`, payload),

  delete: (id: string) =>
    apiClient.delete<void>(`/students/${id}`),
};