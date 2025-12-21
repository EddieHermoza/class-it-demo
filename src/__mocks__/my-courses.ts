import { CourseInterface, CourseLevel } from './courses'

export interface CourseWithProgress {
  course: CourseInterface
  progress: number
}

export const continueWatchingCourses: CourseWithProgress[] = [
  {
    course: {
      avgRating: 4.2,
      reviewsCount: 111,
      teacher: {
        name: 'Raúl',
        lastName: 'Rojas',
        avatarUrl: 'https://i.pravatar.cc/150?img=2',
      },
      description:
        'Aprende los fundamentos de programación con proyectos reales.',
      level: CourseLevel.BEGINNER,
      id: 'course_001',
      title: 'Introducción a la Programación',
      shortDescription: 'Conceptos base con ejercicios guiados.',
      imageUrl: 'https://picsum.photos/seed/course1/600/400',
      estimatedDuration: 11,
      categoryId: 'desarrollo',
    },
    progress: 45,
  },
  {
    course: {
      avgRating: 4.1,
      reviewsCount: 159,
      teacher: {
        name: 'Carlos',
        lastName: 'Gonzales',
        avatarUrl: 'https://i.pravatar.cc/150?img=3',
      },
      description: 'Domina React desde cero hasta nivel profesional.',
      level: CourseLevel.BEGINNER,
      id: 'course_002',
      title: 'React Completo',
      shortDescription: 'Hooks, Context, rendimiento.',
      imageUrl: 'https://picsum.photos/seed/course2/600/400',
      estimatedDuration: 24,
      categoryId: 'negocios',
    },
    progress: 78,
  },
  {
    course: {
      avgRating: 4.5,
      reviewsCount: 43,
      teacher: {
        name: 'Tomás',
        lastName: 'Jiménez',
        avatarUrl: 'https://i.pravatar.cc/150?img=4',
      },
      description: 'Crea landing pages modernas con Tailwind CSS.',
      level: CourseLevel.INTERMEDIATE,
      id: 'course_003',
      title: 'Tailwind CSS para Principiantes',
      shortDescription: 'Diseño rápido y consistente.',
      imageUrl: 'https://picsum.photos/seed/course3/600/400',
      estimatedDuration: 13,
      categoryId: 'negocios',
    },
    progress: 23,
  },
]

export const allMyCourses: CourseWithProgress[] = [
  ...continueWatchingCourses,
  {
    course: {
      avgRating: 4.9,
      reviewsCount: 212,
      teacher: {
        name: 'Elena',
        lastName: 'Martínez',
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
      },
      description:
        'Curso avanzado para dominar Node.js en entornos productivos.',
      level: CourseLevel.ADVANCED,
      id: 'course_004',
      title: 'Node.js Avanzado',
      shortDescription: 'APIs escalables, clustering, streams.',
      imageUrl: 'https://picsum.photos/seed/course4/600/400',
      estimatedDuration: 11,
      categoryId: 'data',
    },
    progress: 0,
  },
  {
    course: {
      avgRating: 4.5,
      reviewsCount: 62,
      teacher: {
        name: 'Jorge',
        lastName: 'Hernández',
        avatarUrl: 'https://i.pravatar.cc/150?img=6',
      },
      description: 'Aprende bases sólidas sobre diseño UI moderno.',
      level: CourseLevel.BEGINNER,
      id: 'course_005',
      title: 'Fundamentos de UI Design',
      shortDescription: 'Tipografía, color, layouts.',
      imageUrl: 'https://picsum.photos/seed/course5/600/400',
      estimatedDuration: 22,
      categoryId: 'data',
    },
    progress: 0,
  },
  {
    course: {
      avgRating: 4.7,
      reviewsCount: 356,
      teacher: {
        name: 'Diego',
        lastName: 'Pérez',
        avatarUrl: 'https://i.pravatar.cc/150?img=7',
      },
      description: 'Curso práctico de bases de datos SQL y modelado.',
      level: CourseLevel.ADVANCED,
      id: 'course_006',
      title: 'SQL y Modelado de Datos',
      shortDescription: 'Consultas, joins, normalización.',
      imageUrl: 'https://picsum.photos/seed/course6/600/400',
      estimatedDuration: 19,
      categoryId: 'desarrollo',
    },
    progress: 0,
  },
  {
    course: {
      avgRating: 4.2,
      reviewsCount: 413,
      teacher: {
        name: 'Andrés',
        lastName: 'Navarro',
        avatarUrl: 'https://i.pravatar.cc/150?img=10',
      },
      description: 'Aprende Next.js 14 con App Router desde cero.',
      level: CourseLevel.ADVANCED,
      id: 'course_009',
      title: 'Next.js 14 Moderno',
      shortDescription: 'Server components, rutas, optimización.',
      imageUrl: 'https://picsum.photos/seed/course9/600/400',
      estimatedDuration: 15,
      categoryId: 'desarrollo',
    },
    progress: 0,
  },
  {
    course: {
      avgRating: 4.4,
      reviewsCount: 73,
      teacher: {
        name: 'Víctor',
        lastName: 'López',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
      },
      description: 'Desarrolla aplicaciones modernas con Vue.js.',
      level: CourseLevel.INTERMEDIATE,
      id: 'course_011',
      title: 'Vue.js desde Cero',
      shortDescription: 'Componentes, Vuex, Vue Router.',
      imageUrl: 'https://picsum.photos/seed/course11/600/400',
      estimatedDuration: 14,
      categoryId: 'desarrollo',
    },
    progress: 0,
  },
  {
    course: {
      avgRating: 4.5,
      reviewsCount: 422,
      teacher: {
        name: 'Raúl',
        lastName: 'Moreno',
        avatarUrl: 'https://i.pravatar.cc/150?img=14',
      },
      description: 'Construye aplicaciones enterprise con Angular.',
      level: CourseLevel.INTERMEDIATE,
      id: 'course_013',
      title: 'Angular Profesional',
      shortDescription: 'Directivas, services, modules.',
      imageUrl: 'https://picsum.photos/seed/course13/600/400',
      estimatedDuration: 26,
      categoryId: 'diseño',
    },
    progress: 0,
  },
]
