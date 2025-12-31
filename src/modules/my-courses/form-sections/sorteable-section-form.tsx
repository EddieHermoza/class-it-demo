'use client'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2, Plus } from 'lucide-react'
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

import { Button } from '@/modules/shared/components/ui/button'
import { Input } from '@/modules/shared/components/ui/input'
import {
  Card,
  CardContent,
  CardHeader,
} from '@/modules/shared/components/ui/card'
import { CourseSchemaType } from '../schemas/course-schema'
import { SortableLecture } from './sorteable-lecture-form'

interface SortableSectionProps {
  id: string
  index: number
  onRemove: () => void
}

export function SortableSection({ id, index, onRemove }: SortableSectionProps) {
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<CourseSchemaType>()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const { fields, append, move, remove } = useFieldArray({
    control,
    name: `sections.${index}.lectures`,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  }

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

      const updatedLectures = getValues(`sections.${index}.lectures`)
      updatedLectures.forEach((_, idx) => {
        setValue(`sections.${index}.lectures.${idx}.position`, idx)
      })
    }
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="border-l-primary border-l-4">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 py-3">
          <div
            {...attributes}
            {...listeners}
            className="hover:text-primary cursor-grab"
          >
            <GripVertical className="text-muted-foreground h-5 w-5" />
          </div>
          <div className="flex-1">
            <Input
              className="focus-visible:ring-primary/20 h-10 border-0 bg-transparent text-base font-semibold shadow-none focus-visible:ring-2"
              placeholder="Nombre de la sección..."
              {...register(`sections.${index}.title`)}
            />
            {errors.sections?.[index]?.title && (
              <p className="text-destructive text-xs">
                {errors.sections[index].title.message}
              </p>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3 pb-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={fields.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {fields.map((field, lIndex) => (
                  <SortableLecture
                    key={field.id}
                    id={field.id}
                    sectionIndex={index}
                    index={lIndex}
                    onRemove={() => remove(lIndex)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="hover:bg-primary/5 h-10 w-full border-2 border-dashed"
            onClick={() =>
              append({
                title: '',
                position: fields.length,
                duration: 0,
                isPreview: false,
                videoUrl: '',
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Añadir Lección
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
