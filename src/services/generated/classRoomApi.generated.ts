import { emptySavingApi as api } from '@/modules/shared/store/emptySavingApi'
export const addTagTypes = [
  'Autenticaci\u00F3n',
  'Cursos',
  'Cursos - Alumno',
  'Cursos - Profesor',
  'Certificates',
  'Inscripciones',
  'Profesores',
  'Alumnos',
  'Administradores',
  'Health',
  'Categor\u00EDas',
] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      authControllerSignIn: build.mutation<
        AuthControllerSignInApiResponse,
        AuthControllerSignInApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/auth/sign-in`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['Autenticaci\u00F3n'],
      }),
      authControllerGetProfile: build.query<
        AuthControllerGetProfileApiResponse,
        AuthControllerGetProfileApiArg
      >({
        query: () => ({ url: `/api/V1/auth/profile` }),
        providesTags: ['Autenticaci\u00F3n'],
      }),
      authControllerRefreshToken: build.mutation<
        AuthControllerRefreshTokenApiResponse,
        AuthControllerRefreshTokenApiArg
      >({
        query: () => ({ url: `/api/V1/auth/refresh`, method: 'POST' }),
        invalidatesTags: ['Autenticaci\u00F3n'],
      }),
      authControllerRegister: build.mutation<
        AuthControllerRegisterApiResponse,
        AuthControllerRegisterApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/auth/register`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['Autenticaci\u00F3n'],
      }),
      authControllerResetPassword: build.mutation<
        AuthControllerResetPasswordApiResponse,
        AuthControllerResetPasswordApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/auth/reset-password`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['Autenticaci\u00F3n'],
      }),
      authControllerForgotPassword: build.mutation<
        AuthControllerForgotPasswordApiResponse,
        AuthControllerForgotPasswordApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/auth/forgot-password`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['Autenticaci\u00F3n'],
      }),
      coursesControllerGetPublishedCourses: build.query<
        CoursesControllerGetPublishedCoursesApiResponse,
        CoursesControllerGetPublishedCoursesApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/courses/published`,
          params: {
            limit: queryArg.limit,
            page: queryArg.page,
            query: queryArg.query,
            categoryId: queryArg.categoryId,
          },
        }),
        providesTags: ['Cursos'],
      }),
      coursesControllerGetPublishedCoursesCount: build.query<
        CoursesControllerGetPublishedCoursesCountApiResponse,
        CoursesControllerGetPublishedCoursesCountApiArg
      >({
        query: () => ({ url: `/api/V1/courses/published/count` }),
        providesTags: ['Cursos'],
      }),
      coursesStudentControllerEnroll: build.mutation<
        CoursesStudentControllerEnrollApiResponse,
        CoursesStudentControllerEnrollApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/courses/${queryArg}/enroll`,
          method: 'POST',
        }),
        invalidatesTags: ['Cursos - Alumno'],
      }),
      coursesStudentControllerGetContent: build.query<
        CoursesStudentControllerGetContentApiResponse,
        CoursesStudentControllerGetContentApiArg
      >({
        query: (queryArg) => ({ url: `/api/V1/courses/${queryArg}/content` }),
        providesTags: ['Cursos - Alumno'],
      }),
      coursesStudentControllerCompleteLecture: build.mutation<
        CoursesStudentControllerCompleteLectureApiResponse,
        CoursesStudentControllerCompleteLectureApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/courses/${queryArg.courseId}/lectures/${queryArg.lectureId}/watched`,
          method: 'POST',
        }),
        invalidatesTags: ['Cursos - Alumno'],
      }),
      coursesStudentControllerCreateReview: build.mutation<
        CoursesStudentControllerCreateReviewApiResponse,
        CoursesStudentControllerCreateReviewApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/courses/${queryArg.courseId}/review`,
          method: 'POST',
          body: queryArg.createReviewDto,
        }),
        invalidatesTags: ['Cursos - Alumno'],
      }),
      coursesStudentControllerDeleteMyReview: build.mutation<
        CoursesStudentControllerDeleteMyReviewApiResponse,
        CoursesStudentControllerDeleteMyReviewApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/courses/${queryArg}/review`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Cursos - Alumno'],
      }),
      coursesTeacherControllerGetMyCourses: build.query<
        CoursesTeacherControllerGetMyCoursesApiResponse,
        CoursesTeacherControllerGetMyCoursesApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/courses/my-courses`,
          params: {
            limit: queryArg.limit,
            page: queryArg.page,
            status: queryArg.status,
          },
        }),
        providesTags: ['Cursos - Profesor'],
      }),
      coursesTeacherControllerUpdateCourse: build.mutation<
        CoursesTeacherControllerUpdateCourseApiResponse,
        CoursesTeacherControllerUpdateCourseApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/courses/${queryArg.courseId}`,
          method: 'PATCH',
          body: queryArg.updateCourseDto,
        }),
        invalidatesTags: ['Cursos - Profesor'],
      }),
      coursesTeacherControllerDeleteCourse: build.mutation<
        CoursesTeacherControllerDeleteCourseApiResponse,
        CoursesTeacherControllerDeleteCourseApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/courses/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Cursos - Profesor'],
      }),
      coursesTeacherControllerPublishCourse: build.mutation<
        CoursesTeacherControllerPublishCourseApiResponse,
        CoursesTeacherControllerPublishCourseApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/courses/${queryArg}/publish`,
          method: 'PATCH',
        }),
        invalidatesTags: ['Cursos - Profesor'],
      }),
      coursesTeacherControllerCreateCourse: build.mutation<
        CoursesTeacherControllerCreateCourseApiResponse,
        CoursesTeacherControllerCreateCourseApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/courses`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['Cursos - Profesor'],
      }),
      coursesTeacherControllerCreateSection: build.mutation<
        CoursesTeacherControllerCreateSectionApiResponse,
        CoursesTeacherControllerCreateSectionApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/courses/${queryArg.courseId}/sections`,
          method: 'POST',
          body: queryArg.createSectionDto,
        }),
        invalidatesTags: ['Cursos - Profesor'],
      }),
      coursesTeacherControllerUpdateSection: build.mutation<
        CoursesTeacherControllerUpdateSectionApiResponse,
        CoursesTeacherControllerUpdateSectionApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/courses/${queryArg.courseId}/sections/${queryArg.sectionId}`,
          method: 'PATCH',
          body: queryArg.updateSectionDto,
        }),
        invalidatesTags: ['Cursos - Profesor'],
      }),
      coursesTeacherControllerReorderSections: build.mutation<
        CoursesTeacherControllerReorderSectionsApiResponse,
        CoursesTeacherControllerReorderSectionsApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/courses/${queryArg.courseId}/sections/reorder`,
          method: 'PATCH',
          body: queryArg.reorderSectionsDto,
        }),
        invalidatesTags: ['Cursos - Profesor'],
      }),
      coursesTeacherControllerCreateLecture: build.mutation<
        CoursesTeacherControllerCreateLectureApiResponse,
        CoursesTeacherControllerCreateLectureApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/courses/${queryArg.courseId}/sections/${queryArg.sectionId}/lectures`,
          method: 'POST',
          body: queryArg.createLectureDto,
        }),
        invalidatesTags: ['Cursos - Profesor'],
      }),
      coursesTeacherControllerUpdateLecture: build.mutation<
        CoursesTeacherControllerUpdateLectureApiResponse,
        CoursesTeacherControllerUpdateLectureApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/courses/${queryArg.courseId}/lectures/${queryArg.lectureId}`,
          method: 'PATCH',
          body: queryArg.updateLectureDto,
        }),
        invalidatesTags: ['Cursos - Profesor'],
      }),
      coursesTeacherControllerGetEnrolledStudents: build.query<
        CoursesTeacherControllerGetEnrolledStudentsApiResponse,
        CoursesTeacherControllerGetEnrolledStudentsApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/courses/${queryArg.courseId}/students`,
          params: {
            limit: queryArg.limit,
            page: queryArg.page,
          },
        }),
        providesTags: ['Cursos - Profesor'],
      }),
      certificatesControllerGetCertificate: build.query<
        CertificatesControllerGetCertificateApiResponse,
        CertificatesControllerGetCertificateApiArg
      >({
        query: (queryArg) => ({ url: `/api/V1/certificates/${queryArg}` }),
        providesTags: ['Certificates'],
      }),
      certificatesControllerGetCertificatesByStudent: build.query<
        CertificatesControllerGetCertificatesByStudentApiResponse,
        CertificatesControllerGetCertificatesByStudentApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/certificates/my-certificates`,
          params: {
            limit: queryArg.limit,
            page: queryArg.page,
          },
        }),
        providesTags: ['Certificates'],
      }),
      enrollmentsControllerGetMyEnrollments: build.query<
        EnrollmentsControllerGetMyEnrollmentsApiResponse,
        EnrollmentsControllerGetMyEnrollmentsApiArg
      >({
        query: () => ({ url: `/api/V1/enrollments/my-enrollments` }),
        providesTags: ['Inscripciones'],
      }),
      teachersControllerGetCount: build.query<
        TeachersControllerGetCountApiResponse,
        TeachersControllerGetCountApiArg
      >({
        query: () => ({ url: `/api/V1/teachers/count` }),
        providesTags: ['Profesores'],
      }),
      teachersControllerCreate: build.mutation<
        TeachersControllerCreateApiResponse,
        TeachersControllerCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/teachers`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['Profesores'],
      }),
      teachersControllerFindAll: build.query<
        TeachersControllerFindAllApiResponse,
        TeachersControllerFindAllApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/teachers`,
          params: {
            limit: queryArg.limit,
            page: queryArg.page,
          },
        }),
        providesTags: ['Profesores'],
      }),
      teachersControllerFindOne: build.query<
        TeachersControllerFindOneApiResponse,
        TeachersControllerFindOneApiArg
      >({
        query: (queryArg) => ({ url: `/api/V1/teachers/${queryArg}` }),
        providesTags: ['Profesores'],
      }),
      teachersControllerUpdate: build.mutation<
        TeachersControllerUpdateApiResponse,
        TeachersControllerUpdateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/teachers/${queryArg.teacherId}`,
          method: 'PATCH',
          body: queryArg.updateTeacherDto,
        }),
        invalidatesTags: ['Profesores'],
      }),
      teachersControllerRemove: build.mutation<
        TeachersControllerRemoveApiResponse,
        TeachersControllerRemoveApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/teachers/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Profesores'],
      }),
      studentsControllerGetCount: build.query<
        StudentsControllerGetCountApiResponse,
        StudentsControllerGetCountApiArg
      >({
        query: () => ({ url: `/api/V1/students/count` }),
        providesTags: ['Alumnos'],
      }),
      studentsControllerCreate: build.mutation<
        StudentsControllerCreateApiResponse,
        StudentsControllerCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/students`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['Alumnos'],
      }),
      studentsControllerFindAll: build.query<
        StudentsControllerFindAllApiResponse,
        StudentsControllerFindAllApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/students`,
          params: {
            limit: queryArg.limit,
            page: queryArg.page,
          },
        }),
        providesTags: ['Alumnos'],
      }),
      studentsControllerFindOne: build.query<
        StudentsControllerFindOneApiResponse,
        StudentsControllerFindOneApiArg
      >({
        query: (queryArg) => ({ url: `/api/V1/students/${queryArg}` }),
        providesTags: ['Alumnos'],
      }),
      studentsControllerUpdate: build.mutation<
        StudentsControllerUpdateApiResponse,
        StudentsControllerUpdateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/students/${queryArg.studentId}`,
          method: 'PATCH',
          body: queryArg.updateStudendDto,
        }),
        invalidatesTags: ['Alumnos'],
      }),
      studentsControllerRemove: build.mutation<
        StudentsControllerRemoveApiResponse,
        StudentsControllerRemoveApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/students/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Alumnos'],
      }),
      adminsControllerCreate: build.mutation<
        AdminsControllerCreateApiResponse,
        AdminsControllerCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/admins`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['Administradores'],
      }),
      adminsControllerFindAll: build.query<
        AdminsControllerFindAllApiResponse,
        AdminsControllerFindAllApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/admins`,
          params: {
            limit: queryArg.limit,
            page: queryArg.page,
          },
        }),
        providesTags: ['Administradores'],
      }),
      adminsControllerFindOne: build.query<
        AdminsControllerFindOneApiResponse,
        AdminsControllerFindOneApiArg
      >({
        query: (queryArg) => ({ url: `/api/V1/admins/${queryArg}` }),
        providesTags: ['Administradores'],
      }),
      adminsControllerUpdate: build.mutation<
        AdminsControllerUpdateApiResponse,
        AdminsControllerUpdateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/admins/${queryArg.adminId}`,
          method: 'PATCH',
          body: queryArg.updateAdminDto,
        }),
        invalidatesTags: ['Administradores'],
      }),
      adminsControllerRemove: build.mutation<
        AdminsControllerRemoveApiResponse,
        AdminsControllerRemoveApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/admins/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Administradores'],
      }),
      healthControllerCheck: build.query<
        HealthControllerCheckApiResponse,
        HealthControllerCheckApiArg
      >({
        query: () => ({ url: `/api/V1/health` }),
        providesTags: ['Health'],
      }),
      categoriesControllerGetCategories: build.query<
        CategoriesControllerGetCategoriesApiResponse,
        CategoriesControllerGetCategoriesApiArg
      >({
        query: () => ({ url: `/api/V1/categories` }),
        providesTags: ['Categor\u00EDas'],
      }),
      categoriesControllerCreateCategory: build.mutation<
        CategoriesControllerCreateCategoryApiResponse,
        CategoriesControllerCreateCategoryApiArg
      >({
        query: (queryArg) => ({
          url: `/api/V1/categories`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['Categor\u00EDas'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as classRoomApi }
export type AuthControllerSignInApiResponse =
  /** status 200 Inicio de sesión exitoso */ SignInResponseDto
export type AuthControllerSignInApiArg = SignInDto
export type AuthControllerGetProfileApiResponse =
  /** status 200 Perfil del usuario */ UserProfileResponseDto
export type AuthControllerGetProfileApiArg = void
export type AuthControllerRefreshTokenApiResponse =
  /** status 200 Tokens renovados correctamente */ TokensResponseDto
export type AuthControllerRefreshTokenApiArg = void
export type AuthControllerRegisterApiResponse =
  /** status 201 Usuario registrado exitosamente */ UserProfileResponseDto
export type AuthControllerRegisterApiArg = RegisterDto
export type AuthControllerResetPasswordApiResponse =
  /** status 200 Contraseña actualizada correctamente */ MessageResponseDto
export type AuthControllerResetPasswordApiArg = ResetPasswordDto
export type AuthControllerForgotPasswordApiResponse =
  /** status 200 Solicitud procesada. Si el email existe, se envió un enlace de recuperación. */ MessageResponseDto
export type AuthControllerForgotPasswordApiArg = ForgotPasswordDto
export type CoursesControllerGetPublishedCoursesApiResponse =
  /** status 200  */ PaginatedPublishedCourseResponseDto
export type CoursesControllerGetPublishedCoursesApiArg = {
  /** Cantidad de resultados por página */
  limit?: number
  /** Número de página */
  page?: number
  /** Texto de búsqueda */
  query?: string
  /** Filtrar cursos por una o varias categorías */
  categoryId?: string[]
}
export type CoursesControllerGetPublishedCoursesCountApiResponse =
  /** status 200  */ number
export type CoursesControllerGetPublishedCoursesCountApiArg = void
export type CoursesStudentControllerEnrollApiResponse =
  /** status 200 Inscripción realizada con éxito */
    | EnrollResponseDto
    | /** status 201  */ EnrollResponseDto
export type CoursesStudentControllerEnrollApiArg = /** ID del curso */ string
export type CoursesStudentControllerGetContentApiResponse =
  /** status 200 Estructura del curso + lecciones vistas */ CourseContentResponseDto
export type CoursesStudentControllerGetContentApiArg =
  /** ID del curso */ string
export type CoursesStudentControllerCompleteLectureApiResponse =
  /** status 200 Lección marcada correctamente */
    | LectureWatchedResponseDto
    | /** status 201  */ LectureWatchedResponseDto
export type CoursesStudentControllerCompleteLectureApiArg = {
  /** ID del curso */
  courseId: string
  /** ID de la lección */
  lectureId: string
}
export type CoursesStudentControllerCreateReviewApiResponse =
  /** status 200 Reseña guardada correctamente */ MessageResponseDto
export type CoursesStudentControllerCreateReviewApiArg = {
  /** ID del curso */
  courseId: string
  createReviewDto: CreateReviewDto
}
export type CoursesStudentControllerDeleteMyReviewApiResponse =
  /** status 200 Reseña eliminada */ MessageResponseDto
export type CoursesStudentControllerDeleteMyReviewApiArg =
  /** ID del curso */ string
export type CoursesTeacherControllerGetMyCoursesApiResponse =
  /** status 200 Lista paginada de cursos del profesor */ PaginatedCourseResponseDto
export type CoursesTeacherControllerGetMyCoursesApiArg = {
  /** Cantidad de resultados por página */
  limit?: number
  /** Número de página */
  page?: number
  /** Filtrar mis cursos por estado de publicación */
  status?: 'draft' | 'published' | 'all'
}
export type CoursesTeacherControllerUpdateCourseApiResponse =
  /** status 200 Curso actualizado correctamente */ CourseResponseDto
export type CoursesTeacherControllerUpdateCourseApiArg = {
  /** ID del curso */
  courseId: string
  updateCourseDto: UpdateCourseDto
}
export type CoursesTeacherControllerDeleteCourseApiResponse =
  /** status 200 Curso eliminado correctamente */ MessageResponseDto
export type CoursesTeacherControllerDeleteCourseApiArg =
  /** ID del curso */ string
export type CoursesTeacherControllerPublishCourseApiResponse =
  /** status 200 Curso publicado exitosamente */ CourseResponseDto
export type CoursesTeacherControllerPublishCourseApiArg =
  /** ID del curso */ string
export type CoursesTeacherControllerCreateCourseApiResponse =
  /** status 200 Curso creado exitosamente */
    | CourseResponseDto
    | /** status 201  */ CourseResponseDto
export type CoursesTeacherControllerCreateCourseApiArg = CreateCourseDto
export type CoursesTeacherControllerCreateSectionApiResponse =
  /** status 200 Sección creada correctamente */
    | SectionResponseDto
    | /** status 201  */ SectionResponseDto
export type CoursesTeacherControllerCreateSectionApiArg = {
  /** ID del curso */
  courseId: string
  createSectionDto: CreateSectionDto
}
export type CoursesTeacherControllerUpdateSectionApiResponse =
  /** status 200 Sección actualizada correctamente */ SectionResponseDto
export type CoursesTeacherControllerUpdateSectionApiArg = {
  /** ID del curso */
  courseId: string
  sectionId: string
  updateSectionDto: UpdateSectionDto
}
export type CoursesTeacherControllerReorderSectionsApiResponse =
  /** status 200 Orden de secciones actualizado */ MessageResponseDto
export type CoursesTeacherControllerReorderSectionsApiArg = {
  /** ID del curso */
  courseId: string
  reorderSectionsDto: ReorderSectionsDto
}
export type CoursesTeacherControllerCreateLectureApiResponse =
  /** status 200 Lección creada exitosamente */
    | LectureResponseDto
    | /** status 201  */ LectureResponseDto
export type CoursesTeacherControllerCreateLectureApiArg = {
  /** ID del curso */
  courseId: string
  /** ID de la sección */
  sectionId: string
  createLectureDto: CreateLectureDto
}
export type CoursesTeacherControllerUpdateLectureApiResponse =
  /** status 200 Lección actualizada correctamente */ LectureResponseDto
export type CoursesTeacherControllerUpdateLectureApiArg = {
  /** ID del curso */
  courseId: string
  /** ID de la lección */
  lectureId: string
  updateLectureDto: UpdateLectureDto
}
export type CoursesTeacherControllerGetEnrolledStudentsApiResponse =
  /** status 200 Lista paginada de alumnos */ PaginatedEnrolledStudentResponseDto
export type CoursesTeacherControllerGetEnrolledStudentsApiArg = {
  /** ID del curso */
  courseId: string
  /** Cantidad de resultados por página */
  limit?: number
  /** Número de página */
  page?: number
}
export type CertificatesControllerGetCertificateApiResponse =
  /** status 200  */ CertificateResponseDto
export type CertificatesControllerGetCertificateApiArg =
  /** ID del certificado */ string
export type CertificatesControllerGetCertificatesByStudentApiResponse =
  /** status 200  */ PaginatedCertificateResponseDto
export type CertificatesControllerGetCertificatesByStudentApiArg = {
  /** Cantidad de resultados por página */
  limit?: number
  /** Número de página */
  page?: number
}
export type EnrollmentsControllerGetMyEnrollmentsApiResponse =
  /** status 200  */ PaginatedEnrollmentResponseDto
export type EnrollmentsControllerGetMyEnrollmentsApiArg = void
export type TeachersControllerGetCountApiResponse = /** status 200  */ number
export type TeachersControllerGetCountApiArg = void
export type TeachersControllerCreateApiResponse =
  /** status 200 Profesor creado exitosamente */
    | TeacherResponseDto
    | /** status 201  */ TeacherResponseDto
export type TeachersControllerCreateApiArg = CreateTeacherDto
export type TeachersControllerFindAllApiResponse =
  /** status 200 Lista paginada de profesores */ PaginatedTeacherResponseDto
export type TeachersControllerFindAllApiArg = {
  /** Cantidad de resultados por página */
  limit?: number
  /** Número de página */
  page?: number
}
export type TeachersControllerFindOneApiResponse =
  /** status 200 Detalles del profesor */ TeacherResponseDto
export type TeachersControllerFindOneApiArg = /** ID del profesor */ string
export type TeachersControllerUpdateApiResponse =
  /** status 200 Profesor actualizado correctamente */ TeacherResponseDto
export type TeachersControllerUpdateApiArg = {
  /** ID del profesor */
  teacherId: string
  updateTeacherDto: UpdateTeacherDto
}
export type TeachersControllerRemoveApiResponse =
  /** status 200 Profesor eliminado correctamente */ MessageResponseDto
export type TeachersControllerRemoveApiArg = /** ID del profesor */ string
export type StudentsControllerGetCountApiResponse = /** status 200  */ number
export type StudentsControllerGetCountApiArg = void
export type StudentsControllerCreateApiResponse =
  /** status 200  */ StudentResponseDto
export type StudentsControllerCreateApiArg = CreateStudentDto
export type StudentsControllerFindAllApiResponse =
  /** status 200 Lista paginada de alumnos */ StudentResponseDto
export type StudentsControllerFindAllApiArg = {
  /** Cantidad de resultados por página */
  limit?: number
  /** Número de página */
  page?: number
}
export type StudentsControllerFindOneApiResponse =
  /** status 200 Detalles del alumno */ StudentResponseDto
export type StudentsControllerFindOneApiArg = /** ID del alumno */ string
export type StudentsControllerUpdateApiResponse =
  /** status 200 Alumno actualizado correctamente */ StudentResponseDto
export type StudentsControllerUpdateApiArg = {
  /** ID del alumno */
  studentId: string
  updateStudendDto: UpdateStudendDto
}
export type StudentsControllerRemoveApiResponse = unknown
export type StudentsControllerRemoveApiArg = /** ID del alumno */ string
export type AdminsControllerCreateApiResponse =
  /** status 200 Datos del administrador creado */ AdminResponseDto
export type AdminsControllerCreateApiArg = CreateAdminDto
export type AdminsControllerFindAllApiResponse =
  /** status 200 Lista paginada de administradores */ PaginatedAdminResponseDto
export type AdminsControllerFindAllApiArg = {
  /** Cantidad de resultados por página */
  limit?: number
  /** Número de página */
  page?: number
}
export type AdminsControllerFindOneApiResponse =
  /** status 200 Detalles del administrador */ AdminResponseDto
export type AdminsControllerFindOneApiArg = /** ID del administrador */ string
export type AdminsControllerUpdateApiResponse =
  /** status 200 Administrador actualizado correctamente */ AdminResponseDto
export type AdminsControllerUpdateApiArg = {
  /** ID del administrador */
  adminId: string
  updateAdminDto: UpdateAdminDto
}
export type AdminsControllerRemoveApiResponse =
  /** status 200 Administrador eliminado correctamente */ MessageResponseDto
export type AdminsControllerRemoveApiArg = /** ID del administrador */ string
export type HealthControllerCheckApiResponse =
  /** status 200 The Health Check is successful */ {
    status?: string
    info?: {
      [key: string]: {
        status: string
        [key: string]: any
      }
    } | null
    error?: {
      [key: string]: {
        status: string
        [key: string]: any
      }
    } | null
    details?: {
      [key: string]: {
        status: string
        [key: string]: any
      }
    }
  }
export type HealthControllerCheckApiArg = void
export type CategoriesControllerGetCategoriesApiResponse =
  /** status 200 Lista de categorías obtenida exitosamente */ CategoryResponseDto[]
export type CategoriesControllerGetCategoriesApiArg = void
export type CategoriesControllerCreateCategoryApiResponse =
  /** status 200 Categoría creada exitosamente */
    | CategoryResponseDto
    | /** status 201  */ CategoryResponseDto
export type CategoriesControllerCreateCategoryApiArg = CreateCategoryDto
export type UserProfileResponseDto = {
  id: string
  email: string
  name: string
  lastName: string
  avatarUrl?: string | null
  modulesAccess?: string[] | null
  roleId: string
  role: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'SUPER_ADMIN'
}
export type TokensResponseDto = {
  access: string
  refresh: string
}
export type SignInResponseDto = {
  user: UserProfileResponseDto
  tokens: TokensResponseDto
}
export type SignInDto = {
  /** Email del usuario */
  email: string
  password: string
}
export type RegisterDto = {
  /** Correo Electrónico */
  email: string
  /** Contraseña (mínimo 8 caracteres) */
  password: string
  name: string
  lastName: string
}
export type MessageResponseDto = {
  message: string
}
export type ResetPasswordDto = {
  newPassword: string
  token: string
}
export type ForgotPasswordDto = {
  /** Email del usuario */
  email: string
}
export type PublishedCourseResponseDto = {
  id: string
  title: string
  description: string
  shortDescription: string
  level: string
  imageUrl: string
  estimatedDuration: number
  teacherFullName: string
  teacherAvatarUrl: string
  avgRating: number
}
export type PaginatedPublishedCourseResponseDto = {
  data: PublishedCourseResponseDto[]
  total: number
  totalPages: number
}
export type EnrollResponseDto = {
  id: string
  courseId: string
  studentId: string
  enrolledAt: string
}
export type ProgressResponseDto = {
  /** Si la lección fue marcada como vista */
  watched: boolean
  /** Fecha en que se marcó como vista */
  lastWatched: string
  /** Segundos vistos de la lección */
  watchedSeconds: number
}
export type LectureWithProgressResponseDto = {
  id: string
  videoUrl: string
  title: string
  position: number
  /** Si es una lección de vista previa (gratuita) */
  isPreview: boolean
  /** Duración de la lección en segundos */
  duration: number
  progress: ProgressResponseDto
}
export type SectionWithLecturesResponseDto = {
  id: string
  title: string
  description: string | null
  position: number
  lectures: LectureWithProgressResponseDto[]
}
export type CourseContentResponseDto = {
  course: PublishedCourseResponseDto[]
  sections: SectionWithLecturesResponseDto[]
}
export type LectureWatchedResponseDto = {
  lectureId: string
  watched: boolean
  lastWatched: string
  watchedSeconds: number
}
export type CreateReviewDto = {
  rating: number
}
export type CourseResponseDto = {
  id: string
  title: string
  description: string | null
  shortDescription: string | null
  level: string
  imageUrl: string
  estimatedDuration: number
  isPublished: boolean
  createdAt: string
  updatedAt: string
}
export type PaginatedCourseResponseDto = {
  data: CourseResponseDto[]
  total: number
  totalPages: number
}
export type UpdateCourseDto = {
  level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL_LEVELS'
  title?: string
  shortDescription?: string
  description?: string
}
export type CreateCourseDto = {
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL_LEVELS'
  title: string
  shortDescription: string
  description: string
}
export type SectionResponseDto = {
  id: string
  title: string
  description: string | null
  position: number
}
export type CreateSectionDto = {
  title: string
  description?: string
  position: number
}
export type UpdateSectionDto = {}
export type ReorderSectionItemDto = {
  /** ID de la sección */
  id: string
  /** Nueva posición (empezando en 0) */
  position: number
}
export type ReorderSectionsDto = {
  /** Array con el nuevo orden de las secciones */
  order: ReorderSectionItemDto[]
}
export type LectureResponseDto = {
  id: string
  videoUrl: string
  title: string
  position: number
  /** Si es una lección de vista previa (gratuita) */
  isPreview: boolean
  /** Duración de la lección en segundos */
  duration: number
}
export type CreateLectureDto = {
  title: string
  description?: string
  position: number
  duration?: number
  isPreview?: boolean
  videoUrl: string
}
export type UpdateLectureDto = {}
export type EnrolledStudentResponseDto = {
  id: string
  name: string
  lastName: string
  email: string
  bio: string
  avatarUrl: string
}
export type PaginatedEnrolledStudentResponseDto = {
  data: EnrolledStudentResponseDto[]
  total: number
  totalPages: number
}
export type CertificateResponseDto = {
  id: string
  studentId: string
  studentFullname: string
  courseId: string
  courseTitle: string
  teacherId: string
  teacherFullname: string
  createdAt: string
}
export type PaginatedCertificateResponseDto = {
  data: CertificateResponseDto[]
  total: number
  totalPages: number
}
export type EnrollmentResponseDto = {
  id: string
  courseId: string
  courseTitle: string
  courseImageUrl: string
  studentId: string
  teacherId: string
  teacherFullName: string
  enrolledAt: string
  progress: number
  completed: boolean
  completedAt: string | null
}
export type PaginatedEnrollmentResponseDto = {
  data: EnrollmentResponseDto[]
  total: number
  totalPages: number
}
export type TeacherResponseDto = {
  id: string
  email: string
  name: string
  lastName: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}
export type CreateTeacherDto = {
  /** Correo Electrónico */
  email: string
  /** Contraseña (mínimo 8 caracteres) */
  password: string
  /** Nombre del docente */
  name: string
  /** Apellido del docente */
  lastName: string
  /** Título académico (Dr., Lic., Prof., etc.) */
  title?: string
  /** Biografía o descripción del docente */
  bio?: string
}
export type PaginatedTeacherResponseDto = {
  data: TeacherResponseDto[]
  total: number
  totalPages: number
}
export type UpdateTeacherDto = {
  /** Correo Electrónico */
  email?: string
  /** Contraseña (mínimo 8 caracteres) */
  password?: string
  /** Nombre del docente */
  name?: string
  /** Apellido del docente */
  lastName?: string
  /** Título académico (Dr., Lic., Prof., etc.) */
  title?: string
  /** Biografía o descripción del docente */
  bio?: string
}
export type StudentResponseDto = {
  id: string
  email: string
  name: string
  lastName: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}
export type CreateStudentDto = {
  /** Correo Electrónico */
  email: string
  /** Contraseña (mínimo 8 caracteres) */
  password: string
  /** Nombre del estudiante */
  name: string
  /** Apellido del estudiante */
  lastName: string
}
export type UpdateStudendDto = {}
export type AdminResponseDto = {
  id: string
  email: string
  name: string
  lastName: string
  isActive: boolean
  role: string
  modulesAccess: string[]
  createdAt: string
  updatedAt: string
}
export type CreateAdminDto = {
  /** Correo Electrónico */
  email: string
  /** Contraseña (mínimo 8 caracteres) */
  password: string
  /** Nombre del administrador */
  name: string
  /** Apellido del administrador */
  lastName: string
  role: 'ADMIN' | 'SUPER_ADMIN'
  isActive?: boolean
  modulesAccess: string[]
}
export type PaginatedAdminResponseDto = {
  data: AdminResponseDto[]
  total: number
  totalPages: number
}
export type UpdateAdminDto = {
  /** Correo Electrónico */
  email?: string
  /** Contraseña (mínimo 8 caracteres) */
  password?: string
  /** Nombre del administrador */
  name?: string
  /** Apellido del administrador */
  lastName?: string
  role?: 'ADMIN' | 'SUPER_ADMIN'
  isActive?: boolean
  modulesAccess?: string[]
}
export type CategoryResponseDto = {
  id: string
  name: string
  description?: string | null
}
export type CreateCategoryDto = {
  name: string
  description?: string
}
export const {
  useAuthControllerSignInMutation,
  useAuthControllerGetProfileQuery,
  useLazyAuthControllerGetProfileQuery,
  useAuthControllerRefreshTokenMutation,
  useAuthControllerRegisterMutation,
  useAuthControllerResetPasswordMutation,
  useAuthControllerForgotPasswordMutation,
  useCoursesControllerGetPublishedCoursesQuery,
  useLazyCoursesControllerGetPublishedCoursesQuery,
  useCoursesControllerGetPublishedCoursesCountQuery,
  useLazyCoursesControllerGetPublishedCoursesCountQuery,
  useCoursesStudentControllerEnrollMutation,
  useCoursesStudentControllerGetContentQuery,
  useLazyCoursesStudentControllerGetContentQuery,
  useCoursesStudentControllerCompleteLectureMutation,
  useCoursesStudentControllerCreateReviewMutation,
  useCoursesStudentControllerDeleteMyReviewMutation,
  useCoursesTeacherControllerGetMyCoursesQuery,
  useLazyCoursesTeacherControllerGetMyCoursesQuery,
  useCoursesTeacherControllerUpdateCourseMutation,
  useCoursesTeacherControllerDeleteCourseMutation,
  useCoursesTeacherControllerPublishCourseMutation,
  useCoursesTeacherControllerCreateCourseMutation,
  useCoursesTeacherControllerCreateSectionMutation,
  useCoursesTeacherControllerUpdateSectionMutation,
  useCoursesTeacherControllerReorderSectionsMutation,
  useCoursesTeacherControllerCreateLectureMutation,
  useCoursesTeacherControllerUpdateLectureMutation,
  useCoursesTeacherControllerGetEnrolledStudentsQuery,
  useLazyCoursesTeacherControllerGetEnrolledStudentsQuery,
  useCertificatesControllerGetCertificateQuery,
  useLazyCertificatesControllerGetCertificateQuery,
  useCertificatesControllerGetCertificatesByStudentQuery,
  useLazyCertificatesControllerGetCertificatesByStudentQuery,
  useEnrollmentsControllerGetMyEnrollmentsQuery,
  useLazyEnrollmentsControllerGetMyEnrollmentsQuery,
  useTeachersControllerGetCountQuery,
  useLazyTeachersControllerGetCountQuery,
  useTeachersControllerCreateMutation,
  useTeachersControllerFindAllQuery,
  useLazyTeachersControllerFindAllQuery,
  useTeachersControllerFindOneQuery,
  useLazyTeachersControllerFindOneQuery,
  useTeachersControllerUpdateMutation,
  useTeachersControllerRemoveMutation,
  useStudentsControllerGetCountQuery,
  useLazyStudentsControllerGetCountQuery,
  useStudentsControllerCreateMutation,
  useStudentsControllerFindAllQuery,
  useLazyStudentsControllerFindAllQuery,
  useStudentsControllerFindOneQuery,
  useLazyStudentsControllerFindOneQuery,
  useStudentsControllerUpdateMutation,
  useStudentsControllerRemoveMutation,
  useAdminsControllerCreateMutation,
  useAdminsControllerFindAllQuery,
  useLazyAdminsControllerFindAllQuery,
  useAdminsControllerFindOneQuery,
  useLazyAdminsControllerFindOneQuery,
  useAdminsControllerUpdateMutation,
  useAdminsControllerRemoveMutation,
  useHealthControllerCheckQuery,
  useLazyHealthControllerCheckQuery,
  useCategoriesControllerGetCategoriesQuery,
  useLazyCategoriesControllerGetCategoriesQuery,
  useCategoriesControllerCreateCategoryMutation,
} = injectedRtkApi
