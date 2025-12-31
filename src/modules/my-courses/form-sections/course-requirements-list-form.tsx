'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import { useState } from 'react'
import { Button } from '@/modules/shared/components/ui/button'
import { Input } from '@/modules/shared/components/ui/input'
import { X, Plus } from 'lucide-react'
import { CourseSchemaType } from '@/modules/my-courses/schemas/course-schema'
import ErrorMessage from '@/modules/shared/components/error-message'
import { cn } from '@/lib/utils'

export function RequirementsList() {
  const {
    control,
    formState: { errors },
    setValue,
    clearErrors,
    trigger,
  } = useFormContext<CourseSchemaType>()

  const currentRequirements = useWatch({ control, name: 'requirements' }) || []

  const [newRequirement, setNewRequirement] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  // Validación manual del nuevo requisito antes de agregar
  const isNewRequirementValid = newRequirement.trim().length >= 5
  const newRequirementError =
    newRequirement.trim().length > 0 && newRequirement.trim().length < 5
      ? 'Cada requisito debe tener al menos 5 caracteres'
      : null

  const handleAdd = async () => {
    if (!isNewRequirementValid) {
      // No agregamos si no es válido
      return
    }

    const updated = [...currentRequirements, newRequirement.trim()]

    // Agregamos solo si es válido
    setValue('requirements', updated, { shouldValidate: true })
    await trigger('requirements') // actualiza errores generales

    setNewRequirement('')
    setIsAdding(false)
    clearErrors('requirements') // limpia errores temporales
  }

  const handleRemove = async (index: number) => {
    const updated = currentRequirements.filter((_, i) => i !== index)
    setValue('requirements', updated, { shouldValidate: true })
    await trigger('requirements')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isNewRequirementValid) {
      e.preventDefault()
      handleAdd()
    }
    if (e.key === 'Escape') {
      setIsAdding(false)
      setNewRequirement('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-base font-medium">Requisitos del curso</label>

        {!isAdding && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Añadir requisito
          </Button>
        )}
      </div>

      {/* Lista de requisitos existentes */}
      {currentRequirements.length > 0 ? (
        <ul className="space-y-3">
          {currentRequirements.map((req, index) => (
            <li
              key={index}
              className="bg-muted/40 flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm"
            >
              <span className="flex-1">{req}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive h-8 w-8"
                onClick={() => handleRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-muted/20 text-muted-foreground rounded-lg border border-dashed p-8 text-center text-sm">
          No hay requisitos añadidos aún
        </div>
      )}

      {isAdding && (
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <Input
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleAdd}
                placeholder="Ej: Conocimientos básicos de JavaScript"
                autoFocus
                className={cn(
                  'w-full',
                  newRequirementError &&
                    'focus-visible:border-red-500 focus-visible:ring-red-500/50 focus-visible:ring-[3px]'
                )}
              />
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsAdding(false)
                setNewRequirement('')
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {newRequirementError && (
            <p className="text-xs text-red-500">{newRequirementError}</p>
          )}
        </div>
      )}

      {errors.requirements?.message && (
        <ErrorMessage message={errors.requirements.message as string} />
      )}
    </div>
  )
}
