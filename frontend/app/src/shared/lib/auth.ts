import type { UserRole } from '@/shared/types/domain';
import { jwtDecode } from 'jwt-decode';

const ROLE_CLAIM = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
const EMAIL_CLAIM = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';
const USER_ROLES: readonly UserRole[] = ['Admin', 'Operator', 'Student'];

export const TOKEN_KEY = 'edubot_token';

interface JwtPayload {
  exp?: number;
  role?: string | string[];
  email?: string;
  [claim: string]: unknown;
}

export interface CurrentUser {
  email: string;
  role: UserRole;
}

function isJwtPayload(value: unknown): value is JwtPayload {
  if (typeof value !== 'object' || value === null) return false;

  const payload = value as Record<string, unknown>;
  const hasValidRole =
    payload.role === undefined ||
    typeof payload.role === 'string' ||
    isStringArray(payload.role);
  const hasValidEmail =
    payload.email === undefined || typeof payload.email === 'string';

  return (
    (payload.exp === undefined ||
      (typeof payload.exp === 'number' && Number.isFinite(payload.exp))) &&
    hasValidRole &&
    hasValidEmail
  );
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item: unknown) => typeof item === 'string');
}

function getRole(value: unknown): UserRole | null {
  const values: readonly unknown[] =
    typeof value === 'string'
      ? [value]
      : isStringArray(value)
        ? value
        : [];
  return values.reduce<UserRole | null>((role, candidate) => {
    if (role || typeof candidate !== 'string') return role;
    return USER_ROLES.find((userRole) => userRole === candidate) ?? null;
  }, null);
}

export function getCurrentUser(): CurrentUser | null {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!isJwtPayload(decoded)) throw new Error('Invalid JWT payload');

    if (decoded.exp !== undefined && decoded.exp * 1000 < Date.now()) {
      throw new Error('JWT has expired');
    }

    const role = getRole(decoded[ROLE_CLAIM]) ?? getRole(decoded.role);
    if (!role) throw new Error('Invalid JWT role');

    const emailClaim = decoded[EMAIL_CLAIM] ?? decoded.email;
    const email = typeof emailClaim === 'string' ? emailClaim : '';

    return { email, role };
  } catch {
    localStorage.removeItem(TOKEN_KEY);
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