import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form';

import FormSection from '../components/form-section';
import { MockFileUpload } from '../components/mock-upload-file';

import { updateProfileFormSchema } from '../schema';

interface DucumentUploadFormSectionProps {
  form: UseFormReturn<z.infer<typeof updateProfileFormSchema>>;
}

export default function DucumentUploadFormSection({
  form,
}: DucumentUploadFormSectionProps) {
  return (
    <FormSection
      title="Documentos"
      description="Envie a documentação necessária em arquivos nos formatos PDF, PNG, JPEG ou JPG, com até 5MB."
      ariaLabelledby="photo-upload"
      className="gap-[16px]"
    >
      <FormField
        control={form.control}
        name="rgFile"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <MockFileUpload
                value={field.value}
                onChange={field.onChange}
                label="Foto do RG"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="cpfFile"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <MockFileUpload
                value={field.value}
                onChange={field.onChange}
                label="Foto do CPF"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="proofOfResidenceFile"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <MockFileUpload
                value={field.value}
                onChange={field.onChange}
                label="Comprovante de residência"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="academicHistoryFile"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <MockFileUpload
                value={field.value}
                onChange={field.onChange}
                label="Histórico analítico"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  );
}
