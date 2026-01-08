'use client'

import ErrorMessage from '@/modules/shared/components/error-message'
import { Button } from '@/modules/shared/components/ui/button'
import { Input } from '@/modules/shared/components/ui/input'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  ResetPasswordSchemaType,
  ResetPasswordSchema,
} from '../schemas/reset-password.schema'
import { Label } from '@/modules/shared/components/ui/label'
interface Props {
  token: string
}
export default function ResetPasswordForm({ token }: Props) {
  const { push } = useRouter()
  const { sendRequest } = useSendRequest('/api/V1/auth/reset-password', 'POST')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      token: token ?? '',
    },
  })

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    const { error } = await sendRequest(data)
    if (error) {
      toast.error('Error al reestablecer la contraseña')
      return
    }
    toast.success('Contraseña actualizada correctamente')
    push('/auth/login')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label>Contraseña</Label>
        <Input type="password" {...register('newPassword')} />
        {errors.newPassword && (
          <ErrorMessage message={errors.newPassword.message} />
        )}
      </div>

      <div className="space-y-2">
        <Label>Confirmar Contraseña</Label>
        <Input type="password" {...register('confirmPassword')} />
        {errors.confirmPassword && (
          <ErrorMessage message={errors.confirmPassword.message} />
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Actualizando...' : 'Reestablecer contraseña'}
      </Button>
    </form>
  )
}
