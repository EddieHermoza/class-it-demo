
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/shared/components/ui/card'
import ChangePasswordForm from '@/modules/settings/forms/change-password-form'
import { authOptions } from '@/modules/auth/auth-options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function SecurityPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/login')
  return (
    <>
      <Card className="w-full max-w-3xl rounded-none">
        {/* Header */}
        <CardHeader className="border-b px-8 py-6 text-center">
          <CardTitle className="text-2xl">Seguridad</CardTitle>
          <CardDescription>Cambia tu contraseña aquí</CardDescription>
        </CardHeader>

        <div className="space-y-10 px-8 py-6">
          {/* Email */}
          {/* <section>
            <label className="mb-2 block text-sm font-medium">Email:</label>

            <div className="flex items-center gap-3">
              <Input disabled />

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                <Pencil className="size-4" />
              </Button>
            </div>
          </section> */}

          <hr />

          <section className="space-y-4">
            <ChangePasswordForm session={session} />
          </section>

          <hr />
        </div>
      </Card>
    </>
  )
}
