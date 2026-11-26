import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem('edubot_token');
    queryClient.clear();
    navigate('/login', { replace: true });
  };
}