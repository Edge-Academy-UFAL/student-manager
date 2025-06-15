import z from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const EditInfoSchema = z.object({
  about: z
    .string()
    .max(2000, 'Limite seu texto a 2000 caracteres.')
    .optional()
    .or(z.literal('')),
  name: z
    .string()
    .min(3, 'Preencha com seu nome completo.')
    .max(30, 'Limite de 30 caracteres atingido.')
    .regex(
      /^[a-zA-Z\sáéêíóúãáçÃÁÉÊÍÓÚ]+$/,
      'O nome deve conter apenas letras A-Z a-z, espaços e acentos.',
    ),
  birthDate: z.date(),
  course: z.enum(['Ciência da Computação', 'Engenharia de Computação']),
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
  secondaryPhone: z
    .string()
    .refine(isValidPhoneNumber, { message: 'Número de telefone inválido.' })
    .refine(
      (value) => {
        return value.length === 14;
      },
      {
        message: 'Número de telefone inválido.',
      },
    )
    .optional()
    .or(z.literal('')),
  semester: z.coerce
    .string()
    .min(1, 'Período atual Inválido.')
    .max(15, 'Período atual Inválido.'),
  entrySemester: z.string().refine(
    (value) => {
      const currentYear = new Date().getFullYear();
      const entryYear = parseInt(value.split('.')[0], 10);
      return /^\d{4}\.(1|2)$/.test(value) && entryYear <= currentYear;
    },
    {
      message:
        'O ano do período de ingresso não pode ser posterior ao ano atual e deve estar no formato ANO.SEMESTRE_LETIVO (ex: 2020.1, 2020.2, 2024.1, 2024.2).',
    },
  ),
  registration: z.string().refine((value) => /^\d{8}$/.test(value), {
    message: 'Formato de matrícula inválido.',
  }),
});
