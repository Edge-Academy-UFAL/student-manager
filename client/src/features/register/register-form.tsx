'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/ui/form';

import { registerFormSchema } from './schema';
import PersonalDataFormSection from './personal-section';
import ContactDataFormSection from './contact-section';
import AcademicDataFormSection from './academic-section';

export default function StudentRegisterFormComponent() {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      birthDate: undefined,
      cpf: '',
      rg: '',
      documentProvider: '',
      race: '',
      maritalState: '',
      gender: '',
      pronouns: '',
      handicaped: false,
      email: 'fulano@edge.ufal.br',
      alternativeEmail: '',
      phone: '',
      whatsapp: '',
      cep: '',
      city: '',
      district: '',
      street: '',
      number: undefined,
      addressDetail: '',
      linkedinUrl: '',
      lattesUrl: '',
      registrationCode: '',
      course: '',
      currentSemester: '',
      enrollmentSemester: '',
      academyGroup: 'Turma 1',
      academyOnboardingDate: new Date(),
      academyStudentLevel: 'undergraduate-student-1',
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
        <div className="flex w-[65%] flex-col gap-[24px]">
          <PersonalDataFormSection form={form} />
          <ContactDataFormSection form={form} />
          <AcademicDataFormSection form={form} />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
