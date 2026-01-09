'use client'

import { useState, useEffect } from 'react'

interface CountdownResult {
  hours: string
  minutes: string
  seconds: string
  isFinished: boolean
  totalSeconds: number
}

/**
 * useCountdown Hook
 * Calculates time remaining until a target date.
 */
export function useCountdown(targetDate: Date): CountdownResult {
  const [timeLeft, setTimeLeft] = useState<number>(0)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = targetDate.getTime() - now
      return Math.max(0, Math.floor(difference / 1000))
    }

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      const diff = calculateTimeLeft()
      setTimeLeft(diff)
      if (diff <= 0) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60

  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
    isFinished: timeLeft <= 0,
    totalSeconds: timeLeft,
  }
}
