import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/shared/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import ResetPasswordForm from '@/modules/auth/forms/reset-password-form'

type SearchParams = {
  token?: string
}

type Props = {
  searchParams: Promise<SearchParams>
}
export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams
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
          <ResetPasswordForm token={token} />
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
