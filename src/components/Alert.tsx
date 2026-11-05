import { type ReactNode, type Ref, useId } from 'react'

import { classNames } from '@/utils/class-name.handlers'

type AlertType = 'danger'

interface AlertProps {
  type: AlertType
  title: string
  titleAs?: 'h2' | 'h3'
  children: ReactNode
  className?: string
  ref?: Ref<HTMLDivElement>
}

const typeClasses: Record<AlertType, string> = {
  danger: 'bg-feedback-danger text-text-primary',
}

export function Alert({ type, title, titleAs: Title = 'h3', children, className, ref }: AlertProps) {
  const titleId = useId()
  const textId = useId()

  return (
    <div
      ref={ref}
      role="group"
      tabIndex={-1}
      aria-labelledby={titleId}
      aria-describedby={textId}
      className={classNames('flex gap-sm rounded-sm p-md', typeClasses[type], className)}
    >
      <span
        aria-hidden="true"
        className="button-s flex size-6 shrink-0 items-center justify-center rounded-full bg-bg-inverse text-feedback-danger"
      >
        !
      </span>
      <div className="min-w-0">
        <Title id={titleId} className="title-s break-words">
          {title}
        </Title>
        <p id={textId} className="body-s mt-2xs break-words">
          {children}
        </p>
      </div>
    </div>
  )
}
