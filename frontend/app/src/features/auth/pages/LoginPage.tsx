import { LoginForm } from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4 selection:bg-primary selection:text-primary-foreground">
      <LoginForm className="animate-in fade-in slide-in-from-bottom-3 relative z-10 rounded-2xl border border-border/70 bg-card/80 shadow-xl backdrop-blur-xl duration-300" />
    </div>
  );
}