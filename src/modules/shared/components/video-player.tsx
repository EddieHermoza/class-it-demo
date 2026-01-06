'use client'

import {
  MediaPlayer,
  MediaProvider,
  Poster,
  useMediaStore,
} from '@vidstack/react'
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default'

import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/video.css'
import { extractYouTubeId } from '../utils'

interface Props {
  videoUrl?: string
  title?: string
}
export default function VideoPlayer({ videoUrl, title }: Props) {
  const youtubeId = extractYouTubeId(videoUrl ?? '')

  if (!youtubeId) {
    return (
      <div className="flex-center bg-black/60 text-red-500">
        URL de YouTube inválida
      </div>
    )
  }

  const posterUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`

  return (
    <div className="relative size-full rounded-none bg-black/60 p-0">
      <MediaPlayer
        title={title}
        src={`youtube/${youtubeId}`}
        viewType="video"
        streamType="on-demand"
        playsInline
        className="bg-background! m-0! rounded-none! p-0!"
      >
        <MediaProvider className="bg-background! m-0! rounded-none! p-0!" />
        <LoadingOverlay />
        <AnimatedPoster posterUrl={posterUrl} />

        <DefaultVideoLayout
          icons={defaultLayoutIcons}
          className="bg-background! m-0! rounded-none! p-0!"
        />
      </MediaPlayer>
    </div>
  )
}

function LoadingOverlay() {
  const { canPlay } = useMediaStore()

  const isLoading = !canPlay

  if (!isLoading) return null

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="flex flex-col items-center gap-4">
        <div className="border-t-primary size-12 animate-spin rounded-full border-4 border-white/30" />
      </div>
    </div>
  )
}

function AnimatedPoster({ posterUrl }: { posterUrl: string }) {
  const { paused, started, canPlay } = useMediaStore()

  const showPoster = !started || (paused && !canPlay)

  return (
    <Poster
      className={`bg-background! pointer-events-none absolute top-0 left-0 z-10 size-full transition-opacity duration-300 ease-in-out ${showPoster ? 'opacity-100' : 'opacity-0'} `}
      src={posterUrl}
      alt="Miniatura del video"
    />
  )
}
