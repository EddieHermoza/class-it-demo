/* eslint-disable @typescript-eslint/no-unused-vars */
import { AiOutlinePlus } from 'react-icons/ai'

interface Props {
  iconClassName?: string
  className?: string
}
export default function Logo({ iconClassName, className }: Props) {
  return (
    <span className="flex-center flex h-full">
      <span className={`${className}`}>LMS</span>
      {/* <AiOutlinePlus strokeWidth={70} className={`${iconClassName}`} /> */}
    </span>
  )
}
