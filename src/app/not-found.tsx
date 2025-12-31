import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import { IoMdHome } from 'react-icons/io'
import NotFoundAnimation from '@/modules/shared/components/lottie/no-found-animation'

export default function NotFound() {
  return (
    <div className="flex h-fit flex-col items-center justify-center px-4">
      <div className="text-center">
        <NotFoundAnimation />
        <h2 className="text-3xl font-semibold">Página no encontrada</h2>
        <p className="text-muted-foreground mt-2">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href={'/'}>
              <IoMdHome />
              Volver al Inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
