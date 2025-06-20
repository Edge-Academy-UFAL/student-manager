'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/ui/form';

import { registerFormSchema } from './schema';
import PersonalDataFormSection from './personal-section';

export default function StudentRegisterFormComponent() {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      birthDate: undefined,
      cpf: '',
      rg: '',
      documentProvider: '',
      race: 'indigena',
      maritalState: '',
      gender: '',
      pronouns: '',
      handicaped: false,
      phone: '',
      email: 'arthur.soares@edge.ufal.br',
    },
  });

  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <PersonalDataFormSection form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
