import type { UserRole } from '@/interfaces/domain';

const ROLE_CLAIM = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
const EMAIL_CLAIM = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';

export interface CurrentUser {
  email: string;
  role: UserRole;
}

export function getCurrentUser(): CurrentUser | null {
  const token = localStorage.getItem('edubot_token');
  if (!token) return null;

  try {
    const payloadBase64 = token.split('.')[1];
    const decoded = JSON.parse(atob(payloadBase64));

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('edubot_token');
      return null;
    }

    const role = (decoded[ROLE_CLAIM] || decoded.role) as UserRole | undefined;
    const email = (decoded[EMAIL_CLAIM] || decoded.email || '') as string;

    if (!role) return null;

    return { email, role };
  } catch {
    return null;
  }
}

export function getDefaultRouteByRole(role: UserRole): string {
  const routes: Record<UserRole, string> = {
    Admin: '/admin/overview',
    Operator: '/operator/dashboard',
    Student: '/student/dashboard',
  };
  return routes[role];
}