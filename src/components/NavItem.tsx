import Link from 'next/link'

import { classNames } from '@/utils/class-name.handlers'

type NavItemDevice = 'desktop' | 'mobile'

interface NavItemProps {
  href: string
  label: string
  index: number
  isActive: boolean
  device: NavItemDevice
}

const BASE_CLASSES: Record<NavItemDevice, string> = {
  desktop: 'flex min-h-11 items-center gap-sm rounded-sm px-sm outline-text-inverse',
  mobile: 'inline-flex min-h-11 items-center rounded-sm border px-md',
}

const STATE_CLASSES: Record<NavItemDevice, Record<'active' | 'inactive', string>> = {
  desktop: {
    active: 'bg-accent-selected text-text-primary',
    inactive:
      'text-text-inverse hover:bg-[color-mix(in_srgb,var(--color-bg-inverse)_88%,var(--color-bg-page))]',
  },
  mobile: {
    active: 'border-transparent bg-accent-selected text-text-primary',
    inactive: 'border-border-strong text-text-primary hover:bg-fill-subtle',
  },
}

export function NavItem({ href, label, index, isActive, device }: NavItemProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={classNames(
        'motion-color label-m',
        BASE_CLASSES[device],
        STATE_CLASSES[device][isActive ? 'active' : 'inactive'],
      )}
    >
      {device === 'desktop' && (
        <span
          className={classNames('mono-s', isActive ? 'text-text-primary' : 'text-text-inverse-secondary')}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
      {label}
    </Link>
  )
}
