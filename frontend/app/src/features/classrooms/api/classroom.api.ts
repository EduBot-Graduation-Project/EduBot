import { apiClient } from '@/shared/lib/api-client';
import type {
  Classroom,
  CreateClassroomPayload,
  GradeLevel,
  UpdateClassroomPayload,
} from '../types/classroom.types';

export const classroomApi = {
  getAll: (gradeLevel?: GradeLevel) => {
    const query = gradeLevel ? `?gradeLevelEnum=${gradeLevel}` : '';
    return apiClient.get<Classroom[]>(`/classrooms${query}`);
  },

  create: (payload: CreateClassroomPayload) =>
    apiClient.post<Classroom>('/classrooms', payload),

  update: (id: string, payload: UpdateClassroomPayload) =>
    apiClient.put<Classroom>(`/classrooms/${id}`, payload),

  delete: (id: string) =>
    apiClient.delete<void>(`/classrooms/${id}`),
};