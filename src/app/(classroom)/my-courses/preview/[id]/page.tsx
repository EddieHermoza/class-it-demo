import { authOptions } from '@/modules/auth/auth-options'
import CourseFullContentPreviewPage from '@/modules/my-courses/course-full-content-preview-page'
import ReadyForReviewCourseButton from '@/modules/my-courses/publish-course-button'
import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}
export default async function PreviewCoursePage({ params }: Props) {
  const session = await getServerSession(authOptions)
  const token = session?.tokens.access

  if (!token) redirect('/auth/login')
  const { id } = await params
  if (!id) notFound()
  return (
    <div className="w-full">
      <div className="bg-primary/10 flex w-full items-center justify-between p-5">
        <span className="text-lg font-semibold">Vista previa del curso</span>
        <ReadyForReviewCourseButton courseId={id} token={token} />
      </div>
      <CourseFullContentPreviewPage courseId={id} />
    </div>
  )
}
