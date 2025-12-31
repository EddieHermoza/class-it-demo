'use client'

import Link from 'next/link'
import { COMMON_LINKS, LINKS_STUDENT, LINKS_TEACHER } from '@/config/links'
import CategoriesList from './categories-list'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../../animate-ui/components/radix/hover-card'
import { Separator } from '../ui/separator'
import { useSession } from 'next-auth/react'
import { aldrich } from '@/config/fonts'

export default function AppSideBar() {
  const { data: session } = useSession()
  const role = session?.user.role
  const pathName = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (src: string) => {
    if (src === '/') return pathName === '/'
    return pathName === src || pathName.startsWith(`${src}/`)
  }

  return (
    <aside className="group bg-sidebar flex-center relative h-screen w-26 border-r max-xl:hidden">
      <span
        className={`${aldrich.className} absolute top-5 text-center text-xl font-bold tracking-tight`}
      >
        CLASS IT
      </span>
      <ul className="relative w-full">
        {role === 'TEACHER' &&
          LINKS_TEACHER.map(({ label, src, icon: Icon }, index) => {
            const active = isActive(src)

            return (
              <li key={index} className="w-full">
                {label === 'Cursos' ? (
                  <HoverCard open={open} onOpenChange={setOpen} openDelay={0}>
                    <HoverCardTrigger
                      asChild
                      onClick={() => setOpen(false)}
                      className={`flex-center h-20 w-full flex-col gap-2 transition-colors ${active ? 'bg-primary text-primary-foreground' : ''} ${!active && open ? 'bg-primary/10' : ''} `}
                    >
                      <Link href={src}>
                        {Icon && <Icon className="size-5" />}
                        <span className="text-xs">{label}</span>
                      </Link>
                    </HoverCardTrigger>

                    <HoverCardContent
                      side="right"
                      align="start"
                      sideOffset={0}
                      alignOffset={0}
                      className="relative flex flex-col rounded-none px-0 pb-0"
                    >
                      <span className="text-muted-foreground mb-2 px-2 text-base font-semibold">
                        Categorías
                      </span>

                      <CategoriesList onCategoryClick={() => setOpen(false)} />

                      <Separator className="bg-primary h-1" />

                      <Link
                        href="/courses"
                        onClick={() => setOpen(false)}
                        className="flex-center hover:bg-primary/10 hover:text-primary size-full p-2 text-sm transition-colors duration-300"
                      >
                        Todos los cursos
                      </Link>
                    </HoverCardContent>
                  </HoverCard>
                ) : (
                  <Link
                    href={src}
                    className={`flex-center h-20 w-full flex-col gap-2 transition-colors ${active ? 'bg-primary text-primary-foreground' : ''} ${!active ? 'hover:bg-primary/10' : ''} `}
                  >
                    {Icon && <Icon className="size-5" />}
                    <span className="text-center text-xs">{label}</span>
                  </Link>
                )}
              </li>
            )
          })}
        {role === 'STUDENT' &&
          LINKS_STUDENT.map(({ label, src, icon: Icon }, index) => {
            const active = isActive(src)

            return (
              <li key={index} className="w-full">
                {label === 'Cursos' ? (
                  <HoverCard open={open} onOpenChange={setOpen} openDelay={0}>
                    <HoverCardTrigger
                      asChild
                      onClick={() => setOpen(false)}
                      className={`flex-center h-20 w-full flex-col gap-2 transition-colors ${active ? 'bg-primary text-primary-foreground' : ''} ${!active && open ? 'bg-primary/10' : ''} `}
                    >
                      <Link href={src}>
                        {Icon && <Icon className="size-5" />}
                        <span className="text-xs">{label}</span>
                      </Link>
                    </HoverCardTrigger>

                    <HoverCardContent
                      side="right"
                      align="start"
                      sideOffset={0}
                      alignOffset={0}
                      className="relative flex flex-col rounded-none px-0 pb-0"
                    >
                      <span className="text-muted-foreground mb-2 px-2 text-base font-semibold">
                        Categorías
                      </span>

                      <CategoriesList onCategoryClick={() => setOpen(false)} />

                      <Separator className="bg-primary h-1" />

                      <Link
                        href="/courses"
                        onClick={() => setOpen(false)}
                        className="flex-center hover:bg-primary/10 hover:text-primary size-full p-2 text-sm transition-colors duration-300"
                      >
                        Todos los cursos
                      </Link>
                    </HoverCardContent>
                  </HoverCard>
                ) : (
                  <Link
                    href={src}
                    className={`flex-center h-20 w-full flex-col gap-2 transition-colors ${active ? 'bg-primary text-primary-foreground' : ''} ${!active ? 'hover:bg-primary/10' : ''} `}
                  >
                    {Icon && <Icon className="size-5" />}
                    <span className="text-center text-xs">{label}</span>
                  </Link>
                )}
              </li>
            )
          })}
        {role === undefined &&
          COMMON_LINKS.map(({ label, src, icon: Icon }, index) => {
            const active = isActive(src)

            return (
              <li key={index} className="w-full">
                {label === 'Cursos' ? (
                  <HoverCard open={open} onOpenChange={setOpen} openDelay={0}>
                    <HoverCardTrigger
                      asChild
                      onClick={() => setOpen(false)}
                      className={`flex-center h-20 w-full flex-col gap-2 transition-colors ${active ? 'bg-primary text-primary-foreground' : ''} ${!active && open ? 'bg-primary/10' : ''} `}
                    >
                      <Link href={src}>
                        {Icon && <Icon className="size-5" />}
                        <span className="text-xs">{label}</span>
                      </Link>
                    </HoverCardTrigger>

                    <HoverCardContent
                      side="right"
                      align="start"
                      sideOffset={0}
                      alignOffset={0}
                      className="relative flex flex-col rounded-none px-0 pb-0"
                    >
                      <span className="text-muted-foreground mb-2 px-2 text-base font-semibold">
                        Categorías
                      </span>

                      <CategoriesList onCategoryClick={() => setOpen(false)} />

                      <Separator className="bg-primary h-1" />

                      <Link
                        href="/courses"
                        onClick={() => setOpen(false)}
                        className="flex-center hover:bg-primary/10 hover:text-primary size-full p-2 text-sm transition-colors duration-300"
                      >
                        Todos los cursos
                      </Link>
                    </HoverCardContent>
                  </HoverCard>
                ) : (
                  <Link
                    href={src}
                    className={`flex-center h-20 w-full flex-col gap-2 transition-colors ${active ? 'bg-primary text-primary-foreground' : ''} ${!active ? 'hover:bg-primary/10' : ''} `}
                  >
                    {Icon && <Icon className="size-5" />}
                    <span className="text-center text-xs">{label}</span>
                  </Link>
                )}
              </li>
            )
          })}
      </ul>
    </aside>
  )
}
