import { z } from 'zod';
import { isValidCEP, isValidCPF } from './utils';
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
    message: 'A raça/etnia é obrigatória.',
  }),
  maritalState: z.string().nonempty({
    message: 'O estado civil é obrigatório.',
  }),
  gender: z.string().nonempty({
    message: 'O gênero é obrigatório.',
  }),
  pronouns: z.string(),
  handicaped: z.boolean(),
  email: z.string().email('Esse e-mail não é válido.'),
  alternativeEmail: z.string().email('Esse e-mail não é válido.'),
  phone: z
    .string()
    .nonempty({
      message: 'O telefone é obrigatório.',
    })
    .refine(isValidPhoneNumber, { message: 'Número de telefone inválido.' })
    .refine(
      (value) => {
        return value.length === 14;
      },
      {
        message: 'Número de telefone inválido.',
      },
    ),
  whatsapp: z
    .string()
    .nonempty({
      message: 'O Whatsapp é obrigatório.',
    })
    .refine(isValidPhoneNumber, { message: 'Número de Whatsapp inválido.' })
    .refine(
      (value) => {
        return value.length === 14;
      },
      {
        message: 'Número de Whatsapp inválido.',
      },
    ),
  cep: z
    .string()
    .min(1, { message: 'O CEP é obrigatório.' })
    .refine((cep) => isValidCEP(cep), { message: 'CEP inválido.' }),
  city: z.string().nonempty({
    message: 'A cidade é obrigatória.',
  }),
  district: z.string().nonempty({
    message: 'O bairro é obrigatório.',
  }),
  street: z.string().nonempty({
    message: 'A rua é obrigatória.',
  }),
  number: z.coerce.number({ message: 'O número é obrigatório.' }).gte(0),
  addressDetail: z.string(),
  linkedinUrl: z.string().url().or(z.literal('')),
  lattesUrl: z.string().url().or(z.literal('')),
  registrationCode: z.string().nonempty({
    message: 'O número de matrícula é obrigatório.',
  }),
  course: z.string().nonempty({
    message: 'O curso é obrigatório.',
  }),
  currentSemester: z.string().nonempty({
    message: 'O seu período atual é obrigatório.',
  }),
  enrollmentSemester: z
    .string()
    .regex(/\d\d\d\d.[12]/i, {
      message:
        'O período de ingresso tem padrão ano.semestre (e.g. 2022.2). Os valores do semestre só podem ser 1 ou 2.',
    })
    .length(6, {
      message: 'O período de ingresso tem apenas 6 caracteres.',
    }),
  academyGroup: z.string().nonempty({
    message: 'A turma do Academy é obrigatória.',
  }),
  academyOnboardingDate: z
    .date({
      errorMap: (issue) => ({
        message:
          issue.code === 'invalid_date'
            ? 'Data inválida.'
            : 'A data de ingresso é obrigatória.',
      }),
    })
    .refine((val) => new Date(val) <= new Date(), {
      message: 'A data de ingresso não pode ser no futuro.',
    }),
  academyStudentLevel: z.string().nonempty({
    message: 'O nível do aluno é obrigatório.',
  }),
});
