import { z } from 'zod';
import { isValidCPF } from './utils';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const registerFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'O nome é obrigatório.',
    })
    .max(60, {
      message: 'O nome deve ter no máximo 60 caracteres.',
    }),
  birthDate: z
    .date({
      errorMap: (issue) => ({
        message:
          issue.code === 'invalid_date'
            ? 'Data inválida.'
            : 'A data de nascimento é obrigatória.',
      }),
    })
    .refine((val) => new Date(val) <= new Date(), {
      message: 'A data de nascimento não pode ser no futuro.',
    }),
  rg: z
    .string()
    .max(14, { message: 'O RG deve ter no máximo 14 caracteres.' })
    .regex(/^[\d.-]*$/, { message: 'Formato de RG inválido.' })
    .refine(
      (val) => {
        if (val.length > 0 && val.length <= 4) {
          return false;
        }
        return true;
      },
      {
        message: 'Dígitos insuficientes.',
      },
    ),
  cpf: z
    .string()
    .min(11, { message: 'O CPF é obrigatório.' })
    .max(14, { message: 'CPF inválido.' })
    .refine((cpf) => isValidCPF(cpf), { message: 'CPF inválido.' }),
  documentProvider: z.string(),
  race: z.string().nonempty({
    message: 'Raça/Etnia é obrigatório.',
  }),
  maritalState: z.string().nonempty({
    message: 'Estado Civil é obrigatório.',
  }),
  gender: z.string().nonempty({
    message: 'Gênero é obrigatório.',
  }),
  pronouns: z.string(),
  handicaped: z.boolean(),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: 'Número de telefone inválido.' })
    .refine(
      (value) => {
        return value.length === 14;
      },
      {
        message: 'Número de telefone inválido.',
      },
    ),
  email: z.string(),
});
