'use client'

import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { webinarSchema, WebinarFormValues } from './schemas/webinar-schema'
import { Button } from '@/modules/shared/components/ui/button'
import { Input } from '@/modules/shared/components/ui/input'
import {
  PlusCircle,
  Loader2,
  Calendar,
  Clock,
  Link as LinkIcon,
  Tag,
} from 'lucide-react'
import ErrorMessage from '@/modules/shared/components/error-message'
import { useSWRConfig } from 'swr'
import { useSession } from 'next-auth/react'
import { useSendRequest } from '../shared/hooks/use-send-request'
import { useGetCategories } from '@/modules/shared/hooks/use-get-categories'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/modules/shared/components/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/shared/components/ui/card'
import WebinarImageSection from './components/webinar-image-form'

interface WebinarCreateFormProps {
  onSuccess?: () => void
}

export function WebinarCreateForm({ onSuccess }: WebinarCreateFormProps = {}) {
  const { data: session } = useSession()
  const { mutate } = useSWRConfig()
  const { categories = [] } = useGetCategories()
  const router = useRouter()

  const methods = useForm<WebinarFormValues>({
    resolver: zodResolver(webinarSchema),
    defaultValues: {
      title: '',
      date: new Date().toLocaleDateString('en-CA', {
        timeZone: 'America/Lima',
      }),
      time: '',
      categoryId: '',
      linkUrl: '',
      file: undefined,
    },
  })

  // Desestructuramos lo que necesitamos de methods
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods

  const { sendRequest, loading } = useSendRequest(
    '/api/V1/webinars',
    'POST',
    session?.tokens.access,
    true
  )

  const onSubmitHandler: SubmitHandler<WebinarFormValues> = async (values) => {
    // Construct date string with Lima Offset (-05:00)
    // Values.date is YYYY-MM-DD
    // Values.time is HH:MM
    const scheduleAtLima = `${values.date}T${values.time}:00-05:00`
    const scheduleAtUtc = new Date(scheduleAtLima).toISOString()

    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('scheduleAt', scheduleAtUtc)
    formData.append('linkUrl', values.linkUrl)
    formData.append('categoryId', values.categoryId)

    if (values.file && values.file instanceof File) {
      formData.append('file', values.file)
    }

    const { data, error } = await sendRequest(formData)

    if (error) {
      toast.error(error)
      return
    }

    if (data) {
      toast.success('Webinar programado exitosamente')
      mutate('/api/V1/webinars/my-webinars', undefined, { revalidate: true })
      mutate('/api/V1/webinars', undefined, { revalidate: true })

      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/my-webinars')
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content Column */}
          <div className="space-y-8 lg:col-span-2">
            <Card className="rounded-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="text-primary size-5" />
                  Información Detallada
                </CardTitle>
                <CardDescription>
                  Define el título y la categoría para categorizar tu webinar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold">
                    Nombre del Webinar
                  </span>
                  <Input
                    id="title"
                    {...register('title')}
                    placeholder="Ej. Masterclass de Desarrollo Web con Next.js 15"
                    disabled={loading}
                    className="h-12 text-lg"
                  />
                  <ErrorMessage message={errors.title?.message} />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold">Categoría</span>
                  <Select
                    onValueChange={(val) =>
                      setValue('categoryId', val, { shouldValidate: true })
                    }
                    value={watch('categoryId')}
                    disabled={loading}
                  >
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id} className="py-3">
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage message={errors.categoryId?.message} />
                </label>
              </CardContent>
            </Card>
            
            <WebinarImageSection />

          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            <Card className="rounded-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="text-primary size-4" />
                  Programación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold italic opacity-80">
                    Fecha del evento (Hora Perú)
                  </span>
                  <div className="relative">
                    <Calendar className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                      id="date"
                      type="date"
                      {...register('date')}
                      disabled={loading}
                      className="h-11 pl-10"
                    />
                  </div>
                  <ErrorMessage message={errors.date?.message} />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold italic opacity-80">
                    Hora de inicio (Hora Perú)
                  </span>
                  <div className="relative">
                    <Clock className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                      id="time"
                      type="time"
                      {...register('time')}
                      disabled={loading}
                      className="h-11 pl-10"
                    />
                  </div>
                  <ErrorMessage message={errors.time?.message} />
                </label>
              </CardContent>
            </Card>

            <Card className="rounded-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <LinkIcon className="text-primary size-4" />
                  Link de Acceso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold italic opacity-80">
                    URL de la Sesión
                  </span>
                  <Input
                    id="linkUrl"
                    {...register('linkUrl')}
                    placeholder="https://zoom.us/j/..."
                    disabled={loading}
                    className="border-primary/20 bg-background h-11"
                  />
                  <ErrorMessage message={errors.linkUrl?.message} />
                </label>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Asegúrate de que el link sea accesible para que tus estudiantes
                  puedan unirse sin problemas.
                </p>
              </CardContent>
            </Card>
            <div className="relative flex w-full gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-1/2"
                onClick={() => router.back()}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading} className="w-1/2 gap-2">
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <PlusCircle className="size-4" />
                )}
                Agendar Webinar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
