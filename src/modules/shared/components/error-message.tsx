interface ErrorMessageProps {
  message?: string | undefined | null
  className?: string
}

export default function ErrorMessage({
  message,
  className,
}: ErrorMessageProps) {
  if (!message) return null
  return (
    <span className={`${className} text-xs tracking-wider text-red-500`}>
      {message}
    </span>
  )
}
