import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiError } from '@/shared/lib/api-client';
import { classroomApi } from '../api/classroom.api';
import type {
  CreateClassroomPayload,
  GradeLevel,
  UpdateClassroomPayload,
} from '../types/classroom.types';

export const CLASSROOMS_QUERY_KEY = ['classrooms'] as const;

export function useClassrooms(gradeLevel?: GradeLevel) {
  return useQuery({
    queryKey: [...CLASSROOMS_QUERY_KEY, gradeLevel ?? 'ALL'],
    queryFn: () => classroomApi.getAll(gradeLevel),
  });
}

export function useCreateClassroom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateClassroomPayload) =>
      classroomApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLASSROOMS_QUERY_KEY });
      toast.success('Classroom created successfully.');
    },
    onError: (error: unknown) => {
      const message =
        error instanceof ApiError
          ? error.message
          : 'Failed to create classroom.';
      toast.error(message);
    },
  });
}

export function useUpdateClassroom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateClassroomPayload;
    }) => classroomApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLASSROOMS_QUERY_KEY });
      toast.success('Classroom updated successfully.');
    },
    onError: (error: unknown) => {
      const message =
        error instanceof ApiError
          ? error.message
          : 'Failed to update classroom.';
      toast.error(message);
    },
  });
}

export function useDeleteClassroom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => classroomApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLASSROOMS_QUERY_KEY });
      toast.success('Classroom deleted successfully.');
    },
    onError: (error: unknown) => {
      const message =
        error instanceof ApiError
          ? error.message
          : 'Failed to delete classroom.';
      toast.error(message);
    },
  });
}