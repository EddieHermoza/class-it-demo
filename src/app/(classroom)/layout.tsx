'use client'

import { LINKS_STUDENT } from '@/config/links'
import { Navbar } from '@/modules/shared/components'
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden relative">
      <aside className="group flex-center relative h-screen w-20 border-r bg-sidebar duration-200 will-change-[width] hover:w-64">
        <ul className="flex flex-col gap-4 pl-16 duration-200 group-hover:pl-0">
          {LINKS_STUDENT.map(({ label, src, icon: Icon }, index) => (
            <li key={index} className="flex w-30">
              <Link
                href={src}
                className="hover:bg-primary/10 flex h-14 w-30 items-center gap-5 rounded-full p-3 transition-[width,background-color,opacity,transform] duration-200 will-change-[width,opacity] group-hover:w-44"
              >
                {Icon && <Icon className="size-6 shrink-0" />}
                <span className="truncate text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="custom-scrollbar flex-1 overflow-y-auto bg-linear-to-br bg-size-[300%_300%] dark:from-violet-950/30 dark:via-black dark:to-black">
        <Navbar />
        {children}
      </div>
    </div>
  )
}
