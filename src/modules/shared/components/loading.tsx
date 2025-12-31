import Lottie from 'lottie-react'
import animationData from '@/assets/animation/animation-logo.json'

export function Loading() {
  return (
    <div className="flex-center size-full">
      <Lottie animationData={animationData} loop className="size-20" />
    </div>
  )
}
