'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/shared/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import ForgotPasswordForm from '@/modules/auth/forms/forgot-password-form'

export default function ForgotPasswordPage() {
  return (
    <div className="relative w-full max-w-4xl">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>¿Olvidaste tu contraseña?</CardTitle>
          <CardDescription>
            Ingresa tu correo registrado y te enviaremos un enlace para
            reestablecerla
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ForgotPasswordForm />
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
