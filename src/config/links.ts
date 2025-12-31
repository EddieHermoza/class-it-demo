'use client'

import { IoCalendarOutline as _ } from 'react-icons/io5'
import { TbCertificate } from 'react-icons/tb'
import { MdOutlineLibraryBooks } from 'react-icons/md'
import { FaRegBookmark } from 'react-icons/fa'
import { IoMdHome } from 'react-icons/io'

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
  // {
  //   label: 'Calendario',
  //   src: '/calendar',
  //   icon: IoCalendarOutline,
  // },
]

const STUDENT_SPECIFIC: NavItem[] = [
  {
    label: 'Aprendizaje',
    src: '/learning',
    icon: FaRegBookmark,
  },
  {
    label: 'Certificados',
    src: '/certificates',
    icon: TbCertificate,
  },
]

const TEACHER_SPECIFIC: NavItem[] = [
  {
    label: 'Mis Cursos',
    icon: FaRegBookmark,
    src: '/my-courses',
  },
]

export const LINKS_STUDENT: NavItem[] = [...COMMON_LINKS, ...STUDENT_SPECIFIC]

export const LINKS_TEACHER: NavItem[] = [...COMMON_LINKS, ...TEACHER_SPECIFIC]
