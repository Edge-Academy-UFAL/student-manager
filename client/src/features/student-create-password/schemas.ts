import { z } from 'zod';

export const createPasswordFormSchema = z.object({
    password: z
        .string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres.')
        .max(20, 'A senha deve ter no máximo 20 caracteres.'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
});