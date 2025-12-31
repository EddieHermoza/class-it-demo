'use client'
import { useFieldArray, useFormContext } from 'react-hook-form'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'

import { Button } from '@/modules/shared/components/ui/button'
import { CourseSchemaType } from '../schemas/course-schema'
import { SortableSection } from './sorteable-section-form'

export function SectionList() {
  const { control, getValues, setValue } = useFormContext<CourseSchemaType>()
  const { fields, append, move, remove } = useFieldArray({
    control,
    name: 'sections',
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id)
      const newIndex = fields.findIndex((f) => f.id === over.id)
      move(oldIndex, newIndex)

      const updatedSections = getValues('sections')
      updatedSections.forEach((_, idx) => {
        setValue(`sections.${idx}.position`, idx)
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Contenido del Curso</h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              title: '',
              position: fields.length,
              lectures: [
                {
                  title: '',
                  videoUrl: '',
                  position: 0,
                  duration: 0,
                  isPreview: false,
                },
              ],
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Añadir Sección
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {fields.map((field, index) => (
              <SortableSection
                key={field.id}
                id={field.id}
                index={index}
                onRemove={() => remove(index)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
