import { apiClient } from '@/lib/api-client';
import type { LoginInput } from '../schemas/loginSchema';

export interface LoginResponse {
  token: string;
}

export const authApi = {
  login: (credentials: LoginInput) =>
    apiClient.post<LoginResponse>('/auth/login', credentials),
};