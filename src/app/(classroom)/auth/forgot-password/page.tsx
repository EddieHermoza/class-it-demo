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
          <form className="space-y-5">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="text" />
            </div>
            <Button>Enviar enlace de recuperación</Button>
          </form>
        </CardContent>
        <Link
          href={'/auth/login'}
          className="text-primary mt-5 flex-center gap-3 text-sm hover:underline"
        >
          <ArrowLeft  className='size-4'/>
          Volver al inicio de sesión
        </Link>
      </Card>
    </div>
  )
}
