export interface CourseOption {
  id: string;
  name: string;
  level: string;
}

export interface QueuedUploadItem {
  id: string;
  title: string;
  academicLevel: string;
  courseId: string;
  weekNumber: number;
  status: 'processing' | 'ready' | 'failed';
  uploadedAt: string;
}