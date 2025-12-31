'use client'

import { CgProfile } from 'react-icons/cg'
import { FaRegBookmark, FaChalkboardTeacher } from 'react-icons/fa'
import { TbCertificate } from 'react-icons/tb'
import { HiPlusCircle } from 'react-icons/hi'
import Link from 'next/link'

import CloseSessionButton from './close-session-btn'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/modules/shared/components/ui/avatar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/modules/shared/animate-ui/components/radix/hover-card'
import { Separator } from '@/modules/shared/components/ui/separator'
import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function UserPopover({ session }: Props) {
  const user = session?.user
  if (!user) return null

  const fullName = `${user.name || ''} ${user.lastName || ''}`.trim()
  const usernameInitial = user.name?.[0]?.toUpperCase() || 'U'
  const avatar = user.avatarUrl
  const role = user.role 

  const isTeacher = role === 'TEACHER'

  return (
    <HoverCard openDelay={0} closeDelay={200}>
      <HoverCardTrigger className="hover:bg-primary/10 flex size-12 cursor-pointer items-center justify-center rounded transition-colors max-sm:hidden">
        <Avatar className="size-10">
          <AvatarImage src={avatar || undefined} alt={fullName} />
          <AvatarFallback className="bg-primary text-primary-foreground text-lg font-medium">
            {usernameInitial}
          </AvatarFallback>
        </Avatar>
      </HoverCardTrigger>

      <HoverCardContent
        align="end"
        sideOffset={6}
        alignOffset={-10}
        className="w-64 rounded-none border p-2 shadow-lg"
      >
        <div className="flex flex-col items-center gap-1 py-3 text-center">
          <span className="text-lg leading-tight font-semibold">
            {fullName}
          </span>
          <span className="text-primary text-sm">
            {isTeacher ? 'Instructor' : 'Estudiante'}
          </span>
        </div>

        <Separator className="my-2" />

        <Link
          href="/settings/edit-profile"
          className="hover:bg-accent flex w-full items-center gap-3 rounded px-3 py-2 text-sm transition-colors"
        >
          <CgProfile className="size-5 shrink-0" />
          Mi Perfil
        </Link>

        {isTeacher ? (
          <>
            <Link
              href="/my-courses"
              className="hover:bg-accent flex w-full items-center gap-3 rounded px-3 py-2 text-sm transition-colors"
            >
              <FaChalkboardTeacher className="size-5 shrink-0" />
              Mis Cursos
            </Link>
            <Link
              href="/my-courses/create"
              className="hover:bg-accent flex w-full items-center gap-3 rounded px-3 py-2 text-sm transition-colors"
            >
              <HiPlusCircle className="size-5 shrink-0" />
              Crear Curso
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/learning"
              className="hover:bg-accent flex w-full items-center gap-3 rounded px-3 py-2 text-sm transition-colors"
            >
              <FaRegBookmark className="size-5 shrink-0" />
              Cursos Inscritos
            </Link>
            <Link
              href="/certificates"
              className="hover:bg-accent flex w-full items-center gap-3 rounded px-3 py-2 text-sm transition-colors"
            >
              <TbCertificate className="size-5 shrink-0" />
              Mis Certificados
            </Link>
          </>
        )}

        <Separator className="my-2" />

        {/* Cerrar sesión */}
        <CloseSessionButton
          iconSize={20}
          label="Cerrar Sesión"
          className="w-full justify-start px-3 text-sm"
        />
      </HoverCardContent>
    </HoverCard>
  )
}
