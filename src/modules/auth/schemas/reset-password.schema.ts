import { z } from 'zod'

export const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Token inválido o faltante'),
    newPassword: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>
