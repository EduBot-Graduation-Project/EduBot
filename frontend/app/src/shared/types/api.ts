export interface ApiResponse<T = unknown> {
  isSuccess: boolean;
  message: string;
  data: T | null;
  errors: Record<string, string[]> | null;
}