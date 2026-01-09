'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/modules/shared/components/ui/avatar'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SETTINGS_LINKS = [
  { label: 'Cuenta', src: '/settings/edit-profile' },
  { label: 'Foto', src: '/settings/edit-photo' },
  { label: 'Seguridad', src: '/settings/security' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const pathname = usePathname()

  // Validaciones seguras para evitar errores si session es null o datos incompletos
  const user = session?.user

  const fullName = user
    ? `${user.name || ''} ${user.lastName || ''}`.trim() || 'Usuario'
    : 'Cargando...'

  const firstName = user?.name?.trim() || ''
  const usernameForAvatar = firstName.split(' ')[0] || 'U'

  const avatarUrl = user?.avatarUrl || undefined

  // Opcional: mostrar un esqueleto o mensaje mientras carga
  if (status === 'loading') {
    return (
      <div className="flex size-full flex-col lg:flex-row">
        <aside className="border-b px-4 py-6 md:w-70 md:border-r md:border-b-0 md:py-10">
          <div className="flex flex-col items-center gap-3 border-b pb-6">
            <div className="bg-muted size-20 animate-pulse rounded-full" />
            <div className="bg-muted h-4 w-32 animate-pulse rounded" />
          </div>
          <nav className="mt-6 flex gap-1 overflow-x-auto md:flex-col">
            {SETTINGS_LINKS.map((link) => (
              <div
                key={link.src}
                className="bg-muted h-9 w-24 shrink-0 animate-pulse rounded md:w-full"
              />
            ))}
          </nav>
        </aside>
        <main className="flex-center flex-1">
          <p className="text-muted-foreground">Cargando configuración...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="flex size-full flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="border-b px-4 py-6 md:py-10 lg:w-70 lg:border-r lg:border-b-0">
        <div className="flex flex-col items-center gap-3 border-b pb-6">
          <Avatar className="size-20">
            <AvatarImage src={avatarUrl} alt={usernameForAvatar} />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {usernameForAvatar.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <p className="text-center font-medium">{fullName}</p>
        </div>

        <nav className="scrollbar-hide mt-6 flex gap-1 overflow-x-auto p-1 text-sm lg:flex-col">
          {SETTINGS_LINKS.map(({ label, src }) => {
            const isActive = pathname === src

            return (
              <Link
                key={src}
                href={src}
                className={`rounded-md px-4 py-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent active:bg-accent hover:text-primary'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <main className="flex-center flex-1 sm:p-8">{children}</main>
    </div>
  )
}
