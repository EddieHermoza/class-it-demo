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
      <div className="flex size-full">
        <aside className="w-70 border-r px-4 py-10">
          <div className="flex flex-col items-center gap-3 border-b pb-6">
            <div className="bg-muted size-20 animate-pulse rounded-full" />
            <div className="bg-muted h-4 w-32 animate-pulse rounded" />
          </div>
          <nav className="mt-6 flex flex-col gap-1">
            {SETTINGS_LINKS.map((link) => (
              <div
                key={link.src}
                className="bg-muted h-9 w-full animate-pulse rounded"
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
    <div className="flex size-full">
      {/* Sidebar */}
      <aside className="w-70 border-r px-4 py-10">
        <div className="flex flex-col items-center gap-3 border-b pb-6">
          <Avatar className="size-20">
            <AvatarImage src={avatarUrl} alt={usernameForAvatar} />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {usernameForAvatar.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <p className="text-center font-medium">{fullName}</p>
        </div>

        <nav className="mt-6 flex flex-col gap-1 text-sm">
          {SETTINGS_LINKS.map(({ label, src }) => {
            const isActive = pathname === src

            return (
              <Link
                key={src}
                href={src}
                className={`rounded-md px-3 py-2 transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground dark:bg-primary/30 font-medium'
                    : 'hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-center flex-1 p-8">{children}</main>
    </div>
  )
}
