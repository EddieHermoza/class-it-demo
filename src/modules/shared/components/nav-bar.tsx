'use client'

import { Button } from './ui/button'
import { useSession } from 'next-auth/react'
import UserPopover from '@/modules/auth/components/user-popover'
import { SheetSidebar } from './app-sidebar/sheet-sidebar'
import { ThemeTogglerButton } from '../animate-ui/components/buttons/theme-toggler'
import Link from 'next/link'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import SearchBar from '@/modules/courses/components/search-bar'

export function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="bg-sidebar sticky top-0 z-50 flex h-15 w-full items-center justify-between py-2 shadow-sm sm:px-5">
      <div className="flex items-center gap-2 xl:hidden">
        <SheetSidebar />
      </div>

      <SearchBar />

      <div className="flex-center items-center gap-3 max-sm:pr-5">
        <ThemeTogglerButton
          className="cursor-pointer rounded-full"
          variant="ghost"
          size={'lg'}
          modes={['light', 'dark']}
          direction="rtl"
        />

        {status === 'loading' ? (
          <div className="flex-center size-12">
            <AiOutlineLoading3Quarters className="text-primary animate-spin" />
          </div>
        ) : session ? (
          <UserPopover session={session} />
        ) : (
          <Button asChild>
            <Link href="/auth/login">Acceder</Link>
          </Button>
        )}
      </div>
    </nav>
  )
}
