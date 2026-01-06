import CoursePreviewContentPage from '@/modules/courses/components/course-preview-content-page'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}
export default async function CoursePreviewPage({ params }: Props) {
  const { id } = await params
  if (!id) notFound()

  return (
    <div className="relative size-full">
      <CoursePreviewContentPage courseId={id} />
    </div>
  )
}
