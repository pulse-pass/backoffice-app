import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { EmptyState } from '@/components/EmptyState'
import { PublicHeader } from '@/components/PublicHeader'
import { formatCNPJ } from '@/utils/cnpj.handlers'

import { ContactFooter } from './components/ContactFooter'
import { StatusHero } from './components/StatusHero'
import { StatusTimeline } from './components/StatusTimeline'
import { SubmittedData } from './components/SubmittedData'
import type { PageViewProps } from './page.types'

export function PageView({
  status,
  isRetrying,
  organization,
  legalPerson,
  isLoggingOut,
  onLogout,
  onRetry,
}: PageViewProps) {
  if (status === 'loading') {
    return (
      <div role="status" className="sr-only">
        Carregando
      </div>
    )
  }

  const isRejected = organization?.organization_status === 'REJECTED'

  return (
    <div className="flex min-h-dvh flex-col">
      <PublicHeader
        action={
          <Button variant="outline" size="s" loading={isLoggingOut} onClick={onLogout}>
            Sair
          </Button>
        }
      />
      <main className="mx-auto w-full max-w-(--container-status) px-md py-lg md:py-2xl">
        {status === 'error' || !organization || !legalPerson ? (
          <EmptyState
            title="Não foi possível carregar a situação do cadastro."
            message="Confira a conexão e tente de novo."
            titleAs="h1"
            action={
              <Button variant="dark" size="s" loading={isRetrying} onClick={onRetry}>
                Tentar de novo
              </Button>
            }
          />
        ) : (
          <>
            <div className="overflow-hidden rounded-sm border border-border-subtle bg-bg-surface">
              <StatusHero
                isRejected={isRejected}
                hasReason={Boolean(organization.organization_rejection_reason_description)}
                createdAt={organization.created_at}
                companyName={organization.name}
              />
              <div className="flex flex-col gap-lg px-md py-lg md:px-xl">
                {isRejected && organization.organization_rejection_reason_description && (
                  <Alert type="danger" title="Motivo informado pela administração" titleAs="h2">
                    {organization.organization_rejection_reason_description}
                  </Alert>
                )}
                <StatusTimeline
                  isRejected={isRejected}
                  createdAt={organization.created_at}
                  updatedAt={organization.updated_at}
                />
                <SubmittedData organization={organization} legalPerson={legalPerson} />
              </div>
            </div>
            <ContactFooter isRejected={isRejected} cnpj={formatCNPJ(organization.document_number)} />
          </>
        )}
        <Button
          variant="outline"
          loading={isLoggingOut}
          onClick={onLogout}
          className="mt-md w-full md:hidden"
        >
          Sair
        </Button>
      </main>
    </div>
  )
}
