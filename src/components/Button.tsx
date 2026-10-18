import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'

import { classNames } from '@/utils/class-name.handlers'

export type ButtonVariant = 'primary' | 'dark' | 'outline' | 'highlight' | 'outline-inverse'
export type ButtonSize = 'm' | 's'

interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
}

type ActionButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: undefined
    loading?: boolean
  }

type LinkButtonProps = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & { href: string; loading?: never }

type ButtonProps = ActionButtonProps | LinkButtonProps

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-action-primary text-text-primary border-transparent hover:bg-[color-mix(in_srgb,var(--color-action-primary)_88%,var(--color-ink))]',
  dark: 'bg-bg-inverse text-text-inverse border-transparent hover:bg-[color-mix(in_srgb,var(--color-bg-inverse)_82%,var(--color-bg-page))]',
  outline: 'border-border-strong text-text-primary hover:bg-fill-subtle',
  highlight:
    'bg-accent-live text-text-primary border-transparent hover:bg-[color-mix(in_srgb,var(--color-accent-live)_88%,var(--color-ink))]',
  'outline-inverse':
    'bg-bg-inverse border-border-inverse-strong text-text-inverse hover:bg-[color-mix(in_srgb,var(--color-bg-inverse)_82%,var(--color-bg-page))]',
}

const sizeClasses: Record<ButtonSize, string> = {
  m: 'button-m px-lg py-md',
  s: 'button-s min-h-11 px-md py-sm',
}

export function Button({
  variant = 'primary',
  size = 'm',
  loading = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = classNames(
    'motion-press relative inline-flex cursor-pointer items-center justify-center gap-xs rounded-sm border select-none active:scale-[0.97]',
    'disabled:pointer-events-none disabled:opacity-50 aria-busy:pointer-events-none',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  const content = (
    <>
      {loading && (
        <>
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span className="block size-4 animate-spin-button rounded-full border-2 border-current border-t-transparent" />
          </span>
          <span className="sr-only">Enviando</span>
        </>
      )}
      <span className={classNames('inline-flex items-center gap-xs', loading && 'opacity-0')}>
        {children}
      </span>
    </>
  )

  if (rest.href !== undefined) {
    return (
      <Link {...rest} className={classes}>
        {content}
      </Link>
    )
  }

  const { type = 'button', disabled, onClick, ...buttonProps } = rest

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault()
      return
    }
    onClick?.(event)
  }

  return (
    <button
      {...buttonProps}
      type={type}
      className={classes}
      disabled={loading ? undefined : disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      onClick={handleClick}
    >
      {content}
    </button>
  )
}
