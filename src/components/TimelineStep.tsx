import type { ReactNode } from 'react'

import { classNames } from '@/utils/class-name.handlers'

type TimelineStepState = 'done' | 'current' | 'rejected' | 'pending'

interface TimelineStepProps {
  state: TimelineStepState
  title: string
  description: string
  time?: string
  dateTime?: string
  hasLine: boolean
  children?: ReactNode
}

interface StepStyle {
  stateText: string
  marker: ReactNode
  titleClasses: string
  lineClasses: string
}

const STEPS: Record<TimelineStepState, StepStyle> = {
  done: {
    stateText: 'Concluído',
    marker: (
      <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-bg-inverse">
        <svg
          viewBox="0 0 12 12"
          className="size-3 text-text-inverse"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m2.5 6.2 2.3 2.3 4.7-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    ),
    titleClasses: 'title-s text-text-primary',
    lineClasses: 'bg-bg-inverse',
  },
  current: {
    stateText: 'Em andamento',
    marker: (
      <span
        aria-hidden="true"
        className="flex size-9 items-center justify-center rounded-full border-2 border-ink bg-accent-live"
      >
        <span className="block size-2 rounded-full bg-bg-inverse" />
      </span>
    ),
    titleClasses: 'title-m text-text-primary',
    lineClasses: 'bg-border-strong',
  },
  rejected: {
    stateText: 'Reprovado',
    marker: (
      <span
        aria-hidden="true"
        className="flex size-9 items-center justify-center rounded-full bg-feedback-danger"
      >
        <svg
          viewBox="0 0 12 12"
          className="size-3 text-text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m3 3 6 6M9 3 3 9" strokeLinecap="round" />
        </svg>
      </span>
    ),
    titleClasses: 'title-m text-text-primary',
    lineClasses: 'bg-border-strong',
  },
  pending: {
    stateText: 'Pendente',
    marker: <span aria-hidden="true" className="block size-7 rounded-full border-2 border-border-strong" />,
    titleClasses: 'title-s text-text-secondary',
    lineClasses: 'bg-border-strong',
  },
}

function renderTime(time?: string, dateTime?: string) {
  if (time === undefined) {
    return (
      <>
        <span aria-hidden="true">—</span>
        <span className="sr-only">sem data</span>
      </>
    )
  }
  if (dateTime === undefined) return time
  return <time dateTime={dateTime}>{time}</time>
}

export function TimelineStep({
  state,
  title,
  description,
  time,
  dateTime,
  hasLine,
  children,
}: TimelineStepProps) {
  const step = STEPS[state]

  return (
    <li aria-current={state === 'current' ? 'step' : undefined} className="flex gap-md">
      <div className="flex w-9 shrink-0 flex-col items-center">
        {step.marker}
        {hasLine && <span aria-hidden="true" className={classNames('w-0.5 flex-1', step.lineClasses)} />}
      </div>
      <div className={classNames('grid min-w-0 flex-1 grid-cols-[1fr_auto] gap-x-md', hasLine && 'pb-lg')}>
        <div className="min-w-0">
          <p className={step.titleClasses}>
            <span className="sr-only">{step.stateText}: </span>
            {title}
          </p>
          <p className="body-s mt-2xs text-text-secondary">{description}</p>
          {children}
        </div>
        <p className="mono-s pt-2xs text-text-secondary">{renderTime(time, dateTime)}</p>
      </div>
    </li>
  )
}
