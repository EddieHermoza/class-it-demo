'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { CourseSchema } from '@/modules/my-courses/schemas/course-schema'
import { SectionList } from './form-sections/course-sections-list-form'

import { CourseResumeForm } from './form-sections/course-resume-form'
import { useRouter } from 'next/navigation'
import CourseBasicInfo from './form-sections/course-basic-info-form'
import { useSession } from 'next-auth/react'
import { useSendRequest } from '../shared/hooks/use-send-request'
import { toast } from 'sonner'
import CourseImageSection from './form-sections/course-image-form'

export function CourseCreateForm() {
  const { data: session } = useSession()
  const { sendRequest } = useSendRequest(
    '/api/V1/courses',
    'POST',
    session?.tokens.access,
    true
  )
  const { push } = useRouter()
  const methods = useForm({
    resolver: zodResolver(CourseSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      shortDescription: '',
      whatYouWillLearn: '',
      targetAudience: '',
      requirements: [],
      sections: [
        {
          title: 'Introducción',
          position: 0,
          description: '',
          lectures: [
            {
              title: 'Bienvenida al curso',
              position: 0,
              duration: 5,
              isPreview: true,
            },
          ],
        },
      ],
    },
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
    toast.success('Curso creado correctamente')

    push('/my-courses')
    return
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="w-full space-y-8">
        <div className="lg:grid-cols-3 grid w-full grid-cols-1 gap-6">
          <div className="space-y-6 lg:col-span-2">
            <CourseImageSection />
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
