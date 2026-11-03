import { type ChangeEvent, useId } from 'react'

import type { OrganizationStatus } from '@/services/organization/organization.types'

interface StatusFilterOption {
  value: OrganizationStatus
  label: string
}

interface StatusFilterProps {
  options: StatusFilterOption[]
  value: OrganizationStatus
  onChange: (value: OrganizationStatus) => void
}

export function StatusFilter({ options, value, onChange }: StatusFilterProps) {
  const selectId = useId()

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const option = options.find((item) => item.value === event.target.value)
    if (option) onChange(option.value)
  }

  return (
    <div className="relative flex min-h-11 w-fit items-center gap-xs rounded-sm bg-bg-inverse px-md text-text-inverse focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink">
      <label htmlFor={selectId} className="body-s text-text-inverse-secondary">
        Situação:
      </label>
      <select
        id={selectId}
        value={value}
        className="body-m min-h-11 cursor-pointer appearance-none bg-transparent pr-lg text-text-inverse outline-none"
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-text-primary">
            {option.label}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 12 12"
        className="pointer-events-none absolute right-md size-3 text-text-inverse"
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
  )
}
