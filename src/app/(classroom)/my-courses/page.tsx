import { authOptions } from '@/modules/auth/auth-options'
import { ToggleCategory } from '@/modules/my-courses/filters/categories-filter'
import QueryFilter from '@/modules/my-courses/filters/query-filter'
import { ToggleStatus } from '@/modules/my-courses/filters/status-filter'
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
    <div className="py-5 max-md:px-3">
      <div className="container mx-auto mb-5 flex w-full items-end justify-between gap-5 p-5 max-sm:flex-col">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-balance lg:text-3xl">
            Mis cursos
          </h1>
          <p className="text-muted-foreground">
            Gestiona tus cursos publicados y en borrador como instructor
          </p>
        </div>
        <Button asChild className="flex-center gap-3 rounded-none max-sm:w-full">
          <Link href={'/my-courses/create'}>
            <FiPlus className="size-4" />
            Crear un curso
          </Link>
        </Button>
      </div>
      <Suspense>
        <div className="container mx-auto mb-5 flex items-center justify-between gap-5 max-md:flex-col max-md:items-start ">
          <QueryFilter />
          <ToggleStatus />
          <ToggleCategory />
        </div>
        <MyCourseContainer />
      </Suspense>
    </div>
  )
}
