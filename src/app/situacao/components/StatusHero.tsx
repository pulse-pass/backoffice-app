import { DotRow } from '@/components/DotRow'
import { StatusBadge } from '@/components/StatusBadge'
import { formatDate } from '@/utils/date.handlers'

interface StatusHeroProps {
  isRejected: boolean
  hasReason: boolean
  createdAt: string
  companyName: string
}

export function StatusHero({ isRejected, hasReason, createdAt, companyName }: StatusHeroProps) {
  return (
    <section className="bg-bg-inverse px-md py-lg text-text-inverse md:px-xl">
      <p className="mono-eyebrow text-text-inverse-secondary">Enviado em {formatDate(createdAt)}</p>
      <h1 className="display-m md:display-l mt-md">
        {isRejected ? 'Cadastro reprovado.' : 'Cadastro em análise.'}
      </h1>
      <StatusBadge status={isRejected ? 'rejected' : 'pending'} className="mt-md" />
      <p className="body-m mt-md text-text-inverse-secondary">
        {isRejected
          ? `A administração da PulsePass analisou os dados da ${companyName} e não aprovou o cadastro.${hasReason ? ' O motivo está abaixo.' : ''} Sem aprovação, o acesso às funções de organizador continua bloqueado.`
          : `A administração da PulsePass está conferindo os dados da ${companyName}. Até lá, o acesso às funções de organizador fica bloqueado.`}
      </p>
      <DotRow className="mt-lg" />
    </section>
  )
}
