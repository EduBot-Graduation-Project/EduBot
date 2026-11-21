
export type UserRole = "ADMIN" | "STUDENT" | "MONITOR";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface Course {
  id: number;
  title: string;
  description?: string;
  code: string;
  level: string;
  semester: string;
  instructorId?: string;
  status: "Active" | "Inactive";
  students:number;
  lectures?: number;
  createdAt?: string;
}

export interface Lecture {
  id: string;
  courseId: string;
  title: string;
  description: string;
  lectureNumber: number;
  status: "DRAFT" | "PUBLISHED";
  materialsCount?: number;
  createdAt: string;
}

export type ProcessingStatus =
  | "UPLOADED"
  | "PROCESSING"
  | "READY"
  | "FAILED";

export interface Material {
  id: string;
  lectureId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  storageKey: string;
  uploadedBy: string;
  processingStatus: ProcessingStatus;
  createdAt: string;
}

export type SessionStatus =
  | "SCHEDULED"
  | "STARTED"
  | "RUNNING"
  | "LISTENING"
  | "STOPPED"
  | "COMPLETED"
  | "FAILED";

export interface Session {
  id: string;
  lectureId: string;
  roomId: string;
  robotId: string;
  status: SessionStatus;
  startedAt: string | null;
  endedAt: string | null;
}

export interface SessionReport {
  id: string;
  sessionId: string;
  attendanceCount: number;
  duration: number;
  generatedAt: string;
}
