import { classNames } from '@/utils/class-name.handlers'

interface RegistrationIntroProps {
  companyValid: boolean
  ownerValid: boolean
}

interface StepProps {
  number: string
  label: string
  filled: boolean
  muted?: boolean
}

function Step({ number, label, filled, muted = false }: StepProps) {
  return (
    <li className="flex items-center gap-sm">
      <span
        className={classNames(
          'mono-s flex size-8 shrink-0 items-center justify-center rounded-full border',
          filled
            ? 'border-bg-inverse bg-bg-inverse text-text-inverse'
            : 'border-border-strong text-text-secondary',
        )}
      >
        {number}
      </span>
      <span className={classNames('label-m', muted ? 'text-text-secondary' : 'text-text-primary')}>
        {label}
        <span className="sr-only">{filled ? ' (concluída)' : ' (pendente)'}</span>
      </span>
    </li>
  )
}

export function RegistrationIntro({ companyValid, ownerValid }: RegistrationIntroProps) {
  return (
    <div className="flex flex-col">
      <p className="mono-eyebrow text-text-secondary">Cadastro de organizador</p>
      <h1 className="display-m lg:display-l mt-md text-text-primary">Venda seus shows aqui.</h1>
      <p className="body-m mt-md text-text-secondary lg:mt-lg">
        Cadastre a empresa e a pessoa responsável. A administração da PulsePass analisa o pedido e, até a
        aprovação, a conta fica pendente.
      </p>
      <ol className="mt-xl hidden flex-col gap-sm lg:flex" aria-label="Etapas do cadastro">
        <Step number="01" label="Dados da empresa" filled={companyValid} />
        <Step number="02" label="Responsável pela conta" filled={ownerValid} />
        <Step number="03" label="Análise da administração" filled={false} muted />
      </ol>
    </div>
  )
}
