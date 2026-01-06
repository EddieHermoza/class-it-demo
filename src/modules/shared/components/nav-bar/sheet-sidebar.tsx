'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GoSidebarCollapse } from 'react-icons/go'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

import { COMMON_LINKS, LINKS_STUDENT, LINKS_TEACHER } from '@/config/links'
import CategoriesList from '../categories-list'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import CloseSessionButton from '@/modules/auth/components/close-session-btn'

export function SheetSidebar() {
  const { data: session } = useSession()
  const role = session?.user.role
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const username = session?.user?.name?.split(' ')[0] || ''

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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size={'icon-lg'}>
          <GoSidebarCollapse />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="max-sm:w-full">
        <SheetHeader className="h-15P">
          <SheetTitle className="text-primary text-lg">Class IT</SheetTitle>
        </SheetHeader>

        <ul className="w-full">
          {links.map(({ label, src, icon: Icon }, index) => {
            const active = isActive(src)

            return (
              <li key={index} className="relative w-full">
                {label === 'Cursos' ? (
                  <Accordion type="single" collapsible>
                    <AccordionItem value="courses">
                      <AccordionTrigger
                        className={`flex w-full items-center justify-between p-4 transition-colors hover:no-underline ${
                          active
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-primary/10'
                        }`}
                      >
                        <span className="flex-center gap-2">
                          {Icon && <Icon className="size-5" />}
                          <span>{label}</span>
                        </span>
                      </AccordionTrigger>

                      <AccordionContent className="px-2 pb-2">
                        <CategoriesList
                          onCategoryClick={() => setOpen(false)}
                        />

                        <Link
                          href="/courses"
                          onClick={() => setOpen(false)}
                          className="hover:bg-primary/10 hover:text-primary flex w-full items-center rounded-md p-2 text-sm transition"
                        >
                          Todos los cursos
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <Link
                    href={src}
                    onClick={() => setOpen(false)}
                    className={`flex w-full items-center gap-2 p-4 transition-colors hover:no-underline ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-primary/10'
                    }`}
                  >
                    {Icon && <Icon className="size-5" />}
                    <span>{label}</span>
                  </Link>
                )}
              </li>
            )
          })}

          {!session && (
            <li className="w-full">
              <Link
                href="/auth/register-teacher"
                onClick={() => setOpen(false)}
                className="hover:bg-primary/10 hover:text-primary flex w-full items-center gap-2 p-4 text-xs transition"
              >
                <FaChalkboardTeacher className="size-5" />
                Ser instructor
              </Link>
            </li>
          )}
        </ul>

        <div className="flex-center w-full p-4">
          {session ? (
            <div className="flex w-full flex-col items-center gap-4">
              <div className="flex w-full items-center gap-3">
                <Avatar>
                  <AvatarImage src={session.user.avatarUrl} alt={username} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {username[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{username}</span>
              </div>

              <SheetClose asChild>
                <CloseSessionButton label="Cerrar Sesión" className="mx-auto" />
              </SheetClose>
            </div>
          ) : (
            <div className="flex-center w-full flex-col gap-5">
              <Button
                asChild
                variant="outline"
                className="border-primary w-full rounded-none"
                onClick={() => setOpen(false)}
              >
                <Link href="/auth/register">Registrarse</Link>
              </Button>

              <Button
                asChild
                className="w-full rounded-none"
                onClick={() => setOpen(false)}
              >
                <Link href="/auth/login">Iniciar Sesión</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
