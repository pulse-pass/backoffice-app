import type { ReactNode } from 'react'

interface EmptyStateProps {
  message: string
  title?: string
  action?: ReactNode
  titleAs?: 'h1' | 'h2' | 'h3'
}

export function EmptyState({ message, title, action, titleAs: Title = 'h2' }: EmptyStateProps) {
  if (!title && !action) {
    return (
      <div className="rounded-sm border border-dashed border-border-strong px-md py-2xl text-center">
        <p className="body-m text-text-secondary">{message}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start gap-md rounded-sm border border-dashed border-border-strong bg-bg-surface p-lg">
      {title && <Title className="title-s text-text-primary">{title}</Title>}
      <p className="body-s text-text-secondary">{message}</p>
      {action}
    </div>
  )
}
