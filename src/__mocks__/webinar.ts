export interface WebinarData {
  title: string
  description: string
  date: string
  time: string
  linkUrl: string
  image: string
}

export const nextWebinar: WebinarData = {
  title: 'Gobierno y Sostenibilidad en el Perú',
  description:
    'Conferencia a cargo de la Dra. Isabel Delgado Vaca Guzmán sobre los retos y oportunidades para lograr un desarrollo sostenible en el Perú.',
  date: 'Viernes, 16 de Enero de 2026',
  time: '07:00 p.m.',
  linkUrl: 'https://zoom.us/j/91815585965',
  image: '/webinar-2.jpg',
}
