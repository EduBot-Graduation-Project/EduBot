import { Navigate } from 'react-router';
import { getCurrentUser, getDefaultRouteByRole } from '@/lib/auth';
import { LoginForm } from '../components/LoginForm';

export default function LoginPage() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    return <Navigate to={getDefaultRouteByRole(currentUser.role)} replace />;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#FAFAFC] p-4 selection:bg-purple-600 selection:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.08),transparent_60%)]" />

      <LoginForm className="animate-in fade-in slide-in-from-bottom-3 relative z-10 rounded-2xl border border-slate-200/70 bg-white/45 shadow-[0_2px_4px_rgba(15,23,42,0.03),0_12px_24px_-4px_rgba(15,23,42,0.06),0_28px_56px_-12px_rgba(88,28,135,0.14),inset_0_1px_0_0_rgba(255,255,255,0.95)] backdrop-blur-2xl duration-300" />
    </div>
  );
}