import { Label } from '@/modules/shared/components/ui/label'
import { Input } from '@/modules/shared/components/ui/input'
import { Button } from '@/modules/shared/components/ui/button'
import { Checkbox } from '@/modules/shared/components/ui/checkbox'

export default function LoginPage() {
  return (
    <div>LoginPage</div>
    // <div className="/* MÓVIL: full screen + morado arriba + formulario ocupa todo lo demás */ /* DESKTOP: diseño original exacto */ fixed inset-0 z-50 flex flex-col bg-white lg:relative lg:z-auto lg:h-[600px] lg:w-4xl lg:flex-row lg:overflow-hidden lg:rounded-[40px] lg:bg-gradient-to-r lg:from-white lg:from-[80%]">
    //   {/* === PANEL MORADO → arriba en móvil, derecha en desktop === */}
    //   <div className="bg-primary order-1 flex flex-col items-center justify-center gap-6 px-10 py-20 text-white lg:order-2 lg:w-2/4 lg:gap-2 lg:rounded-l-[25%] lg:px-12 lg:py-0">
    //     <h2 className="text-center text-4xl font-bold lg:text-5xl">
    //       ¡Bienvenido!
    //     </h2>
    //     <p className="max-w-xs text-center text-lg opacity-90">
    //       Accede a tu cuenta para continuar con tus actividades.
    //     </p>
    //   </div>

    //   {/* === FORMULARIO → abajo en móvil (flex-1), izquierda en desktop === */}
    //   <div className="order-2 flex flex-1 flex-col justify-center gap-8 bg-white p-8 lg:order-1 lg:w-2/4 lg:flex-none lg:gap-4 lg:p-16">
    //     <div className="space-y-4 text-center">
    //       <h1 className="text-3xl font-semibold lg:text-4xl">Inicia Sesión</h1>
    //       <p className="text-muted-foreground text-sm lg:text-base">
    //         Ingresa tus credenciales para acceder a la plataforma.
    //       </p>
    //     </div>

    //     <div className="space-y-6 lg:space-y-3">
    //       <div className="space-y-2">
    //         <Label htmlFor="code" className="text-base">
    //           Código Estudiantil
    //         </Label>
    //         <Input
    //           id="code"
    //           placeholder="Ingresa tu código"
    //           className="h-12 lg:h-auto"
    //         />
    //       </div>

    //       <div className="space-y-2">
    //         <Label htmlFor="password" className="text-base">
    //           Contraseña
    //         </Label>
    //         <Input
    //           id="password"
    //           type="password"
    //           placeholder="Ingresa tu contraseña"
    //           className="h-12 lg:h-auto"
    //         />
    //       </div>

    //       <div className="flex items-center gap-2">
    //         <Checkbox id="session" />
    //         <Label
    //           htmlFor="session"
    //           className="cursor-pointer text-sm lg:text-base"
    //         >
    //           Mantener sesión iniciada
    //         </Label>
    //       </div>

    //       <Button className="bg-primary hover:bg-primary/90 h-12 w-full text-base lg:mx-auto lg:h-auto lg:w-2/4">
    //         Iniciar sesión
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  )
}
