'use client'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../../animate-ui/components/radix/hover-card'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Separator } from '../ui/separator'
import { useState } from 'react'

export default function InstructorPopover() {
  const [open, setOpen] = useState(false)
  return (
    <HoverCard open={open} onOpenChange={setOpen} openDelay={0}>
      <HoverCardTrigger
        asChild
        className={`cursor-default rounded-md px-5 py-2 text-sm transition-colors duration-300 ${
          open ? 'bg-accent text-primary' : 'hover:bg-accent hover:text-primary'
        }`}
      >
        <Link href={'/auth/register-teacher'}>Ser instructor</Link>
      </HoverCardTrigger>

      <HoverCardContent
        side="bottom"
        align="center"
        sideOffset={11}
        className="w-72 rounded-none p-4"
      >
        <div className="flex flex-col gap-3">
          <h4 className="text-muted-foreground w-full text-center text-sm font-semibold">
            ¿Quieres crear tu propio curso?
          </h4>

          <p className="text-muted-foreground text-sm leading-relaxed">
            Enseña lo que sabes, ayuda a otros a crecer y construye tu marca
            como instructor.
          </p>

          <Separator />

          <Button asChild className="w-full rounded-none">
            <Link href="/auth/register-teacher">
              Inscribirse como instructor
            </Link>
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
