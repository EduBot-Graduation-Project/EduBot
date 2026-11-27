import { apiClient } from '@/shared/lib/api-client';
import type { LoginInput } from '../schemas/loginSchema';
import type { LoginResponse } from '../types/auth.types';

export const authApi = {
  login: (credentials: LoginInput) =>
    apiClient.post<LoginResponse>('/auth/login', credentials),
};