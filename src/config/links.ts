import { IoCalendarOutline } from 'react-icons/io5'
import { TbCertificate, TbSettings, TbLayoutDashboard } from 'react-icons/tb'
import { MdOutlineLibraryBooks } from 'react-icons/md'
import { FaRegBookmark } from 'react-icons/fa'
import { IoMdHome } from 'react-icons/io'
import { CiUser } from 'react-icons/ci'
import { ROLE } from '@/modules/shared/constants'

export const LINKS_STUDENT = [
  {
    label: 'Inicio',
    src: '/',
    icon: IoMdHome,
  },
  {
    label: 'Cursos',
    icon: MdOutlineLibraryBooks,
    src: '/courses',
  },
  {
    label: 'Mis Cursos',
    src: '/my-courses',
    icon: FaRegBookmark,
  },
  {
    label: 'Mis Certificados',
    src: '/my-certificates',
    icon: TbCertificate,
  },
  {
    label: 'Calendario',
    src: '/calendar',
    icon: IoCalendarOutline,
  },
  {
    label: 'Configuración',
    src: '#',
    icon: TbSettings,
  },
]

export const LINKS_TEACHER = [
  {
    label: 'Inicio',
    src: '/',
    icon: IoMdHome,
  },
  {
    label: 'Cursos',
    icon: MdOutlineLibraryBooks,
    src: '/my-courses',
  },
  {
    label: 'Mis Cursos',
    children: [
      { label: 'Cursos Obtenidos', src: '#/obtenidos' },
      { label: 'Cursos Subidos', src: '#/subidos' },
    ],
    icon: FaRegBookmark,
  },
  {
    label: 'Mis Certificados',
    src: '/my-certificates',
    icon: TbCertificate,
  },
  {
    label: 'Calendario',
    src: '/calendar',
    icon: IoCalendarOutline,
  },
  {
    label: 'Configuración',
    src: '#',
    icon: TbSettings,
  },
]

export const LINKS_ADMIN = [
  {
    label: 'Dashboard',
    src: '/dashboard',
    icon: TbLayoutDashboard,
  },
  {
    label: 'Usuarios',
    src: '/users',
    icon: CiUser,
  },
  {
    label: 'Cursos',
    src: '/courses',
    icon: MdOutlineLibraryBooks,
  },
  {
    label: 'Certificaciones',
    src: '/certifications',
    icon: TbCertificate,
  },
  {
    label: 'Calendario',
    src: '/calendar',
    icon: IoCalendarOutline,
  },
  {
    label: 'Configuración',
    src: '/settings',
    icon: TbSettings,
  },
]

export const ROLE_LINKS = {
  [ROLE.STUDENT]: LINKS_STUDENT,
  [ROLE.TEACHER]: LINKS_TEACHER,
  [ROLE.ADMIN]: LINKS_ADMIN,
} as const
