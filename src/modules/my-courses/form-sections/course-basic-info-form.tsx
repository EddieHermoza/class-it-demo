'use client'

import ErrorMessage from '@/modules/shared/components/error-message'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/modules/shared/components/ui/card'
import { Input } from '@/modules/shared/components/ui/input'
import { Textarea } from '@/modules/shared/components/ui/textarea'
import { RequirementsList } from './course-requirements-list-form'
import { useFormContext, Controller } from 'react-hook-form'
import { CourseSchemaType } from '../schemas/course-schema'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/modules/shared/components/ui/select'
import { useGetCategories } from '@/modules/shared/hooks/use-get-categories'

export default function CourseBasicInfo() {
  const { categories, isLoading: isLoadingCategories } = useGetCategories()
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CourseSchemaType>()

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Información General</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex w-full gap-5">
          <label htmlFor="title" className="flex w-full flex-col gap-2 text-sm">
            <span className="font-semibold">Título</span>
            <Input
              id="title"
              placeholder="Ej: Master en React 2025"
              {...register('title')}
            />
            <ErrorMessage message={errors.title?.message} />
          </label>
          <label
            htmlFor="shortDescription"
            className="flex w-full flex-col gap-2 text-sm"
          >
            <span className="font-semibold">Descripción corta</span>
            <Input
              id="shortDescription"
              placeholder="Resumen breve del curso"
              {...register('shortDescription')}
            />
            <ErrorMessage message={errors.shortDescription?.message} />
          </label>
        </div>

        <div className="flex w-full gap-5">
          <label className="flex w-full flex-col gap-2 text-sm">
            <span className="font-semibold">Nivel del curso</span>
            <Controller
              name="level"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={false}
                >
                  <SelectTrigger className="hover:bg-secondary w-full rounded-none">
                    <SelectValue placeholder="Selecciona el nivel" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none" position="popper">
                    <SelectItem value="BEGINNER">Básico</SelectItem>
                    <SelectItem value="INTERMEDIATE">Intermedio</SelectItem>
                    <SelectItem value="ADVANCED">Avanzado</SelectItem>
                    <SelectItem value="ALL_LEVELS">Para todos</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <ErrorMessage message={errors.level?.message} />
          </label>

          <label className="flex w-full flex-col gap-2 text-sm">
            <span className="font-semibold">Categoría del curso</span>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isLoadingCategories}
                >
                  <SelectTrigger className="hover:bg-secondary w-full rounded-none">
                    <SelectValue placeholder="Selecciona la categoría" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none" position="popper">
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <ErrorMessage message={errors.categoryId?.message} />
          </label>
        </div>

        <label className="flex w-full flex-col gap-2 text-sm">
          <span className="font-semibold">Descripción</span>
          <Textarea
            id="description"
            placeholder="Describe detalladamente tu curso..."
            {...register('description')}
          />
          <ErrorMessage message={errors.description?.message} />
        </label>

        <label className="flex w-full flex-col gap-2 text-sm">
          <span className="font-semibold">¿Qué aprenderás?</span>
          <Textarea
            id="whatYouWillLearn"
            placeholder="Ej: Dominarás React, Next.js, Server Components..."
            {...register('whatYouWillLearn')}
          />
          <ErrorMessage message={errors.whatYouWillLearn?.message} />
        </label>

        <label className="flex w-full flex-col gap-2 text-sm">
          <span className="font-semibold">¿Para quién va dirigido?</span>
          <Textarea
            id="targetAudience"
            placeholder="Ej: Desarrolladores frontend con conocimientos básicos..."
            {...register('targetAudience')}
          />
          <ErrorMessage message={errors.targetAudience?.message} />
        </label>

        <div className="space-y-3">
          <RequirementsList />
        </div>
      </CardContent>
    </Card>
  )
}
