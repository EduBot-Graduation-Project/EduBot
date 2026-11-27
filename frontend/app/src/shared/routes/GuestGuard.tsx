import { Navigate, Outlet } from 'react-router';
import { getCurrentUser, getDefaultRouteByRole } from '@/shared/lib/auth';

export function GuestGuard() {
  const user = getCurrentUser();

  if (user) {
    return <Navigate to={getDefaultRouteByRole(user.role)} replace />;
  }

  return <Outlet />;
}
