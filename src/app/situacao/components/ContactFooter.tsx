interface ContactFooterProps {
  isRejected: boolean
  cnpj: string
}

export function ContactFooter({ isRejected, cnpj }: ContactFooterProps) {
  return (
    <footer className="mt-lg">
      <p className="body-s text-text-secondary">
        {isRejected ? 'Dúvidas sobre a análise?' : 'Precisa corrigir algum dado?'} Escreva para{' '}
        <a
          href="mailto:organizadores@pulsepass.com.br"
          className="motion-color relative underline underline-offset-4 after:absolute after:-inset-y-sm after:inset-x-0 hover:text-text-primary"
        >
          organizadores@pulsepass.com.br
        </a>{' '}
        citando o CNPJ <span className="mono-s">{cnpj}</span>.
      </p>
    </footer>
  )
}
