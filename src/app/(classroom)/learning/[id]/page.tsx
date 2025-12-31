import CourseFullContentProgress from '@/modules/learning/components/course-full-content-progress'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}
export default async function LearningCoursePage({ params }: Props) {
  const { id } = await params
  if (!id) notFound()
  return (
    <div className="w-full">
      <CourseFullContentProgress courseId={id} />
    </div>
  )
}
