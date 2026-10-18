import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from 'react'

import { classNames } from '@/utils/class-name.handlers'

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string
  hint?: string
  error?: string
  numeric?: boolean
  action?: ReactNode
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, hint, error, numeric = false, action, id, className, required, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`
  const describedBy = [error ? errorId : null, hint && !error ? hintId : null].filter(Boolean).join(' ')

  return (
    <div className={classNames('flex w-full flex-col gap-xs', className)}>
      <label htmlFor={inputId} className="label-m text-text-primary">
        {label}
      </label>
      <div
        className={classNames(
          'motion-color flex items-center justify-between rounded-sm border bg-bg-surface',
          'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink',
          error
            ? 'border-action-primary shadow-[inset_0_0_0_1px_var(--color-action-primary)]'
            : 'border-border-strong focus-within:border-ink',
        )}
      >
        <input
          ref={ref}
          id={inputId}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={classNames(
            'min-w-0 flex-1 bg-transparent py-md pl-md text-text-primary outline-none placeholder:text-text-secondary',
            !action && 'pr-md',
            numeric ? 'mono-m' : 'body-m',
          )}
          {...props}
        />
        {action && <div className="flex items-center pr-sm pl-xs">{action}</div>}
      </div>
      {error && (
        <p id={errorId} className="body-s flex animate-fade-in items-start gap-xs text-text-primary">
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
})
