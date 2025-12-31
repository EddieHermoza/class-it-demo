'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import {
  CourseSchema,
  CourseSchemaType,
} from '@/modules/my-courses/schemas/course-schema'
import { SectionList } from './form-sections/course-sections-list-form'

import { CourseResumeForm } from './form-sections/course-resume-form'
import { useRouter } from 'next/navigation'
import CourseBasicInfo from './form-sections/course-basic-info-form'
import { useSession } from 'next-auth/react'
import { useSendRequest } from '../shared/hooks/use-send-request'
import { toast } from 'sonner'
import CourseImageSection from './form-sections/course-image-form'

interface Props {
  courseId: string
  defaultValues: CourseSchemaType
}
export function CourseEditForm({ defaultValues, courseId }: Props) {
  const { data: session } = useSession()
  const { sendRequest } = useSendRequest(
    `/api/V1/courses/${courseId}`,
    'PATCH',
    session?.tokens.access,
    true
  )
  const { push } = useRouter()
  const methods = useForm({
    resolver: zodResolver(CourseSchema),
    reValidateMode: 'onChange',
    defaultValues: defaultValues,
  })

  const onSubmit = methods.handleSubmit(async (data) => {
    const formData = new FormData()
    if (data.file) formData.append('file', data.file)

    formData.append('title', data.title)
    formData.append('shortDescription', data.shortDescription)
    formData.append('description', data.description)
    formData.append('whatYouWillLearn', data.whatYouWillLearn)
    formData.append('targetAudience', data.targetAudience)
    formData.append('categoryId', data.categoryId)
    formData.append('level', data.level)

    formData.append('requirements', JSON.stringify(data.requirements))
    formData.append('sections', JSON.stringify(data.sections))
    const { error } = await sendRequest(formData)
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Curso actualizado correctamente')

    push('/my-courses')
    return
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="w-full space-y-8">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <CourseImageSection
              defaultImageUrl={defaultValues.file as string}
            />
            <CourseBasicInfo />

            <SectionList />
          </div>

          <div className="space-y-6">
            <CourseResumeForm />
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
