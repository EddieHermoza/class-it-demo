import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.email({ message: 'El correo debe ser válido' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>
