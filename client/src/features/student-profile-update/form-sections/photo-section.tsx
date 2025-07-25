import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form';

import { ProfileSection } from '@/shared/components/custom/profile-section';
import { MockFileUpload } from '../components/mock-upload-file';
import { updateProfileFormSchema } from '../schema';

interface PhotoUploadFormSectionProps {
  form: UseFormReturn<z.infer<typeof updateProfileFormSchema>>;
}

export default function PhotoUploadFormSection({
  form,
}: PhotoUploadFormSectionProps) {
  return (
    <ProfileSection
      title="Foto"
      description="Essa foto será utilizada no seu crachá e em possíveis apresentações de time, artes de veiculação interna e outros."
      aria-labelledby="photo-upload"
    >
      <FormField
        control={form.control}
        name="photo"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <MockFileUpload
                value={field.value}
                onChange={field.onChange}
                label="Clique e selecione um arquivo"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </ProfileSection>
  );
}
