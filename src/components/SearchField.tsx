import type { InputHTMLAttributes, Ref } from 'react'

import { classNames } from '@/utils/class-name.handlers'

interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label: string
  ref?: Ref<HTMLInputElement>
}

export function SearchField({ label, className, ref, ...props }: SearchFieldProps) {
  return (
    <div
      className={classNames(
        'motion-color flex w-full items-center gap-xs rounded-sm border border-border-strong bg-bg-surface px-md',
        'focus-within:border-ink focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink',
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5 shrink-0 text-text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4.5 4.5" />
      </svg>
      <input
        ref={ref}
        type="search"
        aria-label={label}
        autoComplete="off"
        enterKeyHint="search"
        className="body-m min-w-0 flex-1 bg-transparent py-md text-text-primary outline-none placeholder:text-text-secondary"
        {...props}
      />
    </div>
  )
}
