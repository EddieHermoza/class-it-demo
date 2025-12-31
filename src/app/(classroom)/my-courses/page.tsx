import { authOptions } from '@/modules/auth/auth-options'
import { CategoryFilter } from '@/modules/courses/components'
import MyCourseContainer from '@/modules/my-courses/my-courses-container'
import { Button } from '@/modules/shared/components/ui/button'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { FiPlus } from 'react-icons/fi'
export default async function MyCoursesPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/auth/login')
  }
  return (
    <div className="py-5">
      <div className="container mx-auto mb-5 flex w-full items-end justify-between gap-5 px-5">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-balance lg:text-3xl">
            Mis cursos
          </h1>
          <p className="text-muted-foreground">
            Gestiona tus cursos creados como instructor
          </p>
        </div>
        <Button asChild className="flex-center gap-3 rounded-none">
          <Link href={'/my-courses/create'}>
            <FiPlus className="size-4" />
            Crear un curso
          </Link>
        </Button>
      </div>
      <Suspense>
        <CategoryFilter className="w-screen justify-center xl:w-full" />
        <MyCourseContainer />
      </Suspense>
    </div>
  )
}
