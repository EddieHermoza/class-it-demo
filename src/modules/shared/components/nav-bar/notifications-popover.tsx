'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GoBell } from 'react-icons/go'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../animate-ui/components/radix/popover'

import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

type Notification = {
  id: string
  title: string
  description: string
  href?: string
  createdAt: string
  read?: boolean
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Nuevo curso disponible',
    description: 'Se publicó el curso de React Avanzado.',
    href: '/courses/react-avanzado',
    createdAt: 'Hace 5 min',
  },
  {
    id: '2',
    title: 'Progreso guardado',
    description: 'Continuaste el curso de TypeScript.',
    createdAt: 'Hace 1 hora',
  },
  {
    id: '3',
    title: 'Bienvenido a Class IT',
    description: 'Empieza explorando nuestros cursos.',
    createdAt: 'Ayer',
    read: true,
  },
]

export default function NotificationsPopover() {
  const [open, setOpen] = useState(false)

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={`flex-center relative size-9 rounded-md transition-colors ${
          open
            ? 'bg-primary/10 text-primary dark:bg-accent/50'
            : 'text-muted-foreground hover:bg-primary/10 hover:text-primary dark:hover:bg-accent/50'
        }`}
      >
        <GoBell className="size-5" />

        {unreadCount > 0 && (
          <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full text-[10px] font-semibold">
            {unreadCount}
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={11}
        className="rounded-none p-0"
      >
        <div className="flex flex-col">
          <span className="flex-center text-muted-foreground my-3 px-3 text-sm font-semibold">
            Notificaciones
          </span>

          <Separator />

          <ul className="max-h-72 overflow-y-auto">
            {MOCK_NOTIFICATIONS.map((notification) => {
              const content = (
                <li
                  key={notification.id}
                  className={`hover:bg-primary/5 flex cursor-pointer flex-col gap-1 px-4 py-3 transition ${
                    notification.read ? 'opacity-70' : ''
                  }`}
                >
                  <span className="text-sm font-medium">
                    {notification.title}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {notification.description}
                  </span>
                  <span className="text-muted-foreground text-[10px]">
                    {notification.createdAt}
                  </span>
                </li>
              )

              return notification.href ? (
                <Link
                  key={notification.id}
                  href={notification.href}
                  onClick={() => setOpen(false)}
                >
                  {content}
                </Link>
              ) : (
                content
              )
            })}
          </ul>

          <Separator />

          <div className="p-3">
            <Button
              asChild
              variant="ghost"
              className="w-full rounded-none text-sm"
            >
              <Link href="/notifications">Ver todas</Link>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
