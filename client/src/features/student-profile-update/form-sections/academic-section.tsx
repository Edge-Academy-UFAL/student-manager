import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form';

import { FloatingLabelInput } from '@/shared/components/custom/floating-label-input';
import { FloatingLabelSelect } from '@/shared/components/custom/floating-label-select';
import { DateInput } from '@/shared/components/custom/date-input';

import { ProfileSection } from '@/shared/components/custom/profile-section';
import { updateProfileFormSchema } from '../schema';
import { academyStudentLevelOptions, courseOptions } from '@/shared/models';

interface AcademicDataFormSectionProps {
  form: UseFormReturn<z.infer<typeof updateProfileFormSchema>>;
}

export default function AcademicDataFormSection({
  form,
}: AcademicDataFormSectionProps) {
  return (
    <ProfileSection title="Dados Acadêmicos" aria-labelledby="academic-info">
      <div className="flex w-full gap-[16px]">
        <FormField
          control={form.control}
          name="registrationCode"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormControl>
                <FloatingLabelInput label="Matrícula *" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormControl>
                <FloatingLabelSelect
                  options={courseOptions}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  label="Curso *"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex w-full gap-[16px]">
        <FormField
          control={form.control}
          name="enrollmentSemester"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormControl>
                <FloatingLabelInput label="Período de Ingresso *" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentSemester"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormControl>
                <FloatingLabelInput label="Período Atual *" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex w-full gap-[16px]">
        <FormField
          control={form.control}
          name="academyGroup"
          render={({ field }) => (
            <FormItem className="w-full basis-1/3">
              <FormControl>
                <FloatingLabelInput
                  label="Turma do Academy *"
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="academyOnboardingDate"
          render={({ field }) => (
            <FormItem className="w-full basis-1/3">
              <FormControl>
                <DateInput
                  label={'Ingresso no Academy *'}
                  onChange={field.onChange}
                  defaultValue={field.value}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="academyStudentLevel"
          render={({ field }) => (
            <FormItem className="w-full basis-1/3">
              <FormControl>
                <FloatingLabelSelect
                  options={academyStudentLevelOptions}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  label="Nível *"
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </ProfileSection>
  );
}
