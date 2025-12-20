'use client'

import { Dialog, DialogContent } from '@/modules/shared/components/ui/dialog'
import { Button } from '@/modules/shared/components/ui/button'
import { Play, Eye, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Video {
  id: string
  title: string
  duration: string
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="h-[85vh] w-full max-w-6xl border-white/10 bg-[#0a0f1c] p-0"
        showCloseButton={false}
      >
        <div className="flex h-full flex-col md:flex-row">
          {/* Video Player Section */}
          <div className="flex flex-1 flex-col bg-black">
            {/* Close button */}
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <h3 className="truncate pr-4 font-semibold text-white">
                {currentVideo?.title || 'Vista previa del curso'}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="shrink-0 text-white/70 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Video placeholder */}
            <div className="flex flex-1 items-center justify-center bg-black">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
                  <Play className="ml-1 h-10 w-10 text-white/60" />
                </div>
                <p className="text-sm text-white/60">
                  Video: {currentVideo?.title}
                </p>
                <p className="mt-1 text-xs text-white/40">
                  Duración: {currentVideo?.duration}
                </p>
              </div>
            </div>
          </div>

          {/* Video List Sidebar */}
          <div className="flex max-h-[40vh] flex-col border-l border-white/10 bg-[#111827] md:max-h-full md:w-80">
            <div className="border-b border-white/10 p-4">
              <div className="flex items-center gap-2 text-white/80">
                <Eye className="h-4 w-4" />
                <span className="text-sm font-semibold">
                  Videos de vista previa ({videos.length})
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {videos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => onVideoChange(video.id)}
                  className={cn(
                    'w-full border-b border-white/10 p-4 text-left transition-colors hover:bg-white/5',
                    currentVideoId === video.id &&
                      'border-l-4 border-l-blue-500 bg-blue-600/20'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white/10">
                      <Play className="h-4 w-4 text-white/60" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 truncate text-sm font-medium text-white">
                        {video.title}
                      </p>
                      <p className="text-xs text-white/50">{video.duration}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
