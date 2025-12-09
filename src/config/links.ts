import { IoCalendarOutline } from 'react-icons/io5'
import { TbLayoutDashboard, TbCertificate, TbSettings } from 'react-icons/tb'
import { MdOutlineLibraryBooks } from 'react-icons/md'
import { FaRegBookmark } from 'react-icons/fa'
import { IoMdHome } from 'react-icons/io'
import { CiUser } from 'react-icons/ci'

export const LINKS = [
  {
    label: 'Inicio',
    src: '/',
    icon: IoMdHome,
  },
  {
    label: 'Cursos',
    icon: MdOutlineLibraryBooks,
    children: [
      { label: 'Citas Pendientes', src: '#/pendientes' },
      { label: 'Citas Completadas', src: '#/completadas' },
    ],
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
