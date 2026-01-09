/**
 * Webinar Calendar Unauthenticated State Component
 * 
 * Displays a login prompt when the user is not authenticated.
 * Shows a centered card with an icon, message, and login button.
 */

'use client'

import { signIn } from 'next-auth/react'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Button } from '@/modules/shared/components/ui/button'
import { LogIn } from 'lucide-react'

export function WebinarCalendarUnauthenticated() {
  return (
    <Card className="border-border/50 bg-muted/30 flex min-h-[400px] items-center justify-center overflow-hidden border-2 border-dashed shadow-none">
      <CardContent className="flex flex-col items-center gap-6 p-10 text-center">
        {/* Icon */}
        <div className="bg-primary/10 ring-primary/5 flex h-20 w-20 items-center justify-center rounded-full ring-8">
          <LogIn className="text-primary h-10 w-10" />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Acceso Restringido
          </h2>
          <p className="text-muted-foreground mx-auto max-w-sm">
            Debes iniciar sesión como instructor o alumno para ver el
            calendario de webinars y unirte a las sesiones.
          </p>
        </div>

        {/* Login Button */}
        <Button
          onClick={() => signIn()}
          size="lg"
          className="h-12 px-8 font-semibold"
        >
          Iniciar Sesión ahora
        </Button>
      </CardContent>
    </Card>
  )
}
