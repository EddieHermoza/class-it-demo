'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '@/modules/shared/components/ui/dialog'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getYouTubeThumbnail } from '@/modules/shared/utils'
import CourseVideoPlayer from './custom-video-player'
import VideoPlayer from '../video-player'
import { IoClose } from 'react-icons/io5'

interface PreviewVideo {
  id: string
  title: string
  duration: number
  url: string
}
interface Props {
  isOpen: boolean
  onClose: () => void
  lectures: PreviewVideo[]
  currentVideoId: string | null
  onVideoChange: (videoId: string) => void
}

export function VideoPreviewModal({
  isOpen,
  onClose,
  lectures: videos,
  currentVideoId,
  onVideoChange,
}: Props) {
  const currentVideo = videos.find((v) => v.id === currentVideoId)

  const handleVideoSelect = (videoId: string) => {
    onVideoChange(videoId)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="h-auto overflow-hidden p-0 shadow-none sm:max-w-7xl"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Videos de vista previa</DialogTitle>
        <div className="flex max-lg:flex-col">
          <div className="bg-background flex-center relative aspect-video h-auto w-full max-w-4xl overflow-hidden m-auto">
            <VideoPlayer
              title={currentVideo?.title}
              videoUrl={currentVideo?.url}
            />
          </div>

          <div className="bg-background relative flex flex-col lg:w-2/5">
            <div className="border-border bg-muted/50 border-b p-4 backdrop-blur-sm">
              <h4 className="text-sm font-semibold">Videos de vista previa</h4>
              <p className="text-muted-foreground text-xs">
                {videos.length} videos disponibles
              </p>
              <DialogClose className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer">
                <IoClose className="size-5" />
              </DialogClose>
            </div>
            <div className="custom-scrollbar w-full flex-1 overflow-y-auto max-h-80">
              {videos.map((video) => {
                const isActive = currentVideoId === video.id
                const thumbnail = getYouTubeThumbnail(video.url)
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
                            'flex-center h-14 w-20 overflow-hidden rounded-lg bg-linear-to-br transition-all duration-200',
                            isActive
                              ? 'from-primary to-primary'
                              : 'from-muted to-muted group-hover:from-primary/50 group-hover:to-primary/50'
                          )}
                        >
                          {thumbnail ? (
                            <img
                              src={thumbnail}
                              alt={video.title}
                              className="size-full rounded-lg object-cover"
                            />
                          ) : (
                            <Play
                              className={cn(
                                'size-6 transition-colors',
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
                          <span>{video.duration} min</span>
                          {isActive && (
                            <span className="text-primary flex items-center gap-1">
                              <div className="bg-primary size-1.5 animate-pulse rounded-full" />
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
