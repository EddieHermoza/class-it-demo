'use client'

import Image from 'next/image'
import { FaBook } from 'react-icons/fa'
import { cn } from '@/lib/utils'

type Props = {
  src: string
  width?: number
  height?: number
  alt: string
  category?: string
  className?: string
  fill?: boolean
  placeholderSize?: number
}

export default function CustomImage({
  src,
  width,
  height,
  alt,
  className,
  fill = false,
  placeholderSize = 50,
}: Props) {
  const hasImage = src && src !== 'PENDIENTE' && src.trim() !== ''

  return (
    <div
      className={cn(
        'bg-muted relative overflow-hidden',
        fill ? 'size-full' : 'size-auto',
        className
      )}
      aria-label={alt}
    >
      {hasImage ? (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          className={cn(className, 'object-cover', fill && 'inset-0')}
          sizes={fill ? '100vw' : undefined}
          priority={false}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextElementSibling?.classList.remove('hidden')
          }}
        />
      ) : null}

      {!hasImage && (
        <div
          className={cn(
            'text-muted-foreground/70 flex size-full items-center justify-center',
            fill ? 'absolute inset-0' : ''
          )}
        >
          <FaBook size={placeholderSize} aria-hidden="true" />
          <span className="sr-only">{alt || 'Imagen no disponible'}</span>
        </div>
      )}
    </div>
  )
}
