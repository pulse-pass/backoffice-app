import { classNames } from '@/utils/class-name.handlers'

interface ToastProps {
  type: 'error' | 'success'
  message: string
  onClose: () => void
}

export function Toast({ type, message, onClose }: ToastProps) {
  return (
    <div
      className={classNames(
        'flex w-full items-start gap-sm rounded-sm p-md shadow-[0_8px_24px_var(--color-border-subtle)]',
        type === 'error' ? 'bg-action-primary text-text-primary' : 'bg-bg-inverse text-text-inverse',
      )}
    >
      <span
        className={classNames(
          'flex size-7 shrink-0 items-center justify-center rounded-full text-base font-semibold',
          type === 'error' ? 'bg-ink text-action-primary' : 'bg-accent-live text-ink',
        )}
        aria-hidden="true"
      >
        {type === 'error' ? '!' : '✓'}
      </span>
      <p className="body-s min-w-0 flex-1 self-center break-words">
        <span className="sr-only">{type === 'error' ? 'Erro: ' : 'Sucesso: '}</span>
        {message}
      </p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar aviso"
        className="-m-sm flex size-11 shrink-0 cursor-pointer items-center justify-center motion-color rounded-sm hover:bg-fill-subtle"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  )
}
