'use client'

import { IoCalendarOutline } from 'react-icons/io5'
import { MdOutlineLibraryBooks } from 'react-icons/md'
import { FaRegBookmark } from 'react-icons/fa'
import { IoMdHome } from 'react-icons/io'
import { PiCertificate } from 'react-icons/pi'
type NavItem = {
  label: string
  src: string
  icon: React.ComponentType<{ className?: string }>
}

export const COMMON_LINKS: NavItem[] = [
  {
    label: 'Inicio',
    src: '/',
    icon: IoMdHome,
  },
  {
    label: 'Cursos',
    src: '/courses',
    icon: MdOutlineLibraryBooks,
  },
  {
    label: 'Calendario',
    src: '/calendar',
    icon: IoCalendarOutline,
  },
]

const STUDENT_SPECIFIC: NavItem[] = [
  {
    label: 'Mi aprendizaje',
    src: '/learning',
    icon: FaRegBookmark,
  },
  {
    label: 'Mis certificados',
    src: '/certificates',
    icon: PiCertificate,
  },
]

const TEACHER_SPECIFIC: NavItem[] = [
  {
    label: 'Mis cursos',
    icon: FaRegBookmark,
    src: '/my-courses',
  },
  {
    label: 'Mis webinars',
    icon: IoCalendarOutline,
    src: '/my-webinars',
  },
]

export const LINKS_STUDENT: NavItem[] = [...COMMON_LINKS, ...STUDENT_SPECIFIC]

export const LINKS_TEACHER: NavItem[] = [...COMMON_LINKS, ...TEACHER_SPECIFIC]
