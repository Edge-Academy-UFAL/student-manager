'use client';

import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/shared/components/ui/form';

import { registerFormSchema } from './schema';
import PersonalDataFormSection from './personal-section';
import ContactDataFormSection from './contact-section';
import AcademicDataFormSection from './academic-section';
import PhotoUploadFormSection from './photo-section';
import DucumentUploadFormSection from './document-section';

export default function StudentRegisterFormComponent({
  form,
}: {
  form: UseFormReturn<z.infer<typeof registerFormSchema>>;
}) {
  return (
    <Form {...form}>
      <form className="flex gap-[24px] space-y-8">
        <div className="flex basis-2/3 flex-col gap-[24px]">
          <PersonalDataFormSection form={form} />
          <ContactDataFormSection form={form} />
          <AcademicDataFormSection form={form} />
        </div>
        <div className="flex basis-1/3 flex-col gap-[24px]">
          <PhotoUploadFormSection form={form} />
          <DucumentUploadFormSection form={form} />
        </div>
      </form>
    </Form>
  );
}
