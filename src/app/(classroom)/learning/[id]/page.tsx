import CourseFullContentProgressPage from '@/modules/learning/components/course-full-content-progress-page'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}
export default async function LearningCoursePage({ params }: Props) {
  const { id } = await params
  if (!id) notFound()
  return (
    <div className="relative size-full">
      <CourseFullContentProgressPage courseId={id} />
    </div>
  )
}
