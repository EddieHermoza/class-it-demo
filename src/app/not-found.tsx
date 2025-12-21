'use client'

import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import { IoMdHome } from 'react-icons/io'
// simulacion de data de ls
import { CURRENT_ROLE, ROLE } from '@/modules/shared/constants'
import Lottie from 'lottie-react'
import animationData from '@/assets/animation/not-found.json'

export default function NotFound() {
  const redirectPath = CURRENT_ROLE === ROLE.ADMIN ? '/dashboard' : '/'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <Lottie animationData={animationData} loop className="h-full w-full" />
        <h2 className="text-3xl font-semibold">Página no encontrada</h2>
        <p className="text-muted-foreground mt-2">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href={redirectPath}>
              <IoMdHome />
              Volver al Inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
