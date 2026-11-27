import { Bot } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface BrandLogoProps {
  className?: string;
  iconClassName?: string;
}

export function BrandLogo({ className, iconClassName }: BrandLogoProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground',
        className,
      )}
    >
      <Bot className={cn('animate-robot-wiggle', iconClassName)} />
    </div>
  );
}
