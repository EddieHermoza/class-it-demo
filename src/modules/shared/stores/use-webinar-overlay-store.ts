import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Webinar Overlay Store
 * 
 * Manages the state of the first-visit webinar promotional overlay.
 * Uses localStorage to persist whether the user has seen the overlay.
 */

interface WebinarOverlayState {
  hasSeenOverlay: boolean
  isOpen: boolean
  markAsSeen: () => void
  closeOverlay: () => void
  resetOverlay: () => void
}

export const useWebinarOverlayStore = create<WebinarOverlayState>()(
  persist(
    (set) => ({
      hasSeenOverlay: false,
      isOpen: false,

      // Mark overlay as seen and close it
      markAsSeen: () => {
        set({ hasSeenOverlay: true, isOpen: false })
      },

      // Close the overlay and mark as seen
      closeOverlay: () => {
        set({ hasSeenOverlay: true, isOpen: false })
      },

      // Reset the overlay state (for testing)
      resetOverlay: () => {
        set({ hasSeenOverlay: false, isOpen: false })
      },
    }),
    {
      name: 'webinar-overlay-storage',
      partialize: (state) => ({ hasSeenOverlay: state.hasSeenOverlay }),
    }
  )
)

/**
 * Hook to initialize the overlay on mount
 * Call this in the landing page component
 */
export const useInitializeWebinarOverlay = () => {
  const hasSeenOverlay = useWebinarOverlayStore((state) => state.hasSeenOverlay)
  const isOpen = useWebinarOverlayStore((state) => state.isOpen)

  // Auto-open overlay if user hasn't seen it
  if (!hasSeenOverlay && !isOpen) {
    useWebinarOverlayStore.setState({ isOpen: true })
  }

  return { isOpen, hasSeenOverlay }
}
