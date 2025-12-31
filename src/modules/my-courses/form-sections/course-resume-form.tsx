'use client'

import { useFormContext, useWatch } from 'react-hook-form'

import { Button } from '@/modules/shared/components/ui/button'


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/shared/components/ui/card'
import { Badge } from '@/modules/shared/components/ui/badge'

import { CourseSchemaType } from '@/modules/my-courses/schemas/course-schema'
import { useMemo } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

export function CourseResumeForm() {
  const {
    control,

    formState: { isSubmitting },
  } = useFormContext<CourseSchemaType>()

  const sections = useWatch({ control, name: 'sections' })
  const { totalDuration, totalLectures } = useMemo(() => {
    let duration = 0
    let lecturesCount = 0

    sections.forEach((section) => {
      lecturesCount += section.lectures.length
      duration += section.lectures.reduce(
        (acc, lecture) => acc + (lecture.duration || 0),
        0
      )
    })

    return { totalDuration: duration, totalLectures: lecturesCount }
  }, [sections])
  return (
    <Card className="sticky top-6 rounded-none">
      <CardHeader>
        <CardTitle>Resumen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between border-b py-2">
          <span className="text-sm font-semibold">Duración Estimada</span>
          <Badge variant="secondary">{totalDuration} min</Badge>
        </div>
        <div className="flex items-center justify-between border-b py-2">
          <span className="text-sm font-semibold">Secciones</span>
          <Badge variant="outline">{sections.length}</Badge>
        </div>
        <div className="flex items-center justify-between border-b py-2">
          <span className="text-sm font-semibold">Lecciones</span>
          <Badge variant="outline">{totalLectures}</Badge>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <AiOutlineLoading size={18} className="animate-spin ease-in-out" />
          ) : (
            <>Guardar Curso</>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
