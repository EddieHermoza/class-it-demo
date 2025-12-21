export const courseDetail = {
  id: 'course_001',
  title: 'Curso de Inteligencia Artificial para Ventas Efectivas',
  categories: ['INTELIGENCIA ARTIFICIAL'],
  teacher: {
    name: 'Emilio',
    lastName: 'Alarcon',
    title: 'Especialista en Ventas y Marketing',
    avatarUrl: 'https://i.pravatar.cc/300?img=13',
    bio: 'Emilio Alarcón, es especialista en Ventas y Marketing, y CEO de Venta Profesional Group, con más de 11 años de experiencia en el mundo comercial ha liderado equipos de más de 120 personas a nivel nacional como Gerente Comercial y de Marketing.\n\nConsultor, profesor de postgrado, mentor en organizaciones reconocidas y fundador de una prestigiosa Escuela de Ventas y Marketing. Además, cuenta con un MBA especializado en Transformación Digital y formación en escuelas de postgrado en Perú, Europa y EE.UU.',
  },
  level: 'Básico a intermedio',
  studentsCount: 16984,
  avgRating: 4.6,
  reviewsCount: 128,
  estimatedDuration: '30h 45min',
  description:
    '¿Te imaginas transformar tus ventas con la inteligencia artificial? ¿Te gustaría aprender a usar esta tecnología para optimizar tus procesos y aumentar tus ingresos?\n\nEn este curso de 6 módulos, descubrirás cómo la inteligencia artificial puede transformar los procesos de ventas en tu negocio. Aprenderás a utilizar la IA para optimizar operaciones y aumentar tus ventas mediante aplicaciones prácticas y herramientas fáciles de usar. Además, te guiaré en cómo implementar la IA y te mostraré en qué situaciones es mejor no utilizar estas herramientas.',
  whatYouWillLearn:
    'Descubrirás cómo la inteligencia artificial puede transformar los procesos de ventas en tu negocio. Aprenderás a utilizar la IA para optimizar operaciones y aumentar tus ventas mediante aplicaciones prácticas y herramientas fáciles de usar. Además, te guiaré en cómo implementar la IA y te mostraré en qué situaciones es mejor no utilizar estas herramientas.',
  targetAudience:
    'Dirigido a profesionales de la línea comercial (vendedores, ejecutivos, analistas) y emprendedores que deseen capacitarse en gestión comercial.',
  requirements: 'Ninguno.',
  sections: [
    {
      id: 'section_001',
      title: 'PROGRAMA UN CREADOR DE NOMBRES',
      classesCount: 12,
      duration: '1h',
      lessons: [
        {
          id: 'lesson_001',
          title: 'Recorrido del Curso',
          duration: '2:48',
          isPreview: true,
          type: 'video' as const,
          youtubeUrl: 'https://www.youtube.com/watch?v=aKF1JHNDCkY',
        },
        {
          id: 'lesson_002',
          title: 'Por Qué Python',
          duration: '2:03',
          isPreview: true,
          type: 'video' as const,
          youtubeUrl: 'https://youtu.be/9bZkp7q19f0',
        },
        {
          id: 'lesson_003',
          title: 'Meta del Día 1',
          duration: '1:18',
          isPreview: true,
          type: 'video' as const,
          youtubeUrl: 'https://youtu.be/jNQXAC9IVRw',
        },
        {
          id: 'lesson_005',
          title: 'Instalar Python y Pycharm',
          duration: '11:44',
          type: 'video' as const,
        },
        {
          id: 'lesson_006',
          title: 'Declaración Print',
          duration: '7:47',
          type: 'video' as const,
        },
      ],
    },
    {
      id: 'section_002',
      title: 'PROGRAMA UN CALCULADOR DE COMISIONES',
      classesCount: 14,
      duration: '1h 14min',
      lessons: [
        {
          id: 'lesson_007',
          title: 'Introducción al Día 2',
          duration: '3:12',
          type: 'video' as const,
        },
        {
          id: 'lesson_008',
          title: 'Variables y Tipos de Datos',
          duration: '8:45',
          type: 'video' as const,
        },
      ],
    },
    {
      id: 'section_003',
      title: 'PROGRAMA UN ANALIZADOR DE TEXTO',
      classesCount: 14,
      duration: '2h 6min',
      lessons: [
        {
          id: 'lesson_009',
          title: 'Introducción al Día 3',
          duration: '2:30',
          type: 'video' as const,
        },
      ],
    },
  ],
}
