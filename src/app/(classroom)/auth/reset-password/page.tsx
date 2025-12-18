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

export default function ResetPasswordPage() {
  return (
    <div className="relative w-full max-w-4xl">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Reestablecer contraseña</CardTitle>
          <CardDescription>Ingresa tu nueva contraseña</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5">
            <div className="space-y-2">
              <Label>Contraseña</Label>
              <Input id="password" type="password" />
            </div>
            <div className="space-y-2">
              <Label>Confirmar Contraseña</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button>Reestablecer contraseña</Button>
          </form>
        </CardContent>
        <Link
          href={'/auth/login'}
          className="text-primary flex-center mt-5 gap-3 text-sm hover:underline"
        >
          <ArrowLeft className="size-4" />
          Volver al inicio de sesión
        </Link>
      </Card>
    </div>
  )
}
