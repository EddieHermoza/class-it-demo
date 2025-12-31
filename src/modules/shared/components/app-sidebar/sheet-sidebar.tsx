'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GoSidebarCollapse } from 'react-icons/go'

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
import CategoriesList from './categories-list'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import CloseSessionButton from '@/modules/auth/components/close-session-btn'
import { aldrich } from '@/config/fonts'

export function SheetSidebar() {
  const { data: session } = useSession()
  const role = session?.user.role

  const username = session?.user?.name?.split(' ')[0] || ''
  const pathName = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (src: string) => {
    if (src === '/') return pathName === '/'
    return pathName === src || pathName.startsWith(`${src}/`)
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="lg">
          <GoSidebarCollapse />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="max-sm:w-full">
        <SheetHeader>
          <SheetTitle className={aldrich.className}>CLASS IT</SheetTitle>
        </SheetHeader>
        <ul className="w-full">
          {role === 'STUDENT' &&
            LINKS_STUDENT.map(({ label, src, icon: Icon }, index) => {
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
                          <span className="flex-center size-full w-auto gap-2">
                            {Icon && <Icon className="size-5" />}
                            <span className="text-xs">{label}</span>
                          </span>
                        </AccordionTrigger>

                        <AccordionContent className="px-2 pb-2">
                          <CategoriesList
                            onCategoryClick={() => setOpen(false)}
                          />

                          <Link
                            href="/courses"
                            onClick={() => setOpen(false)}
                            className="hover:bg-primary/10 hover:text-primary flex w-full items-center justify-start rounded-md p-2 text-sm transition"
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
                      className={`flex w-full items-center justify-start gap-2 p-4 transition-colors hover:no-underline ${
                        active
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-primary/10'
                      }`}
                    >
                      {Icon && <Icon className="size-5" />}
                      <span className="text-xs">{label}</span>
                    </Link>
                  )}
                </li>
              )
            })}
          {role === 'TEACHER' &&
            LINKS_TEACHER.map(({ label, src, icon: Icon }, index) => {
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
                          <span className="flex-center size-full w-auto gap-2">
                            {Icon && <Icon className="size-5" />}
                            <span className="text-xs">{label}</span>
                          </span>
                        </AccordionTrigger>

                        <AccordionContent className="px-2 pb-2">
                          <CategoriesList
                            onCategoryClick={() => setOpen(false)}
                          />

                          <Link
                            href="/courses"
                            onClick={() => setOpen(false)}
                            className="hover:bg-primary/10 hover:text-primary flex w-full items-center justify-start rounded-md p-2 text-sm transition"
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
                      className={`flex w-full items-center justify-start gap-2 p-4 transition-colors hover:no-underline ${
                        active
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-primary/10'
                      }`}
                    >
                      {Icon && <Icon className="size-5" />}
                      <span className="text-xs">{label}</span>
                    </Link>
                  )}
                </li>
              )
            })}
          {role === undefined &&
            COMMON_LINKS.map(({ label, src, icon: Icon }, index) => {
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
                          <span className="flex-center size-full w-auto gap-2">
                            {Icon && <Icon className="size-5" />}
                            <span className="text-xs">{label}</span>
                          </span>
                        </AccordionTrigger>

                        <AccordionContent className="px-2 pb-2">
                          <CategoriesList
                            onCategoryClick={() => setOpen(false)}
                          />

                          <Link
                            href="/courses"
                            onClick={() => setOpen(false)}
                            className="hover:bg-primary/10 hover:text-primary flex w-full items-center justify-start rounded-md p-2 text-sm transition"
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
                      className={`flex w-full items-center justify-start gap-2 p-4 transition-colors hover:no-underline ${
                        active
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-primary/10'
                      }`}
                    >
                      {Icon && <Icon className="size-5" />}
                      <span className="text-xs">{label}</span>
                    </Link>
                  )}
                </li>
              )
            })}
        </ul>
        <div className="flex-center w-full p-4">
          {session ? (
            <div className="flex w-full flex-col items-center gap-4">
              <div className="flex w-full items-center gap-3">
                <Avatar>
                  <AvatarImage src={session.user.avatarUrl} alt={username} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {username.split('')[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{username}</span>
              </div>
              <SheetClose asChild>
                <CloseSessionButton label="Cerrar Sesión" className="mx-auto" />
              </SheetClose>
            </div>
          ) : (
            <>
              <Button asChild onClick={() => setOpen(false)}>
                <Link href={'/auth/login'}>Acceder</Link>
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
