/**
 * Utility functions for Webinar Calendar
 * 
 * This module provides helper functions for:
 * - Date formatting and timezone conversions
 * - Countdown calculations
 * - Webinar join eligibility checks
 */

/**
 * Formats a date to ISO string (YYYY-MM-DD) in the specified timezone
 * 
 * @param date - The date to format
 * @param timeZone - The timezone to use (e.g., 'America/Lima', 'UTC')
 * @returns ISO formatted date string (YYYY-MM-DD)
 */
export function formatDateToISO(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

/**
 * Calculates the countdown time remaining until a scheduled event
 * 
 * @param scheduledTime - ISO string of the scheduled event time
 * @param currentTime - Current time as Date object
 * @returns Formatted countdown string (e.g., "2h 30m 15s") or null if event has started
 */
export function getCountdown(scheduledTime: string, currentTime: Date): string | null {
  const start = new Date(scheduledTime).getTime()
  const now = currentTime.getTime()
  const diff = start - now

  if (diff <= 0) return null

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  const parts = []
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0 || hours > 0) parts.push(`${minutes}m`)
  parts.push(`${seconds}s`)

  return parts.join(' ')
}

/**
 * Determines if a user can join a webinar based on the scheduled time
 * 
 * @param scheduledTime - ISO string of the scheduled event time
 * @param currentTime - Current time as Date object
 * @returns true if the webinar has started (can join), false otherwise
 */
export function canJoinWebinar(scheduledTime: string, currentTime: Date): boolean {
  return new Date(scheduledTime) <= currentTime
}

/**
 * Formats event time to Lima timezone for display
 * 
 * @param eventStart - ISO string of the event start time
 * @returns Formatted time string (e.g., "10:30 a. m.")
 */
export function formatEventTime(eventStart: string): string {
  const eventDate = new Date(eventStart)
  return eventDate.toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Lima',
  })
}
