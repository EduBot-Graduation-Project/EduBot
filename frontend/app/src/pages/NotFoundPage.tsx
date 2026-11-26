import { ArrowLeft, Home, Bot } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="animate-in fade-in slide-in-from-bottom-4 flex max-w-md flex-col items-center duration-300">
        <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-sm">
          <Bot className="animate-robot-wiggle size-7" />
        </div>

        <h1 className="text-7xl font-extrabold text-purple-600">404</h1>

        <h2 className="mt-3 text-xl font-bold text-slate-900">
          Page Not Found
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            Go Back
          </Button>

          <Button
            onClick={() => navigate('/')}
            className="gap-2 bg-purple-600 text-white hover:bg-purple-700"
          >
            <Home className="size-4" />
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}