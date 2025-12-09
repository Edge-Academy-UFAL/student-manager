'use client';

import z from 'zod';

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/custom/card"
import { FloatingLabelPasswordInput } from "@/shared/components/custom/floating-label-password-input"
import { useForm } from 'react-hook-form';
import { createPasswordFormSchema } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/components/ui/form';
import { Button } from '@/shared/components/ui/button';
import { api, StudentCreateDTO } from '@/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface CreatePasswordFormProps {
  invitationId: string;
}

export function CreatePasswordForm({ invitationId }: CreatePasswordFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof createPasswordFormSchema>>({
      resolver: zodResolver(createPasswordFormSchema),
      defaultValues: { password: '', confirmPassword: '' },
  });

  async function onSubmit(data: z.infer<typeof createPasswordFormSchema>) {
    // console.log(`Submitting password for invitationId: ${invitationId} with data:`, data);
    const studentCreateDTO: StudentCreateDTO = {
      password: data.password,
      activationCode: invitationId
    }

    const res = await api.registerStudent(studentCreateDTO);
    console.log('Registration response:', res);

    if (!res.ok) {
      toast.error('Não foi possível criar a senha. Tente novamente mais tarde.');
      return;
    }

    toast.success('Senha criada com sucesso! Você já pode fazer login.');
    router.push('/login');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="relative">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelPasswordInput
                      label="Senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            >
            </FormField>
          </div>
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelPasswordInput
                    label="Confirme sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          >
          </FormField>

          <div className="flex justify-end pt-4">
            <Button type="submit" variant="default" size="default">
              Próximo
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}