import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/shared/components/ui/card'

import PhotoForm from '@/modules/settings/forms/photo-form'
import { authOptions } from '@/modules/auth/auth-options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function EditPhotoPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/login')
  return (
    <Card className="w-full max-w-3xl rounded-none">
      <CardHeader className="border-b text-center">
        <CardTitle className="text-2xl font-semibold">Foto</CardTitle>
        <CardDescription>Añade una foto tuya a tu perfil</CardDescription>
      </CardHeader>

      <CardContent className="space-y-8 pt-8">
        <PhotoForm session={session} />
      </CardContent>
    </Card>
  )
}
