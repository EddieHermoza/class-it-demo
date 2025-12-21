'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/modules/shared/components/ui/button'
import { Slider } from '@/modules/shared/components/ui/slider'
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube'
import screenfull from 'screenfull'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface YouTubePlayerComponentProps {
  videoUrl: string
  autoplay?: boolean
  className?: string
  onReady?: () => void
  onEnd?: () => void
}

// Helper to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : ''
}

export function YouTubePlayerComponent({
  videoUrl,
  autoplay = false,
  className,
  onReady,
  onEnd,
}: YouTubePlayerComponentProps) {
  const videoId = getYouTubeVideoId(videoUrl)

  const playerRef = useRef<YouTubePlayer | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const [playing, setPlaying] = useState(autoplay)
  const [volume, setVolume] = useState(70)
  const [muted, setMuted] = useState(false)
  const [played, setPlayed] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [seeking, setSeeking] = useState(false)

  useEffect(() => {
    setPlaying(autoplay)
    setPlayed(0)
  }, [videoUrl, autoplay])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (playing && showControls) {
      timeout = setTimeout(() => setShowControls(false), 3000)
    }
    return () => clearTimeout(timeout)
  }, [playing, showControls])

  // Update progress
  useEffect(() => {
    if (playing && playerRef.current && !seeking) {
      progressIntervalRef.current = setInterval(async () => {
        try {
          const currentTime = await playerRef.current?.getCurrentTime()
          const totalDuration = await playerRef.current?.getDuration()
          if (currentTime && totalDuration) {
            setPlayed(currentTime / totalDuration)
          }
        } catch {
          // Ignore errors
        }
      }, 100)
    } else if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [playing, seeking])

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlayPause = async () => {
    if (!playerRef.current) return

    if (playing) {
      await playerRef.current.pauseVideo()
      setPlaying(false)
    } else {
      await playerRef.current.playVideo()
      setPlaying(true)
    }
  }

  const handleVolumeChange = async (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setMuted(newVolume === 0)
    if (playerRef.current) {
      await playerRef.current.setVolume(newVolume)
      if (newVolume === 0) {
        await playerRef.current.mute()
      } else {
        await playerRef.current.unMute()
      }
    }
  }

  const handleToggleMute = async () => {
    if (!playerRef.current) return

    if (muted) {
      await playerRef.current.unMute()
      setMuted(false)
      if (volume === 0) {
        setVolume(70)
        await playerRef.current.setVolume(70)
      }
    } else {
      await playerRef.current.mute()
      setMuted(true)
    }
  }

  const handleSeekChange = (value: number[]) => {
    setPlayed(value[0])
  }

  const handleSeekMouseDown = () => {
    setSeeking(true)
  }

  const handleSeekMouseUp = async (value: number[]) => {
    setSeeking(false)
    if (playerRef.current && duration) {
      const seekTime = value[0] * duration
      await playerRef.current.seekTo(seekTime, true)
      setPlayed(value[0])
    }
  }

  const handleSeekClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || !duration) return

    const slider = e.currentTarget
    const rect = slider.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const clampedPercentage = Math.max(0, Math.min(1, percentage))

    await playerRef.current.seekTo(clampedPercentage * duration, true)
    setPlayed(clampedPercentage)
  }

  const handleFullscreen = () => {
    if (screenfull.isEnabled && containerRef.current) {
      screenfull.toggle(containerRef.current)
    }
  }

  const handleSpeedChange = async (speed: number) => {
    setPlaybackRate(speed)
    setShowSettings(false)
    if (playerRef.current) {
      await playerRef.current.setPlaybackRate(speed)
    }
  }

  const onPlayerReady: YouTubeProps['onReady'] = async (event) => {
    playerRef.current = event.target
    const videoDuration = await event.target.getDuration()
    setDuration(videoDuration)
    await event.target.setVolume(volume)
    if (autoplay) {
      await event.target.playVideo()
    }
    onReady?.()
  }

  const onPlayerStateChange: YouTubeProps['onStateChange'] = (event) => {
    // 1 = playing, 2 = paused, 0 = ended
    if (event.data === 1) {
      setPlaying(true)
    } else if (event.data === 2) {
      setPlaying(false)
    } else if (event.data === 0) {
      setPlaying(false)
      setPlayed(0)
      onEnd?.()
    }
  }

  const opts: YouTubeProps['opts'] = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: autoplay ? 1 : 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      showinfo: 0,
      cc_load_policy: 0,
      autohide: 1,
    },
  }

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]

  if (!videoId) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black">
        <p className="text-sm text-white/60">URL de video inválida</p>
      </div>
    )
  }

  const handleVideoClick = () => {
    handlePlayPause()
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex items-center justify-center bg-black',
        className
      )}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => playing && setShowControls(false)}
      onClick={handleVideoClick}
    >
      <div className="pointer-events-none absolute inset-0">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
          className="h-full w-full"
          iframeClassName="h-full w-full pointer-events-none"
        />
      </div>

      {/* Overlay clickeable para play/pause */}
      <div
        className={cn(
          'absolute inset-0 z-10 flex items-center justify-center transition-opacity',
          playing ? 'opacity-0' : 'opacity-100'
        )}
        onClick={handleVideoClick}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-transform hover:scale-110">
          <Play className="ml-1 h-10 w-10 text-white" />
        </div>
      </div>

      <div
        className={cn(
          'absolute inset-0 z-20 flex flex-col justify-end bg-linear-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300',
          showControls ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pb-2">
          <div className="mb-2 flex items-center justify-between text-xs text-white/80">
            <span>{formatTime(played * duration)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div onClick={handleSeekClick} className="cursor-pointer">
            <Slider
              value={[played]}
              max={1}
              step={0.001}
              onValueChange={handleSeekChange}
              onPointerDown={handleSeekMouseDown}
              onPointerUp={(e) => {
                const slider = e.currentTarget as HTMLElement
                const value = parseFloat(
                  slider.getAttribute('aria-valuenow') || '0'
                )
                handleSeekMouseUp([value / 100])
              }}
              className="cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>

        <div className="flex items-center justify-between px-6 pb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                handlePlayPause()
              }}
              className="h-11 w-11 text-white hover:bg-white/10"
            >
              {playing ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  handleToggleMute()
                }}
                className="h-10 w-10 text-white hover:bg-white/10"
              >
                {muted || volume === 0 ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              <Slider
                value={[muted ? 0 : volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-24 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowSettings(!showSettings)
                }}
                className="h-10 text-sm text-white hover:bg-white/10"
              >
                <Settings className="mr-2 h-4 w-4" />
                {playbackRate}x
              </Button>
              {showSettings && (
                <div
                  className="absolute right-0 bottom-full z-50 mb-2 rounded-lg border border-white/10 bg-[#111827] p-2 shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mb-2 px-2 text-xs font-semibold text-white/60">
                    Velocidad
                  </div>
                  {speeds.map((speed) => (
                    <button
                      key={speed}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSpeedChange(speed)
                      }}
                      className={cn(
                        'flex w-full items-center justify-between rounded px-3 py-2 text-sm text-white transition-colors hover:bg-white/10',
                        playbackRate === speed && 'bg-blue-600/20'
                      )}
                    >
                      <span>{speed}x</span>
                      {playbackRate === speed && (
                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                handleFullscreen()
              }}
              className="h-10 w-10 text-white hover:bg-white/10"
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
