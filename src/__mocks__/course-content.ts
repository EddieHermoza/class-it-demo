export interface Lesson {
  id: string
  title: string
  duration: string
  isPreview?: boolean
  type: 'video'
  youtubeUrl?: string
}

export interface Section {
  id: string
  title: string
  classesCount: number
  duration: string
  lessons: Lesson[]
}

export interface Teacher {
  name: string
  lastName: string
  title: string
  avatarUrl: string
  bio: string
}

export interface CourseContent {
  courseId: string
  courseTitle: string
  currentModule: string
  currentCapsule: string
  description: string
  whatYouWillLearn: string
  targetAudience: string
  requirements: string
  teacher: Teacher
  sections: Section[]
}

export const courseContent: CourseContent = {
  courseId: 'course_001',
  courseTitle: 'Creación de contenido digital con Inteligencia Artificial',
  currentModule: 'Módulo 1',
  currentCapsule: 'Cápsula 1 - ¡Bienvenidos al curso!',
  description:
    '¿Te imaginas transformar tus ventas con la inteligencia artificial? ¿Te gustaría aprender a usar esta tecnología para optimizar tus procesos y aumentar tus ingresos?\n\nEn este curso de 6 módulos, descubrirás cómo la inteligencia artificial puede transformar los procesos de ventas en tu negocio. Aprenderás a utilizar la IA para optimizar operaciones y aumentar tus ventas mediante aplicaciones prácticas y herramientas fáciles de usar. Además, te guiaré en cómo implementar la IA y te mostraré en qué situaciones es mejor no utilizar estas herramientas.',
  whatYouWillLearn:
    'Descubrirás cómo la inteligencia artificial puede transformar los procesos de ventas en tu negocio. Aprenderás a utilizar la IA para optimizar operaciones y aumentar tus ventas mediante aplicaciones prácticas y herramientas fáciles de usar. Además, te guiaré en cómo implementar la IA y te mostraré en qué situaciones es mejor no utilizar estas herramientas.',
  targetAudience:
    'Dirigido a profesionales de la línea comercial (vendedores, ejecutivos, analistas) y emprendedores que deseen capacitarse en gestión comercial.',
  requirements: 'Ninguno.',
  teacher: {
    name: 'Emilio',
    lastName: 'Alarcon',
    title: 'Especialista en Ventas y Marketing',
    avatarUrl: 'https://i.pravatar.cc/300?img=13',
    bio: 'Emilio Alarcón, es especialista en Ventas y Marketing, y CEO de Venta Profesional Group, con más de 11 años de experiencia en el mundo comercial ha liderado equipos de más de 120 personas a nivel nacional como Gerente Comercial y de Marketing.\n\nConsultor, profesor de postgrado, mentor en organizaciones reconocidas y fundador de una prestigiosa Escuela de Ventas y Marketing. Además, cuenta con un MBA especializado en Transformación Digital y formación en escuelas de postgrado en Perú, Europa y EE.UU.',
  },
  sections: [
    {
      id: 'section_001',
      title: 'Introducción a la IA para Contenido Digital',
      classesCount: 3,
      duration: '45min',
      lessons: [
        {
          id: 'lesson_001',
          title: '¡Bienvenidos al curso!',
          duration: '15:30',
          isPreview: true,
          type: 'video',
          youtubeUrl: 'https://www.youtube.com/watch?v=aKF1JHNDCkY',
        },
        {
          id: 'lesson_002',
          title: '¿Qué es la Inteligencia Artificial?',
          duration: '18:45',
          type: 'video',
          youtubeUrl: 'https://www.youtube.com/watch?v=aKF1JHNDCkY',
        },
        {
          id: 'lesson_003',
          title: 'Aplicaciones de IA en Marketing Digital',
          duration: '11:20',
          type: 'video',
          youtubeUrl: 'https://www.youtube.com/watch?v=aKF1JHNDCkY',
        },
      ],
    },
    {
      id: 'section_002',
      title: 'Herramientas de IA para Creación de Contenido',
      classesCount: 2,
      duration: '1h 20min',
      lessons: [
        {
          id: 'lesson_004',
          title: 'ChatGPT para Redacción de Contenidos',
          duration: '35:15',
          type: 'video',
          youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        {
          id: 'lesson_005',
          title: 'Midjourney y DALL-E para Imágenes',
          duration: '45:00',
          type: 'video',
          youtubeUrl: 'https://www.youtube.com/watch?v=aKF1JHNDCkY',
        },
      ],
    },
    {
      id: 'section_003',
      title: 'Automatización de Procesos de Contenido',
      classesCount: 1,
      duration: '25min',
      lessons: [
        {
          id: 'lesson_006',
          title: 'Automatización con Zapier y IA',
          duration: '25:00',
          type: 'video',
          youtubeUrl: 'https://youtu.be/jNQXAC9IVRw',
        },
      ],
    },
    {
      id: 'section_004',
      title: 'Estrategias Avanzadas de Contenido',
      classesCount: 3,
      duration: '1h 15min',
      lessons: [
        {
          id: 'lesson_007',
          title: 'Creación de Contenido Multiformato',
          duration: '22:30',
          type: 'video',
          youtubeUrl: 'https://www.youtube.com/watch?v=aKF1JHNDCkY',
        },
        {
          id: 'lesson_008',
          title: 'Optimización SEO con IA',
          duration: '28:45',
          type: 'video',
          youtubeUrl: 'https://www.youtube.com/watch?v=aKF1JHNDCkY',
        },
        {
          id: 'lesson_009',
          title: 'Análisis de Performance con IA',
          duration: '24:00',
          type: 'video',
          youtubeUrl: 'https://www.youtube.com/watch?v=aKF1JHNDCkY',
        },
      ],
    },
    {
      id: 'section_005',
      title: 'Proyecto Final y Mejores Prácticas',
      classesCount: 2,
      duration: '50min',
      lessons: [
        {
          id: 'lesson_010',
          title: 'Desarrollo de Proyecto Final',
          duration: '30:00',
          type: 'video',
          youtubeUrl: 'https://www.youtube.com/watch?v=aKF1JHNDCkY',
        },
        {
          id: 'lesson_011',
          title: 'Mejores Prácticas y Conclusiones',
          duration: '20:00',
          type: 'video',
          youtubeUrl: 'https://www.youtube.com/watch?v=aKF1JHNDCkY',
        },
      ],
    },
  ],
}
