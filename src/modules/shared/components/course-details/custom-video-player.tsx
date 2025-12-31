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

function extractYouTubeId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i
  const match = url.match(regex)
  return match ? match[1] : null
}

interface Props {
  videoUrl: string
  title: string
}
export default function VideoPlayer({ videoUrl, title }: Props) {
  const youtubeId = extractYouTubeId(videoUrl)

  if (!youtubeId) {
    return <div className="text-red-500">URL de YouTube inválida</div>
  }

  const posterUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`

  return (
    <div className="bg-background relative size-full rounded-none p-0">
      <MediaPlayer
        title={title}
        src={`youtube/${youtubeId}`}
        viewType="video"
        streamType="on-demand"
        playsInline
        className="bg-background! m-0! rounded-none! p-0!"
      >
        <MediaProvider className="bg-background! m-0! rounded-none! p-0!" />

        <AnimatedPoster posterUrl={posterUrl} />

        <DefaultVideoLayout
          icons={defaultLayoutIcons}
          className="bg-background! m-0! rounded-none! p-0!"
        />
      </MediaPlayer>
    </div>
  )
}

function AnimatedPoster({ posterUrl }: { posterUrl: string }) {
  const { paused, started } = useMediaStore()

  const showPoster = !started || paused

  return (
    <Poster
      className={`bg-background! pointer-events-none absolute top-0 left-0 z-10 size-full transition-opacity duration-300 ease-in-out ${showPoster ? 'opacity-100' : 'opacity-0'} `}
      src={posterUrl}
      alt="Miniatura del video"
    />
  )
}
