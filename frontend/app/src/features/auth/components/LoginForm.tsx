import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bot, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { loginSchema, type LoginInput } from '../schemas/loginSchema';
import { useLogin } from '../hooks/useLogin';

interface LoginFormProps {
  className?: string;
}

export function LoginForm({ className = '' }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending, error, reset } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginInput) => {
    login(data);
  };

  return (
    <Card className={`w-full max-w-[380px] ${className}`}>
      <CardHeader className="space-y-3 pt-7 pb-4 text-center">
        <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-purple-600 text-white shadow-[0_8px_16px_-4px_rgba(147,51,234,0.45)]">
          <Bot className="animate-robot-wiggle size-6" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold tracking-tight text-slate-900">
            Sign in to EduBot
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Enter your credentials to access your dashboard
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pb-7">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200/80 bg-red-50/80 px-3 py-2.5 text-xs text-red-600 backdrop-blur-sm">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error.message}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-medium text-slate-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@edubot.com"
              autoComplete="email"
              disabled={isPending}
              className="h-9.5 border-slate-200/80 bg-white/60 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)] backdrop-blur-sm transition-all placeholder:text-slate-400 focus-visible:border-purple-600 focus-visible:bg-white focus-visible:ring-purple-600/15"
              {...register('email', {
                onChange: () => {
                  if (error) reset();
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-medium text-slate-700">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={isPending}
                className="h-9.5 border-slate-200/80 bg-white/60 pr-9 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)] backdrop-blur-sm transition-all placeholder:text-slate-400 focus-visible:border-purple-600 focus-visible:bg-white focus-visible:ring-purple-600/15"
                {...register('password', {
                  onChange: () => {
                    if (error) reset();
                  },
                })}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute top-0 right-0 h-9.5 w-9.5 text-slate-400 hover:bg-transparent hover:text-slate-700"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={isPending}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="mt-1 h-9.5 w-full cursor-pointer bg-purple-600 font-medium text-white shadow-[0_6px_16px_-4px_rgba(147,51,234,0.45)] transition-all hover:bg-purple-700 hover:shadow-[0_8px_20px_-4px_rgba(147,51,234,0.55)]"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}