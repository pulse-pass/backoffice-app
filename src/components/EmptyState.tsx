interface EmptyStateProps {
  message: string
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="rounded-sm border border-dashed border-border-strong px-md py-2xl text-center">
      <p className="body-m text-text-secondary">{message}</p>
    </div>
  )
}
