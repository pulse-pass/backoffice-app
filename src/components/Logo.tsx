import { classNames } from '@/utils/class-name.handlers'

type LogoVariant = 'default' | 'inverse'

interface LogoProps {
  variant?: LogoVariant
  className?: string
}

const wordmarkClasses: Record<LogoVariant, string> = {
  default: 'text-text-primary',
  inverse: 'text-text-inverse',
}

const bars = [
  { height: 'h-2', color: 'bg-accent-live' },
  { height: 'h-[18px]', color: 'bg-accent-live' },
  { height: 'h-[30px]', color: 'bg-action-primary' },
  { height: 'h-3', color: 'bg-accent-live' },
  { height: 'h-1.5', color: 'bg-accent-live' },
]

export function Logo({ variant = 'default', className }: LogoProps) {
  return (
    <div className={classNames('flex items-center gap-sm', className)}>
      <div className="flex shrink-0 items-center gap-2xs" aria-hidden="true">
        {bars.map((bar, index) => (
          <span key={index} className={classNames('block w-1 rounded-sm', bar.height, bar.color)} />
        ))}
      </div>
      <span
        className={classNames(
          'font-display text-[26px] font-black tracking-[1.56px] whitespace-nowrap',
          wordmarkClasses[variant],
        )}
      >
        PULSEPASS
      </span>
    </div>
  )
}
