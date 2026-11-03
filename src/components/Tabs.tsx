'use client'

import { type KeyboardEvent, useRef } from 'react'

import { classNames } from '@/utils/class-name.handlers'

interface TabOption<T extends string> {
  value: T
  label: string
}

interface TabsProps<T extends string> {
  id: string
  label: string
  options: TabOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}

const KEY_TARGETS: Record<string, (index: number, last: number) => number> = {
  ArrowLeft: (index, last) => (index === 0 ? last : index - 1),
  ArrowRight: (index, last) => (index === last ? 0 : index + 1),
  End: (_index, last) => last,
  Home: () => 0,
}

export function Tabs<T extends string>({ id, label, options, value, onChange, className }: TabsProps<T>) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const getTarget = KEY_TARGETS[event.key]
    if (!getTarget) return
    const target = getTarget(index, options.length - 1)
    event.preventDefault()
    tabRefs.current[target]?.focus()
    onChange(options[target].value)
  }

  return (
    <div role="tablist" aria-label={label} className={classNames('flex gap-lg', className)}>
      {options.map((option, index) => {
        const isActive = option.value === value
        return (
          <button
            key={option.value}
            ref={(element) => {
              tabRefs.current[index] = element
            }}
            id={`${id}-tab-${option.value}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`${id}-panel`}
            tabIndex={isActive ? 0 : -1}
            className={classNames(
              'motion-color label-m min-h-11 cursor-pointer border-b-2 px-2xs select-none hover:text-text-primary',
              isActive ? 'border-action-primary text-text-primary' : 'border-transparent text-text-secondary',
            )}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
