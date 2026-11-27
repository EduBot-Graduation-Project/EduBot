import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import { BrandLogo } from '@/shared/components/BrandLogo';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

import { loginSchema, type LoginInput } from '../schemas/loginSchema';
import { useLogin } from '../hooks/useLogin';

interface LoginFormProps {
  className?: string;
}

export function LoginForm({ className = '' }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();

  const {
    control,
    handleSubmit,
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
    <Card className={`w-full max-w-95 ${className}`}>
      <CardHeader className="space-y-3 pt-7 pb-4 text-center">
        <BrandLogo className="mx-auto size-11 shadow-sm" iconClassName="size-6" />
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold tracking-tight text-foreground">
            Sign in to EduBot
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Enter your credentials to access your dashboard
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pb-7">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  type="email"
                  placeholder="admin@edubot.com"
                  autoComplete="email"
                  disabled={isPending}
                  className="h-9.5 bg-background/60 transition-colors"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <div className="relative">
                  <Input
                    id={field.name}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    disabled={isPending}
                    className="h-9.5 bg-background/60 pr-9 transition-colors"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute top-0 right-0 h-9.5 w-9.5 text-muted-foreground hover:bg-transparent hover:text-foreground"
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="mt-1 h-9.5 w-full cursor-pointer font-medium shadow-md"
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