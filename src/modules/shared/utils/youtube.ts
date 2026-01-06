export function getYouTubeVideoId(url: string): string {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : ''
}

export function extractYouTubeId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i
  const match = url.match(regex)
  return match ? match[1] : null
}

export function getYouTubeThumbnail(
  youtubeUrl: string,
  quality:
    | 'maxresdefault'
    | 'hqdefault'
    | 'mqdefault'
    | 'sddefault'
    | 'default' = 'hqdefault'
): string | null {
  const videoId = getYouTubeVideoId(youtubeUrl)
  if (!videoId) return null
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
}
