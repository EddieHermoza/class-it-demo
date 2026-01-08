import type { Metadata } from 'next'

const TITLE = 'Class-IT - Plataforma de Cursos Online'
const DESCRIPTION =
  'Class-IT: plataforma educativa integral para descubrir, adquirir y completar cursos online de alta calidad. Aprende a tu ritmo con expertos en diversas áreas.'

export const META_DATA: Metadata = {
  title: {
    default: TITLE,
    template: `%s | ${TITLE}`,
  },
  description: DESCRIPTION,
  keywords: [
    'Class-IT',
    'class-it',
    'classit',
    'cursos online',
    'plataforma educativa',
    'e-learning',
    'educación en línea',
    'cursos virtuales',
    'aprendizaje online',
    'formación profesional',
    'cursos a distancia',
    'educación digital',
  ],
  authors: [{ name: 'Class-IT Team' }],
  creator: 'Class-IT',
  publisher: 'Class-IT',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.class-it.edu.pe'), 
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    siteName: TITLE,
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Class-IT - Plataforma de Cursos Online',
      },
    ],
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    creator: '@classit_edu', 
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: TITLE,
    statusBarStyle: 'default',
  },
  category: 'education',
}