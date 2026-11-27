import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { authApi } from '../api/auth.api';
import type { LoginInput } from '../schemas/loginSchema';
import { TOKEN_KEY } from '@/shared/lib/auth';

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: (response) => {
      localStorage.setItem(TOKEN_KEY, response.token);
      navigate('/', { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });
}