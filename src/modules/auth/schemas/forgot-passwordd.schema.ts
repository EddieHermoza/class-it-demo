import { z } from 'zod'

export const ForgotPasswordSchema = z.object({
  email: z.email('El correo electrónico no es válido'),
})

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>
