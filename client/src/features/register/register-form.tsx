'use client';

import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/shared/components/ui/form';

import { registerFormSchema } from './schema';
import PersonalDataFormSection from './personal-section';
import ContactDataFormSection from './contact-section';
import AcademicDataFormSection from './academic-section';

export default function StudentRegisterFormComponent({
  form,
}: {
  form: UseFormReturn<z.infer<typeof registerFormSchema>>;
}) {
  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="flex w-[65%] flex-col gap-[24px]">
          <PersonalDataFormSection form={form} />
          <ContactDataFormSection form={form} />
          <AcademicDataFormSection form={form} />
        </div>
      </form>
    </Form>
  );
}
