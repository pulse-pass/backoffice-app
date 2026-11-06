import type { ListLegalPersonCollaboratorsResponse } from '@/services/legal-person-collaborator/legal-person-collaborator.types'
import type { ListOrganizationsResponse } from '@/services/organization/organization.types'
import type { PersonLegalPersonResponse } from '@/services/person/person.types'
import { formatCNPJ } from '@/utils/cnpj.handlers'
import { formatCPF } from '@/utils/cpf.handlers'

interface SubmittedDataProps {
  organization: ListOrganizationsResponse
  legalPerson: PersonLegalPersonResponse
  owner: ListLegalPersonCollaboratorsResponse
}

export function SubmittedData({ organization, legalPerson, owner }: SubmittedDataProps) {
  return (
    <section aria-labelledby="submitted-data-title" className="border-t border-border-subtle pt-lg">
      <h2 id="submitted-data-title" className="mono-eyebrow text-text-secondary">
        Dados enviados
      </h2>
      <dl className="mt-md grid gap-md md:grid-cols-2 md:gap-x-lg">
        <div className="min-w-0">
          <dt className="body-s text-text-secondary">Razão social</dt>
          <dd className="label-m mt-2xs break-words text-text-primary">{organization.name}</dd>
        </div>
        <div className="min-w-0">
          <dt className="body-s text-text-secondary">CNPJ</dt>
          <dd className="mono-m mt-2xs text-text-primary">{formatCNPJ(organization.document_number)}</dd>
        </div>
        <div className="min-w-0">
          <dt className="body-s text-text-secondary">Responsável</dt>
          <dd className="label-m mt-2xs break-words text-text-primary">
            {owner.natural_person.person.name} ·{' '}
            <span className="mono-s">{formatCPF(owner.natural_person.person.document_number)}</span>
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="body-s text-text-secondary">E-mail</dt>
          <dd className="mono-m mt-2xs break-all text-text-primary">{legalPerson.email}</dd>
        </div>
      </dl>
    </section>
  )
}
