import Lottie from 'lottie-react'
import animationData from '@/assets/animation/animation-logo.json'

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Lottie animationData={animationData} loop className="size-28" />
    </div>
  )
}
