'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/modules/shared/components/ui/dialog'
import { Button } from '@/modules/shared/components/ui/button'
import { Heart } from 'lucide-react'

export function DonationDialog() {
  const [open, setOpen] = useState(false)

  const handleSimulatedPayment = () => {
    // Simulation logic here, for now just close the dialog
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-primary/10 hover:text-primary text-muted-foreground gap-2 transition-colors"
        >
          <Heart className="size-4 text-rose-500" />
          <span className="hidden sm:inline">Donar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl ">
             Yapear Donación
          </DialogTitle>
          <DialogDescription>
            Escanea el código QR o usa el número para realizar tu donación vía Yape.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center p-6 space-y-4">
          <div className="size-48 bg-primary/10 rounded-xl flex items-center justify-center border-2 border-primary/20 border-dashed text-primary">
              {/* Placeholder for QR Code */}
              <span className="text-sm font-medium">QR Yape Simulado</span>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">O al número:</p>
            <p className="text-lg font-bold text-foreground">999 999 999</p>
            <p className="text-xs text-muted-foreground mt-1">A nombre de: Class IT</p>
          </div>
        </div>

        <DialogFooter className="sm:justify-between gap-2">
           <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary/80 text-white"
            onClick={handleSimulatedPayment}
          >
            Ya yapeé
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
