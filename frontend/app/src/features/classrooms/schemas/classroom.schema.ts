import { z } from 'zod';
import { GRADE_LEVELS } from '../types/classroom.types';

export const classroomSchema = z.object({
  gradeLevelEnum: z.enum(GRADE_LEVELS, {
    message: 'Please select a grade level.',
  }),
  name: z
    .string()
    .trim()
    .min(1, 'Classroom name is required.')
    .max(50, 'Classroom name must be at most 50 characters.'),
});

export type ClassroomFormValues = z.infer<typeof classroomSchema>;