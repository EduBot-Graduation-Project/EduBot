import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import type { ApiResponse } from '@/shared/types/api';
import { TOKEN_KEY } from '@/shared/lib/auth';

export class ApiError extends Error {
  readonly status?: number;
  readonly errors?: Record<string, string[]> | null;

  constructor(
    message: string,
    status?: number,
    errors?: Record<string, string[]> | null,
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5019/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    const payload = response.data as ApiResponse<unknown>;

    if (payload && typeof payload.isSuccess === 'boolean') {
      if (!payload.isSuccess) {
        return Promise.reject(
          new ApiError(
            payload.message || 'Request failed',
            response.status,
            payload.errors,
          ),
        );
      }
      return payload.data as never;
    }

    return response.data;
  },
  (error: AxiosError<ApiResponse<unknown>>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
    }

    const message =
      error.response?.data?.message || error.message || 'Network error';

    return Promise.reject(
      new ApiError(
        message,
        error.response?.status,
        error.response?.data?.errors ?? null,
      ),
    );
  }
);

export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<unknown, T>(url, config),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.post<unknown, T>(url, data, config),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.put<unknown, T>(url, data, config),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.patch<unknown, T>(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<unknown, T>(url, config),
};