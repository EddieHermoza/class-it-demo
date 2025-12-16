'use client'

import { IconType } from 'react-icons'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronUp } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from './ui/sidebar'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'

type LinkItem = {
  label: string
  src?: string
  icon?: IconType
  children?: LinkItem[]
}

type Props = {
  links: LinkItem[]
}

export function NavMain({ links }: Props) {
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const sortedLinks = [...links].sort((a, b) => {
      const aLength = a.src?.length || 0
      const bLength = b.src?.length || 0
      return bLength - aLength
    })

    const index = sortedLinks.findIndex((link) => {
      if (!link.src) return false
      if (link.src === '/') {
        return pathname === '/'
      }
      return (
        pathname.startsWith(link.src) &&
        (pathname === link.src || pathname[link.src.length] === '/')
      )
    })

    const originalIndex =
      index !== -1 ? links.findIndex((link) => link === sortedLinks[index]) : -1

    setActiveIndex(originalIndex !== -1 ? originalIndex : 0)
  }, [pathname, links])

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navegación</SidebarGroupLabel>
      <SidebarMenu className="relative">
        {links.map((item, index) => {
          if (item.children?.length) {
            // Link con submenú
            return (
              <Collapsible
                key={index}
                defaultOpen={false}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className="flex h-12 cursor-pointer items-center justify-between gap-2 rounded-md px-3 text-sm font-medium transition-colors [&>svg]:size-5"
                      tooltip={item.label}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && <item.icon className="size-5 shrink-0" />}
                        {item.label}
                      </div>
                      {/* Icono de Chevron */}
                      <ChevronUp
                        className="shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180"
                        size={20}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-top-1 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:slide-out-to-top-1 overflow-hidden data-[state=closed]:duration-150 data-[state=closed]:ease-in data-[state=open]:duration-200 data-[state=open]:ease-out">
                    <SidebarMenuSub className="gap-1 py-1">
                      {item.children.map((sub, subIndex) => (
                        <SidebarMenuSubItem key={subIndex}>
                          <SidebarMenuSubButton
                            asChild
                            className="hover:bg-sidebar-accent h-10 w-full rounded-md px-9 text-sm transition-colors"
                          >
                            <Link href={sub.src || '#'}>{sub.label}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          } else {
            // Link simple
            return (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  asChild
                  className={`h-12 gap-2 rounded-md px-3 text-sm font-medium transition-colors [&>svg]:size-5 group-data-[collapsible=icon]:[&>svg]:mx-4 ${
                    index === activeIndex
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      : ''
                  }`}
                  tooltip={item.label}
                >
                  <Link href={item.src || '#'}>
                    {item.icon && <item.icon className="size-5 shrink-0" />}
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
