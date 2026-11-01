import { TimelineStep } from '@/components/TimelineStep'
import { formatDate, formatDateTime, formatTime } from '@/utils/date.handlers'

interface StatusTimelineProps {
  isRejected: boolean
  createdAt: string
  updatedAt: string
}

export function StatusTimeline({ isRejected, createdAt, updatedAt }: StatusTimelineProps) {
  return (
    <ol role="list">
      <TimelineStep
        state="done"
        title="Cadastro enviado"
        description="Empresa e responsável registrados."
        time={formatDateTime(createdAt)}
        dateTime={createdAt}
        hasLine
      />
      {isRejected ? (
        <TimelineStep
          state="rejected"
          title="Análise da administração"
          description={`Reprovado em ${formatDate(updatedAt)} às ${formatTime(updatedAt)}.`}
          time={formatDateTime(updatedAt)}
          dateTime={updatedAt}
          hasLine
        />
      ) : (
        <TimelineStep
          state="current"
          title="Análise da administração"
          description="A administração confere os dados da empresa."
          time="agora"
          hasLine
        >
          <div aria-hidden="true" className="mt-xs flex gap-2xs">
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="block h-0.5 w-6 bg-fill-muted" />
            <span className="block h-0.5 w-6 bg-border-strong" />
          </div>
        </TimelineStep>
      )}
      <TimelineStep
        state="pending"
        title="Acesso liberado"
        description={
          isRejected
            ? 'Liberado só após um novo cadastro aprovado.'
            : 'Você e a sua equipe passam a criar eventos.'
        }
        hasLine={false}
      />
    </ol>
  )
}
