'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { getSession, signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { Button } from '@/shared/components/custom/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form';
import { FloatingLabelInput } from '@/shared/components/custom/floating-label-input';
import { FloatingLabelPasswordInput } from '@/shared/components/custom/floating-label-password-input';

import { loginFormSchema } from './schemas';

export function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    
    if (!res) {
      toast.error('Erro de conexão com o servidor');
      return;
    }

    if (res.ok) {
      const session = await getSession();

      
      if (session?.user?.dtype === 'Student') {
        router.push(`/students/${session.user.id}`);
      } else {
        router.push('/students');
      }

      router.refresh();
      return;
    }

    if (!res.error) {
      router.refresh();
      return;
    }

    switch (res.error) {
      case 'CredentialsSignin':
        form.setError('email', {});
        form.setError('password', {});
        toast.error('Erro ao fazer login', {
          description: 'Email ou senha inválidos',
        });
        break;
      default:
        toast.error('Não foi possível fazer login', {
          description: 'Tente novamente mais tarde',
        });
        break;
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="email"
          key="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput label="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          key="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelPasswordInput label="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button" variant="ghost" className="ml-auto">
          Esqueci minha senha
        </Button>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
}
