import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { GradeLevel } from '@/features/classrooms/types/classroom.types';
import { ApiError } from '@/shared/lib/api-client';
import { studentApi } from '../api/student.api';
import type {
  CreateStudentPayload,
  UpdateStudentPayload,
} from '../types/student.types';

export const STUDENTS_QUERY_KEY = ['students'] as const;

export function useStudents(gradeLevel?: GradeLevel) {
  return useQuery({
    queryKey: [...STUDENTS_QUERY_KEY, gradeLevel ?? 'ALL'],
    queryFn: () => studentApi.getAll(gradeLevel),
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateStudentPayload) => studentApi.create(payload),
    onSuccess: (createdStudent) => {
      queryClient.invalidateQueries({ queryKey: STUDENTS_QUERY_KEY });
      toast.success(
        `Student added successfully (Code: ${createdStudent.studentCode}).`,
      );
    },
    onError: (error: unknown) => {
      const message =
        error instanceof ApiError ? error.message : 'Failed to add student.';
      toast.error(message);
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateStudentPayload;
    }) => studentApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STUDENTS_QUERY_KEY });
      toast.success('Student updated successfully.');
    },
    onError: (error: unknown) => {
      const message =
        error instanceof ApiError ? error.message : 'Failed to update student.';
      toast.error(message);
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => studentApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STUDENTS_QUERY_KEY });
      toast.success('Student deleted successfully.');
    },
    onError: (error: unknown) => {
      const message =
        error instanceof ApiError ? error.message : 'Failed to delete student.';
      toast.error(message);
    },
  });
}