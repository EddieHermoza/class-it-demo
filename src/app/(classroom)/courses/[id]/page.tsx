import CoursePreviewContent from '@/modules/courses/components/course-preview-content'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}
export default async function CoursePreviewPage({ params }: Props) {
  const { id } = await params
  if (!id) notFound()

  return (
    <div className="w-full">
      <CoursePreviewContent courseId={id} />
    </div>
  )
}
