'use client';

import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { LoginForm } from './login-form';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function LoginPageComponent() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'loading' && status === 'authenticated') {
      router.push('/');
    }
  });

  function handleForgotPassword() {
    toast('Processo para alteração de senha:', {
      description: <span> Contate os administradores!</span>,
    });
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="m-auto w-full lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl">Login</CardTitle>
            <CardDescription className="text-center">
              Entre com seu e-mail e senha para acessar
            </CardDescription>
          </CardHeader>
          <CardContent className="py-3">
            <LoginForm />
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              variant="link"
              onClick={handleForgotPassword}
              className="text-center text-sm"
            >
              Esqueceu sua senha?
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
