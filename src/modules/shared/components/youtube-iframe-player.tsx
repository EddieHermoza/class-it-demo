'use client'

import { cn } from '@/lib/utils'

interface YouTubeIframePlayerProps {
  videoUrl: string
  autoplay?: boolean
  className?: string
}

const getYouTubeVideoId = (url: string): string => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : ''
}

export function YouTubeIframePlayer({
  videoUrl,
  autoplay = false,
  className,
}: YouTubeIframePlayerProps) {
  const videoId = getYouTubeVideoId(videoUrl)

  if (!videoId) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black">
        <p className="text-sm text-white/60">URL de video inválida</p>
      </div>
    )
  }

  return (
    <div className={cn('relative h-full w-full bg-black', className)}>
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="YouTube video player"
      />
    </div>
  )
}
