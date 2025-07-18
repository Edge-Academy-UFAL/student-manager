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
import { SimpleCheckbox } from '@/shared/components/custom/checkbox';
import { DateInput } from '@/shared/components/custom/date-input';

import FormSection from '../components/form-section';

import { updateProfileFormSchema } from '../schema';
import {
  raceOptions,
  maritalStateOptions,
  pronounsOptions,
  genderOptions,
} from '../models';

interface PersonalDataFormSectionProps {
  form: UseFormReturn<z.infer<typeof updateProfileFormSchema>>;
}

export default function PersonalDataFormSection({
  form,
}: PersonalDataFormSectionProps) {
  return (
    <FormSection
      title="Dados Pessoais"
      ariaLabelledby="personal-info"
      className="gap-[16px]"
    >
      <div className="flex w-full gap-[16px]">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full basis-2/3">
              <FormControl>
                <FloatingLabelInput label="Nome Completo *" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="basis-1/3">
              <FormControl>
                <DateInput
                  label={'Data de Nascimento *'}
                  onChange={field.onChange}
                  defaultValue={field.value}
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
          name="cpf"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FloatingLabelInput label="CPF *" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rg"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FloatingLabelInput label="RG" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="documentProvider"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FloatingLabelInput label="Órgão Emissor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex w-full gap-[16px]">
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="w-full basis-1/4">
              <FormControl>
                <FloatingLabelSelect
                  options={genderOptions}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  label="Gênero *"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pronouns"
          render={({ field }) => (
            <FormItem className="w-full basis-1/4">
              <FormControl>
                <FloatingLabelSelect
                  options={pronounsOptions}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  label="Pronomes"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="handicaped"
          render={({ field }) => {
            return (
              <FormItem className="flex h-[48px] basis-2/4 flex-row items-center gap-2">
                <FormControl>
                  <SimpleCheckbox
                    label="Pessoa com deficiência?"
                    checked={field.value}
                    onChange={field.onChange}
                    name={field.name}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
      </div>
      <div className="flex w-full gap-[16px]">
        <FormField
          control={form.control}
          name="race"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FloatingLabelSelect
                  options={raceOptions}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  label="Raça/Etnia *"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maritalState"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FloatingLabelSelect
                  options={maritalStateOptions}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  label="Estado Civil *"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
}
