import { type Ref, type SelectHTMLAttributes, useId } from 'react'

import { classNames } from '@/utils/class-name.handlers'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  placeholder: string
  hint?: string
  error?: string
  ref?: Ref<HTMLSelectElement>
}

export function Select({
  label,
  placeholder,
  hint,
  error,
  id,
  className,
  required,
  children,
  ref,
  ...props
}: SelectProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const hintId = `${selectId}-hint`
  const errorId = `${selectId}-error`
  const describedBy = [error ? errorId : null, hint && !error ? hintId : null].filter(Boolean).join(' ')

  return (
    <div className={classNames('flex w-full flex-col gap-xs', className)}>
      <label htmlFor={selectId} className="label-m text-text-primary">
        {label}
      </label>
      <div
        className={classNames(
          'motion-color relative flex min-h-11 items-center rounded-sm border bg-bg-surface has-[:disabled]:opacity-50',
          'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink',
          error
            ? 'border-action-primary shadow-[inset_0_0_0_1px_var(--color-action-primary)]'
            : 'border-border-strong focus-within:border-ink',
        )}
      >
        <select
          ref={ref}
          id={selectId}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={classNames(
            'body-m min-h-11 min-w-0 flex-1 cursor-pointer appearance-none bg-transparent py-md pr-2xl pl-md outline-none',
            'disabled:cursor-not-allowed',
            props.value === '' ? 'text-text-secondary' : 'text-text-primary',
          )}
          {...props}
        >
          <option value="">{placeholder}</option>
          {children}
        </select>
        <svg
          viewBox="0 0 12 12"
          className="pointer-events-none absolute right-md size-3 text-text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
        </svg>
      </div>
      {error && (
        <p
          id={errorId}
          role="alert"
          className="body-s flex animate-fade-in items-start gap-xs text-text-primary"
        >
          <span className="mt-2xs block size-2 shrink-0 rounded-full bg-feedback-danger" aria-hidden="true" />
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={hintId} className="body-s text-text-secondary">
          {hint}
        </p>
      )}
    </div>
  )
}
