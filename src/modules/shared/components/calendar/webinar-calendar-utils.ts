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
 * Converts a UTC date string to a "floating" ISO string (YYYY-MM-DDTHH:mm:ss) 
 * relative to America/Lima timezone.
 * 
 * This is useful for FullCalendar to display the event at the correct visual time
 * in the grid, regardless of the browser's local timezone.
 * 
 * @param utcDateString - The UTC date string from the backend
 * @returns ISO string representing the time in Lima
 */
export function toLimaIsoString(utcDateString: string): string {
  const date = new Date(utcDateString)
  
  // Format to parts in Lima timezone
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
  
  const parts = formatter.formatToParts(date)
  
  const getPart = (type: string) => parts.find(p => p.type === type)?.value || ''
  
  const year = getPart('year')
  const month = getPart('month')
  const day = getPart('day')
  const hour = getPart('hour') // "24" hour format from en-CA
  // Handle potentially "24" return from Intl (though en-CA usually 00-23, best to be safe if using other locales)
  // en-CA is usually 00-23.
  const minute = getPart('minute')
  const second = getPart('second')
  
  return `${year}-${month}-${day}T${hour}:${minute}:${second}`
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
