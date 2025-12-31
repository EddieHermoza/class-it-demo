'use client'
import {
  ForgotPasswordSchema,
  ForgotPasswordSchemaType,
} from '../schemas/forgot-password.schema'
import ErrorMessage from '@/modules/shared/components/error-message'
import { Button } from '@/modules/shared/components/ui/button'
import { Input } from '@/modules/shared/components/ui/input'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Label } from '@/modules/shared/components/ui/label'

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
  })
  const { sendRequest } = useSendRequest('/api/V1/auth/forgot-password', 'POST')

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    const { error } = await sendRequest(data)
    if (error) {
      toast.error(error)
      return
    }
    toast.success(
      'Si el correo existe, te enviaremos un enlace de recuperación'
    )
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="tu@ejemplo.com"
          {...register('email')}
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar enlace de recuperación'}
      </Button>
    </form>
  )
}
