import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatDuration = (mins: number) => {
  const hours = Math.floor(mins / 60)
  const minutes = mins % 60

  let resultado = ''

  if (hours > 0) {
    resultado += `${hours}h`
  }

  if (minutes > 0) {
    if (resultado) resultado += ' '
    resultado += `${minutes}min`
  }

  return resultado || '0min'
}

export const courseLevelLabels: Record<string, string> = {
  BEGINNER: 'Básico',
  INTERMEDIATE: 'Intermedio',
  ADVANCED: 'Avanzado',
  ALL_LEVELS: 'Para todos los niveles',
}

export const getCourseLevelLabel = (level: string | undefined): string => {
  if (!level) return 'No especificado'
  return courseLevelLabels[level] || level
}
