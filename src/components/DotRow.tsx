import { classNames } from '@/utils/class-name.handlers'

interface DotRowProps {
  className?: string
}

const DOT_COUNT = 22

export function DotRow({ className }: DotRowProps) {
  return (
    <div className={classNames('flex justify-between', className)} aria-hidden="true">
      {Array.from({ length: DOT_COUNT }, (_, index) => (
        <span key={index} className="block size-1 rounded-full bg-text-inverse" />
      ))}
    </div>
  )
}
