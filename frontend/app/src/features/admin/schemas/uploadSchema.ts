import { z } from 'zod';

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const ACCEPTED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const uploadMaterialSchema = z.object({
  academicLevel: z.string().min(1, 'Please select an academic level'),
  courseId: z.string().min(1, 'Please select a course'),
  title: z.string().min(3, 'Lecture title must be at least 3 characters'),
  weekNumber: z.number().min(1, 'Minimum week is 1').max(16, 'Maximum week is 16'),
  file: z
    .custom<FileList>()
    .refine((files) => files && files.length === 1, 'Lecture file is required')
    .refine((files) => files && files[0]?.size <= MAX_FILE_SIZE, 'Max file size is 20MB')
    .refine(
      (files) => files && ACCEPTED_TYPES.includes(files[0]?.type),
      'Only PDF, PPTX, and DOCX formats are supported'
    ),
});

export type UploadMaterialInput = z.infer<typeof uploadMaterialSchema>;