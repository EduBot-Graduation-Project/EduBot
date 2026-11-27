import { Navigate, Outlet } from 'react-router';
import type { UserRole } from '@/shared/types/domain';
import { getCurrentUser, getDefaultRouteByRole } from '@/shared/lib/auth';

interface RoleGuardProps {
  allowedRoles: UserRole[];
}

export function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={getDefaultRouteByRole(user.role)} replace />;
  }

  return <Outlet />;
}