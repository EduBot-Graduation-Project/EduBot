import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { TOKEN_KEY } from '@/shared/lib/auth';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem(TOKEN_KEY);
    queryClient.clear();
    navigate('/login', { replace: true });
  };
}