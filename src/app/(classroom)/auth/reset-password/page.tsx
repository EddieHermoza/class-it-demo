'use client'

import { Button } from '@/modules/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/shared/components/ui/card'
import { Input } from '@/modules/shared/components/ui/input'
import { Label } from '@/modules/shared/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ResetPasswordSchema,
  ResetPasswordSchemaType,
} from '@/modules/auth/schemas/reset-password.schema'
import { toast } from 'sonner'
import { useAuthControllerResetPasswordMutation } from '@/services/generated/classRoomApi.generated'
import ErrorMessage from '@/modules/shared/components/ErrorMessage'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const { push } = useRouter()

  const token = searchParams.get('token')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      token: token ?? '',
    },
  })

  const [resetPassword, { isLoading }] =
    useAuthControllerResetPasswordMutation()

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    try {
      await resetPassword(data).unwrap()
      toast.success('Contraseña actualizada correctamente')
      push('/auth/login')
    } catch {
      toast.error('Error al reestablecer la contraseña')
    }
  }

  if (!token) {
    return (
      <p className="text-destructive text-center">Token inválido o expirado</p>
    )
  }

  return (
    <div className="relative w-full max-w-4xl">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Reestablecer contraseña</CardTitle>
          <CardDescription>Ingresa tu nueva contraseña</CardDescription>
        </CardHeader>

        <CardContent>
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

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Actualizando...' : 'Reestablecer contraseña'}
            </Button>
          </form>
        </CardContent>

        <Link
          href="/auth/login"
          className="text-primary flex-center mt-5 gap-3 text-sm hover:underline"
        >
          <ArrowLeft className="size-4" />
          Volver al inicio de sesión
        </Link>
      </Card>
    </div>
  )
}
