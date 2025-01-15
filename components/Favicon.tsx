import { Shuffle } from 'lucide-react'

export function Favicon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="16" fill="black" />
      <Shuffle color="white" size={24} absoluteStrokeWidth style={{ transform: 'translate(4px, 4px)' }} />
    </svg>
  )
}

