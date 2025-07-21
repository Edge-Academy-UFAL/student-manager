import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email('Adicione um email válido.'),
  password: z
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres.')
    .max(20, 'A senha deve ter no máximo 20 caracteres.'),
});

export type LoginFormSchema = z.infer<typeof LoginFormSchema>;
