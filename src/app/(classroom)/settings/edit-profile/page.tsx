import { authOptions } from '@/modules/auth/auth-options'
import ProfileForm from '@/modules/settings/forms/profile-form'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/modules/shared/components/ui/card'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function EditProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/login')
  return (
    <Card className="w-full max-w-3xl rounded-none">
      <CardHeader className="border-b text-center">
        <CardTitle className="text-2xl font-semibold">Perfil</CardTitle>
        <CardDescription>Añade información sobre ti</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 px-8 py-6">
        <ProfileForm session={session} />
      </CardContent>
    </Card>
  )
}
