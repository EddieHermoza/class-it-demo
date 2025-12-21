'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/modules/shared/components/ui/dialog'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getYouTubeThumbnail } from '@/modules/shared/utils'
// import { YouTubePlayerComponent } from '@/modules/shared/components/youtube-player'
import { YouTubeIframePlayer } from '@/modules/shared/components/youtube-iframe-player'

interface Video {
  id: string
  title: string
  duration: string
  youtubeUrl: string
  thumbnail?: string
}

interface VideoPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  videos: Video[]
  currentVideoId: string | null
  onVideoChange: (videoId: string) => void
}

export function VideoPreviewModal({
  isOpen,
  onClose,
  videos,
  currentVideoId,
  onVideoChange,
}: VideoPreviewModalProps) {
  const currentVideo = videos.find((v) => v.id === currentVideoId)

  const [playing, setPlaying] = useState(false)

  const handleVideoSelect = (videoId: string) => {
    onVideoChange(videoId)
    setPlaying(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="h-[70vh]! w-[98vw]! max-w-[98vw]! border-white/10 bg-[#0a0f1c] p-0! sm:max-w-[1400px]!"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Videos de vista previa</DialogTitle>
        <div className="flex h-full flex-col lg:flex-row">
          <div className="flex flex-2 flex-col bg-black lg:flex-3">
            <div className="relative flex flex-1 items-center justify-center bg-black">
              {currentVideo?.youtubeUrl ? (
                // <YouTubePlayerComponent
                //   videoUrl={currentVideo.youtubeUrl}
                //   autoplay={playing}
                //   className="h-full w-full"
                // />

                <YouTubeIframePlayer
                  videoUrl={currentVideo.youtubeUrl}
                  autoplay={playing}
                  className="h-full w-full"
                />
              ) : (
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
                    <Play className="ml-1 h-10 w-10 text-white/60" />
                  </div>
                  <p className="text-sm text-white/60">Selecciona un video</p>
                </div>
              )}
            </div>
          </div>

          <div className="border-border bg-background flex max-h-[30vh] flex-col border-t lg:max-h-full lg:w-[350px] lg:flex-1 lg:border-t-0 lg:border-l">
            <div className="border-border bg-muted/50 border-b p-4 backdrop-blur-sm">
              <div className="text-foreground flex items-center gap-2">
                <div>
                  <h4 className="text-sm font-semibold">
                    Videos de vista previa
                  </h4>
                  <p className="text-muted-foreground text-xs">
                    {videos.length} videos disponibles
                  </p>
                </div>
              </div>
            </div>

            <div className="scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent flex-1 overflow-y-auto">
              {videos.map((video) => {
                const isActive = currentVideoId === video.id
                const thumbnail =
                  video.thumbnail || getYouTubeThumbnail(video.youtubeUrl)
                return (
                  <button
                    key={video.id}
                    onClick={() => handleVideoSelect(video.id)}
                    className={cn(
                      'group border-border hover:bg-muted w-full border-b p-4 text-left transition-all duration-200',
                      isActive && 'border-l-primary bg-primary/10 border-l-4'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative shrink-0">
                        <div
                          className={cn(
                            'flex h-14 w-20 items-center justify-center overflow-hidden rounded-lg bg-linear-to-br transition-all duration-200',
                            isActive
                              ? 'from-primary to-primary'
                              : 'from-muted to-muted group-hover:from-primary/50 group-hover:to-primary/50'
                          )}
                        >
                          {thumbnail ? (
                            <img
                              src={thumbnail}
                              alt={video.title}
                              className="h-full w-full rounded-lg object-cover"
                            />
                          ) : (
                            <Play
                              className={cn(
                                'h-6 w-6 transition-colors',
                                isActive
                                  ? 'text-primary-foreground'
                                  : 'text-muted-foreground group-hover:text-primary'
                              )}
                            />
                          )}
                        </div>
                        {/* <div className="bg-primary text-primary-foreground absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shadow-lg">
                          {index + 1}
                        </div> */}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className={cn(
                            'mb-1 line-clamp-2 text-sm font-semibold transition-colors',
                            isActive
                              ? 'text-primary'
                              : 'text-foreground group-hover:text-primary'
                          )}
                        >
                          {video.title}
                        </p>
                        <div className="text-muted-foreground flex items-center gap-2 text-xs">
                          <span>{video.duration}</span>
                          {isActive && (
                            <span className="text-primary flex items-center gap-1">
                              <div className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
                              Reproduciendo
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
