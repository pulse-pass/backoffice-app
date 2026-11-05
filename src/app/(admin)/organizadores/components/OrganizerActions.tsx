import { useEffect, useRef } from 'react'

import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { Select } from '@/components/Select'
import type { ListInternalOrganizationsResponse } from '@/services/organization/organization.types'

import type { OrganizerActionsProps } from '../page.types'

interface OrganizerActionsComponentProps extends OrganizerActionsProps {
  organization: ListInternalOrganizationsResponse
}

export function OrganizerActions({
  organization,
  actions,
  rejectionReasons,
  onRejectionReasonChange,
  onRetryRejectionReasons,
  onApprove,
  onReject,
  onRequestRemoval,
  onCancelRemoval,
  onConfirmRemoval,
}: OrganizerActionsComponentProps) {
  const selectRef = useRef<HTMLSelectElement>(null)
  const alertRef = useRef<HTMLDivElement>(null)
  const confirmationRef = useRef<HTMLDivElement>(null)
  const removeButtonRef = useRef<HTMLButtonElement>(null)
  const shouldRestoreFocusRef = useRef(false)
  const isBusy = actions.pendingAction !== null
  const pendingAction =
    actions.pendingOrganizationKey === organization.organization_key ? actions.pendingAction : null
  const hasNoReasons =
    rejectionReasons.hasError || (rejectionReasons.hasLoaded && rejectionReasons.items.length === 0)

  useEffect(() => {
    if (actions.isConfirmingRemoval) {
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      alertRef.current?.focus({ preventScroll: true })
      confirmationRef.current?.scrollIntoView({
        block: 'nearest',
        behavior: isReducedMotion ? 'auto' : 'smooth',
      })
      return
    }
    if (shouldRestoreFocusRef.current) {
      shouldRestoreFocusRef.current = false
      removeButtonRef.current?.focus()
    }
  }, [actions.isConfirmingRemoval])

  const handleReject = () => {
    onReject()
    if (!actions.rejectionReason) selectRef.current?.focus()
  }

  const handleCancelRemoval = () => {
    shouldRestoreFocusRef.current = true
    onCancelRemoval()
  }

  if (organization.organization_status === 'PENDING') {
    return (
      <section aria-label="Ações" className="flex flex-col gap-md border-t border-border-subtle pt-lg">
        {hasNoReasons ? (
          <div className="flex flex-col items-start gap-md">
            <p className="body-s text-text-secondary">
              {rejectionReasons.hasError
                ? 'Não foi possível carregar os motivos.'
                : 'Nenhum motivo de reprovação disponível.'}
            </p>
            <Button variant="dark" size="s" onClick={onRetryRejectionReasons}>
              Tentar de novo
            </Button>
          </div>
        ) : (
          <Select
            ref={selectRef}
            label="Motivo (obrigatório para reprovar)"
            placeholder={rejectionReasons.isLoading ? 'Carregando motivos' : 'Selecione o motivo'}
            value={actions.rejectionReason}
            error={actions.rejectionReasonError ?? undefined}
            disabled={rejectionReasons.isLoading || isBusy}
            onChange={onRejectionReasonChange}
          >
            {rejectionReasons.items.map((reason) => (
              <option key={reason.organization_rejection_reason} value={reason.organization_rejection_reason}>
                {reason.organization_rejection_reason_description}
              </option>
            ))}
          </Select>
        )}
        <div className="flex flex-col gap-sm @min-[22rem]:flex-row">
          <Button
            variant="primary"
            className="w-full @min-[22rem]:flex-1"
            loading={pendingAction === 'approve'}
            loadingLabel="Aprovando"
            disabled={isBusy}
            onClick={onApprove}
          >
            Aprovar
            <svg
              viewBox="0 0 16 16"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m3 8.5 3.5 3.5L13 4.5" />
            </svg>
          </Button>
          <Button
            variant="outline"
            className="w-full @min-[22rem]:flex-1"
            loading={pendingAction === 'reject'}
            loadingLabel="Reprovando"
            disabled={isBusy || rejectionReasons.isLoading || hasNoReasons}
            onClick={handleReject}
          >
            Reprovar
            <svg
              viewBox="0 0 16 16"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="m4 4 8 8M12 4l-8 8" />
            </svg>
          </Button>
        </div>
        <p className="body-s border-l-2 border-accent-live pl-md text-text-secondary">
          Aprovar libera o acesso da dona. Reprovar mantém a conta bloqueada e mostra o motivo na tela de
          situação.
        </p>
      </section>
    )
  }

  if (organization.organization_status === 'APPROVED') {
    return (
      <section aria-label="Ações" className="flex flex-col gap-md border-t border-border-subtle pt-lg">
        {actions.isConfirmingRemoval ? (
          <div ref={confirmationRef} className="flex animate-alert-in scroll-my-md flex-col gap-md">
            <Alert ref={alertRef} type="danger" title={`Remover ${organization.name}?`}>
              A dona deixa de entrar no backoffice. A empresa fica na aba Removidos.
            </Alert>
            <div className="flex flex-col gap-sm @min-[22rem]:flex-row">
              <Button
                variant="outline"
                className="w-full @min-[22rem]:flex-1"
                disabled={isBusy}
                onClick={handleCancelRemoval}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                className="w-full @min-[22rem]:flex-1"
                loading={pendingAction === 'delete'}
                loadingLabel="Removendo"
                disabled={isBusy}
                onClick={onConfirmRemoval}
              >
                Confirmar remoção
                <svg
                  viewBox="0 0 16 16"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 8h10m-4-4 4 4-4 4" />
                </svg>
              </Button>
            </div>
          </div>
        ) : (
          <Button
            ref={removeButtonRef}
            variant="outline"
            className="w-full @min-[22rem]:w-fit"
            disabled={isBusy}
            onClick={onRequestRemoval}
          >
            Remover empresa
          </Button>
        )}
      </section>
    )
  }

  return null
}
