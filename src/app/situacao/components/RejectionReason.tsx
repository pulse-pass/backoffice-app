interface RejectionReasonProps {
  description: string
}

export function RejectionReason({ description }: RejectionReasonProps) {
  return (
    <section
      aria-labelledby="rejection-reason-title"
      className="flex gap-sm rounded-sm bg-feedback-danger p-md text-text-primary"
    >
      <span
        aria-hidden="true"
        className="button-s flex size-6 shrink-0 items-center justify-center rounded-full bg-bg-inverse text-feedback-danger"
      >
        !
      </span>
      <div className="min-w-0">
        <h2 id="rejection-reason-title" className="title-s">
          Motivo informado pela administração
        </h2>
        <p className="body-s mt-2xs break-words">{description}</p>
      </div>
    </section>
  )
}
