import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router';
import { BrandLogo } from '@/shared/components/BrandLogo';
import { Button } from '@/shared/components/ui/button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 text-center">
      <div className="animate-in fade-in slide-in-from-bottom-4 flex max-w-md flex-col items-center duration-300">
        <BrandLogo className="mb-6 size-14 rounded-2xl shadow-sm" iconClassName="size-7" />

        <h1 className="text-7xl font-extrabold text-primary">404</h1>

        <h2 className="mt-3 text-xl font-bold text-foreground">
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
            className="gap-2"
          >
            <Home className="size-4" />
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}