'use client'

import clsx from 'clsx'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from './ui/sidebar'
import { NavMain } from './nav-main'
import { LINKS } from '@/config/links'
import Logo from './logo'
import { useIsDesktop } from '@/modules/shared/hooks/use-desktop'

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const isDesktop = useIsDesktop()

  return (
    <Sidebar
      collapsible={isDesktop ? 'none' : 'offcanvas'}
      {...props}
      className={clsx('border-none', isDesktop && 'h-screen', props.className)}
    >
      <SidebarHeader className="h-[60px] shrink-0 p-0 text-4xl transition-all duration-300">
        <Logo />
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-auto">
        <NavMain links={LINKS} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar
