import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authApi } from '../api/auth.api';
import type { LoginInput } from '../schemas/loginSchema';
import { getCurrentUser, getDefaultRouteByRole } from '@/lib/auth';

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: (response) => {
      if (!response?.token) return;
      localStorage.setItem('edubot_token', response.token);

      const user = getCurrentUser();
      if (user) {
        navigate(getDefaultRouteByRole(user.role), { replace: true });
      }
    },
  });
}