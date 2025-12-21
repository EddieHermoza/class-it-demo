'use client'

import { useSession } from 'next-auth/react'
import { AiOutlineLoading } from 'react-icons/ai'

import Link from 'next/link'

import CloseSessionButton from './close-session-btn'
import { Button } from '@/modules/shared/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/modules/shared/components/ui/popover'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/modules/shared/components/ui/avatar'

export default function UserPopover() {
  const { data: session, status } = useSession()

  const username = session?.user?.name?.split(' ')[0] || ''
  const avatar = session?.user.avatarUrl
  return (
    <Popover>
      <Button asChild variant="ghost" className="gap-3">
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src={avatar} alt="@shadcn" />
            <AvatarFallback>
              {username.split('')[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {status === 'loading' ? (
            <AiOutlineLoading size={18} className="animate-spin ease-in-out" />
          ) : session ? (
            username
          ) : (
            ''
          )}
        </PopoverTrigger>
      </Button>
      <PopoverContent
        align="end"
        sideOffset={20}
        className="flex w-auto flex-col items-start gap-1 p-1 text-sm"
      >
        {session ? (
          <CloseSessionButton iconSize={18} label="Cerrar Sesión" />
        ) : (
          <Link
            className="flex-center hover:bg-secondary cursor-pointer gap-2 rounded p-2 duration-200"
            href="/auth/login"
          >
            Iniciar Sesión
          </Link>
        )}
      </PopoverContent>
    </Popover>
  )
}
