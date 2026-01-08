'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../../animate-ui/components/radix/hover-card'

import { Separator } from '../ui/separator'
import CategoriesList from '../categories-list'
import { Button } from '../ui/button'
import UserPopover from '@/modules/auth/components/user-popover'
import { SheetSidebar } from './sheet-sidebar'
import { ThemeTogglerButton } from '../../animate-ui/components/buttons/theme-toggler'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import SearchBar from '@/modules/courses/components/search-bar'
import { COMMON_LINKS, LINKS_STUDENT, LINKS_TEACHER } from '@/config/links'
import InstructorPopover from './instructor-popover'
import {NotificationsPopover as _b} from './notifications-popover'
import { DonationDialog as _a } from './donation-dialog'

export function Navbar() {
  const { data: session, status } = useSession()
  const role = session?.user.role
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links =
    role === 'TEACHER'
      ? LINKS_TEACHER
      : role === 'STUDENT'
        ? LINKS_STUDENT
        : COMMON_LINKS

  const isActive = (src: string) =>
    src === '/'
      ? pathname === '/'
      : pathname === src || pathname.startsWith(`${src}/`)

  return (
    <nav className="bg-sidebar sticky top-0 z-50 flex h-15 w-full items-center gap-4 border-b px-2 sm:px-4">
      {/* Mobile sidebar */}
      <div className="xl:hidden">
        <SheetSidebar />
      </div>

      {/* Brand */}
      <Link href={'/'}>
        <span
          className={`text-primary inline-flex shrink-0 text-xl font-semibold`}
        >
          Class IT
        </span>
      </Link>

      <SearchBar />

      {/* Navigation links */}
      <div className="flex items-center gap-2 max-xl:hidden">
        {links.map(({ label, src, icon: Icon }) => {
          const active = isActive(src)

          if (label === 'Cursos') {
            return (
              <HoverCard
                key={src}
                open={open}
                onOpenChange={setOpen}
                openDelay={0}
              >
                <HoverCardTrigger asChild>
                  <Link
                    href={src}
                    onClick={() => setOpen(false)}
                    className={`flex-center gap-2 rounded-md px-5 py-2 text-sm transition-colors duration-200 ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : open
                          ? 'bg-primary/10 text-primary dark:bg-accent/50'
                          : 'text-muted-foreground hover:bg-primary/10 hover:text-primary dark:hover:bg-accent/50'
                    }`}
                  >
                    {Icon && <Icon className="size-4" />}
                    {label}
                  </Link>
                </HoverCardTrigger>

                <HoverCardContent
                  side="bottom"
                  align="center"
                  sideOffset={11}
                  className="w-72 rounded-none px-0 pb-0"
                >
                  <span className="flex-center text-muted-foreground mb-3 px-3 text-sm font-semibold">
                    Categorías
                  </span>
                  <Separator />
                  <CategoriesList
                    onCategoryClick={() => setOpen(false)}
                    className="max-h-100"
                  />

                  <Separator className="bg-primary h-1" />

                  <Link
                    href="/courses"
                    onClick={() => setOpen(false)}
                    className="hover:bg-primary/10 hover:text-primary block rounded p-3 text-sm transition-colors"
                  >
                    Todos los cursos
                  </Link>
                </HoverCardContent>
              </HoverCard>
            )
          }

          return (
            <Link
              key={src}
              href={src}
              className={`flex-center shrink-0 gap-2 rounded-md px-5 py-2 text-sm transition-colors duration-200 ${
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-primary/10 hover:text-primary dark:hover:bg-accent/50'
              }`}
            >
              {Icon && <Icon className="size-4" />}
              {label}
            </Link>
          )
        })}
        {!session && <InstructorPopover />}
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-5">
        <div className="flex-center gap-2">
          <ThemeTogglerButton
            className="hover:bg-primary/10 hover:text-primary"
            variant="ghost"
            size="lg"
            modes={['light', 'dark']}
          />
          {/* <DonationDialog /> */}
          {/* <NotificationsPopover /> */}
        </div>
        {status === 'loading' ? (
          <AiOutlineLoading3Quarters className="text-primary animate-spin" />
        ) : session ? (
          <UserPopover session={session} />
        ) : (
          <div className="flex items-center gap-2 max-sm:hidden">
            <Button
              asChild
              variant="outline"
              className="border-primary rounded-none"
            >
              <Link href="/auth/register">Registrarse</Link>
            </Button>

            <Button asChild className="rounded-none">
              <Link href="/auth/login">Iniciar sesión</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
