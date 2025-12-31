'use client'

import ErrorMessage from '@/modules/shared/components/error-message'
import { Button } from '@/modules/shared/components/ui/button'
import { Input } from '@/modules/shared/components/ui/input'
import { Session } from 'next-auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  ChangePasswordSchema,
  ChangePasswordSchemaType,
} from '../schemas/change-password-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'

interface Props {
  session: Session
}

export default function ChangePasswordForm({ session }: Props) {
  const token = session.tokens.access

  const { sendRequest, loading } = useSendRequest(
    '/api/V1/auth/change-password',
    'PATCH',
    token 
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
  })

  const onSubmit: SubmitHandler<ChangePasswordSchemaType> = async (data) => {
    const { error } = await sendRequest(data)

    if (error) {
      toast.error(error ?? 'Error al actualizar la contraseña')
      return
    }

    toast.success('Contraseña actualizada correctamente')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <label className="flex flex-col gap-2 text-sm">
        <span>Contraseña actual</span>
        <Input
          type="password"
          placeholder="Ingresa tu contraseña actual"
          {...register('password')}
          disabled={isSubmitting || loading}
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}
      </label>

      <label className="flex flex-col gap-2 text-sm">
        <span>Nueva contraseña</span>
        <Input
          type="password"
          placeholder="Ingresa tu nueva contraseña"
          {...register('newPassword')}
          disabled={isSubmitting || loading}
        />
        {errors.newPassword && (
          <ErrorMessage message={errors.newPassword.message} />
        )}
      </label>

      <label className="flex flex-col gap-2 text-sm">
        <span>Confirmar nueva contraseña</span>
        <Input
          type="password"
          placeholder="Repite tu nueva contraseña"
          {...register('confirmPassword')}
          disabled={isSubmitting || loading}
        />
        {errors.confirmPassword && (
          <ErrorMessage message={errors.confirmPassword.message} />
        )}
      </label>

      <Button
        type="submit"
        disabled={isSubmitting || loading}
        className="mt-4 w-full"
      >
        Cambiar contraseña
      </Button>
    </form>
  )
}
