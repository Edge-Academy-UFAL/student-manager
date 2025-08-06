import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form';

import { FloatingLabelInput } from '@/shared/components/custom/floating-label-input';
import { FloatingLabelPhoneInput } from '@/shared/components/custom/floating-label-phone-input';

import { ProfileSection } from '@/shared/components/custom/profile-section';
import { updateProfileFormSchema } from '../schema';

interface ContactDataFormSectionProps {
  form: UseFormReturn<z.infer<typeof updateProfileFormSchema>>;
}

export default function ContactDataFormSection({
  form,
}: ContactDataFormSectionProps) {
  return (
    <ProfileSection title="Dados de Contato" aria-labelledby="contact-info">
      <div className="flex w-full gap-[16px]">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FloatingLabelInput
                  label="E-mail Institucional *"
                  disabled
                  {...field}
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
          name="alternativeEmail"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FloatingLabelInput label="E-mail Alternativo *" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FloatingLabelPhoneInput
                  value={field.value}
                  onChange={field.onChange}
                  label={'Telefone *'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FloatingLabelPhoneInput
                  value={field.value}
                  onChange={field.onChange}
                  label={'Whatsapp *'}
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
          name="cep"
          render={({ field }) => (
            <FormItem className="w-full basis-3/5">
              <FormControl>
                <FloatingLabelInput label="CEP *" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FloatingLabelInput label="Cidade *" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FloatingLabelInput label="Bairro *" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex w-full gap-[16px]">
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem className="w-full basis-3/6">
              <FormControl>
                <FloatingLabelInput label="Rua *" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem className="w-full basis-1/6">
              <FormControl>
                <FloatingLabelInput
                  label="Número *"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressDetail"
          render={({ field }) => (
            <FormItem className="w-full basis-2/6">
              <FormControl>
                <FloatingLabelInput label="Complemento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex w-full gap-[16px]">
        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FloatingLabelInput label="Linkedin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lattesUrl"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FloatingLabelInput label="Lattes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </ProfileSection>
  );
}
