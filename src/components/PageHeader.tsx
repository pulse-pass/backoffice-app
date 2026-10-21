interface PageHeaderProps {
  eyebrow: string
  title: string
}

export function PageHeader({ eyebrow, title }: PageHeaderProps) {
  return (
    <header>
      <p className="mono-eyebrow text-text-secondary">{eyebrow}</p>
      <h1 className="display-m md:display-l mt-xs break-words">{title}</h1>
    </header>
  )
}
