'use client';

import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/shared/components/ui/form';

import PersonalDataFormSection from './form-sections/personal-section';
import ContactDataFormSection from './form-sections/contact-section';
import AcademicDataFormSection from './form-sections/academic-section';
import PhotoUploadFormSection from './form-sections/photo-section';
import DucumentUploadFormSection from './form-sections/document-section';

import { updateProfileFormSchema } from './schema';

export default function StudentUpdateProfileFormComponent({
  form,
}: {
  form: UseFormReturn<z.infer<typeof updateProfileFormSchema>>;
}) {
  return (
    <Form {...form}>
      <form className="flex gap-[24px] space-y-8">
        <div className="flex min-w-[600px] basis-2/3 flex-col gap-[24px]">
          <PersonalDataFormSection form={form} />
          <ContactDataFormSection form={form} />
          <AcademicDataFormSection form={form} />
        </div>
        <div className="flex min-w-[270px] basis-1/3 flex-col gap-[24px]">
          <PhotoUploadFormSection form={form} />
          <DucumentUploadFormSection form={form} />
        </div>
      </form>
    </Form>
  );
}
