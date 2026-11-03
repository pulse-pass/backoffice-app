import { useId } from 'react'

import { Button } from '@/components/Button'
import { StatusBadge } from '@/components/StatusBadge'
import type { GetInternalLegalPersonResponse } from '@/services/legal-person/legal-person.types'
import { getBadgeStatus } from '@/services/organization/organization.handlers'
import type { ListInternalOrganizationsResponse } from '@/services/organization/organization.types'
import { formatCNPJ } from '@/utils/cnpj.handlers'
import { formatCPF } from '@/utils/cpf.handlers'
import { formatDate, formatTime } from '@/utils/date.handlers'
import { formatPhone } from '@/utils/phone.handlers'

interface OrganizerDetailProps {
  id: string
  organization: ListInternalOrganizationsResponse
  legalPerson: GetInternalLegalPersonResponse | null
  isLoading: boolean
  hasError: boolean
  onRetry: () => void
}

interface DetailSectionsProps {
  organization: ListInternalOrganizationsResponse
  legalPerson: GetInternalLegalPersonResponse
}

const formatDateAtTime = (value: string): string => `${formatDate(value)} às ${formatTime(value)}`

function DetailSections({ organization, legalPerson }: DetailSectionsProps) {
  const companyTitleId = useId()
  const ownerTitleId = useId()

  return (
    <>
      <section aria-labelledby={companyTitleId} className="border-t border-border-subtle pt-lg">
        <h3 id={companyTitleId} className="mono-eyebrow text-text-secondary">
          Empresa
        </h3>
        <dl className="mt-md flex flex-col gap-md">
          <div className="min-w-0">
            <dt className="body-s text-text-secondary">CNPJ</dt>
            <dd className="mono-m mt-2xs text-text-primary">{formatCNPJ(organization.document_number)}</dd>
          </div>
          <div className="min-w-0">
            <dt className="body-s text-text-secondary">Razão social</dt>
            <dd className="label-m mt-2xs break-words text-text-primary">{legalPerson.name}</dd>
          </div>
          <div className="min-w-0">
            <dt className="body-s text-text-secondary">Contato</dt>
            <dd className="mono-m mt-2xs flex flex-col gap-2xs break-all text-text-primary">
              <span>{legalPerson.email}</span>
              {legalPerson.phone_numbers.map((phone, index) => (
                <span key={`${index}-${phone.country_code}${phone.area_code}${phone.number}`}>
                  {formatPhone(`${phone.area_code}${phone.number}`)}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </section>
      <section aria-labelledby={ownerTitleId} className="border-t border-border-subtle pt-lg">
        <h3 id={ownerTitleId} className="mono-eyebrow text-text-secondary">
          Dona da conta
        </h3>
        <dl className="mt-md flex flex-col gap-md">
          <div className="min-w-0">
            <dt className="body-s text-text-secondary">Nome</dt>
            <dd className="label-m mt-2xs break-words text-text-primary">{legalPerson.owner.name}</dd>
          </div>
          <div className="min-w-0">
            <dt className="body-s text-text-secondary">CPF</dt>
            <dd className="mono-m mt-2xs text-text-primary">
              {formatCPF(legalPerson.owner.document_number)}
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="body-s text-text-secondary">E-mail</dt>
            <dd className="mono-m mt-2xs break-all text-text-primary">{legalPerson.owner.email}</dd>
          </div>
        </dl>
      </section>
    </>
  )
}

export function OrganizerDetail({
  id,
  organization,
  legalPerson,
  isLoading,
  hasError,
  onRetry,
}: OrganizerDetailProps) {
  const titleId = useId()

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="flex flex-col gap-lg rounded-sm border-2 border-accent-selected bg-bg-surface p-md md:p-lg"
    >
      <header className="flex flex-col gap-md">
        <p className="mono-eyebrow flex flex-col gap-2xs text-text-secondary">
          <span>Criado em {formatDateAtTime(organization.created_at)}</span>
          <span>Última atualização {formatDateAtTime(organization.updated_at)}</span>
        </p>
        <h2 id={titleId} className="title-l break-words text-text-primary">
          {organization.name}
        </h2>
        <StatusBadge status={getBadgeStatus(organization.organization_status)} />
      </header>
      {isLoading && (
        <div role="status" className="sr-only">
          Carregando
        </div>
      )}
      {hasError && (
        <div className="flex flex-col items-start gap-md border-t border-border-subtle pt-lg">
          <p className="body-s text-text-secondary">Não foi possível carregar os dados do cadastro.</p>
          <Button variant="dark" size="s" onClick={onRetry}>
            Tentar de novo
          </Button>
        </div>
      )}
      {legalPerson && <DetailSections organization={organization} legalPerson={legalPerson} />}
    </section>
  )
}
