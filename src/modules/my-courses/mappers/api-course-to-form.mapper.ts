// lib/mappers/api-course-to-form.mapper.ts
import { CourseSchemaType } from '@/modules/my-courses/schemas/course-schema'
import { id } from 'zod/v4/locales'

type ApiCourseResponse = {
  course: {
    id: string
    title: string
    description: string
    whatYouWillLearn: string
    targetAudience: string
    requirements: string[]
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL_LEVELS'
    categoryId: string
    estimatedDuration: number
    avgRating?: number
    imageUrl: string
    // otros campos que no usamos en el form
  }
  teacher: {
    name: string | null
    lastName: string | null
    title: string | null
    avatarUrl: string | null
    bio: string | null
  }
  sections: Array<{
    id: string
    title: string
    description: string | null
    position: number
    duration: number
    lecturesCount: number
    lectures: Array<{
      id: string
      title: string
      videoUrl: string | null
      duration: number | null
      isPreview: boolean
      position: number
      description?: string | null
    }>
  }>
}

/**
 * Convierte la respuesta real del endpoint /full-content o /preview
 * al formato exacto que espera CourseSchema (para edición del curso)
 */
export function mapApiCourseToFormData(
  apiData: ApiCourseResponse
): CourseSchemaType {
  // Mapeo de secciones y lecciones válidas
  const sections = apiData.sections
    .map((section) => {
      const validLectures = section.lectures
        .filter((lecture) => {
          // Solo aceptamos lecciones con título e ID (los mínimos esenciales)
          return (
            lecture &&
            lecture.id &&
            lecture.title &&
            lecture.title.trim() !== ''
          )
        })
        .map((lecture) => ({
          id: lecture.id,
          title: lecture.title.trim(),
          description: lecture.description?.trim() || undefined,
          duration: lecture.duration ?? 1, // mínimo 1 minuto si viene null
          videoUrl: lecture.videoUrl?.trim() || '',
          isPreview: lecture.isPreview ?? false,
          position: lecture.position ?? 0,
        }))

      // Si no hay lecciones válidas, descartamos la sección
      if (validLectures.length === 0) return null

      return {
        id: section.id,
        title: section.title.trim(),
        description: section.description?.trim() || undefined,
        position: section.position ?? 0,
        lectures: validLectures,
      }
    })
    .filter(
      (section): section is NonNullable<typeof section> => section !== null
    )

  const generateShortDescription = (): string => {
    const fullDesc = apiData.course.description.trim()
    if (fullDesc.length >= 20) {
      return fullDesc.slice(0, 160)
    }
    const learn = apiData.course.whatYouWillLearn.trim()
    return learn.slice(0, 160)
  }

  return {
    title: apiData.course.title.trim(),
    description: apiData.course.description.trim(),
    shortDescription: generateShortDescription(),
    whatYouWillLearn: apiData.course.whatYouWillLearn.trim(),
    targetAudience: apiData.course.targetAudience.trim(),
    requirements: apiData.course.requirements.map((r) => r.trim()),
    level: apiData.course.level,
    categoryId: apiData.course.categoryId,
    file: apiData.course.imageUrl,

    // Solo incluimos secciones si tienen al menos 1 lección válida
    sections: sections.length > 0 ? sections : [],
  }
}
