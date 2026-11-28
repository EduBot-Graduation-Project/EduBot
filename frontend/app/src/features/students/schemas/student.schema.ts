import { z } from 'zod';

export const studentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Student name must be at least 2 characters.')
    .max(100, 'Student name must be at most 100 characters.'),
  classroomId: z
    .string()
    .min(1, 'Please select a classroom.'),
});

export type StudentFormValues = z.infer<typeof studentSchema>;