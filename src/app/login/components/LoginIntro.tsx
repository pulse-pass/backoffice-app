const DOT_COUNT = 22

export function LoginIntro() {
  return (
    <section className="flex flex-col bg-bg-inverse px-md py-lg text-text-inverse lg:px-3xl lg:py-3xl">
      <p className="mono-eyebrow text-text-inverse-secondary">PulsePass · Área de bastidores</p>
      <h1 className="display-m lg:display-xl mt-sm lg:mt-lg">Bastidor do show.</h1>
      <p className="body-m lg:body-l mt-md text-text-inverse-secondary lg:mt-xl">
        As produtoras montam eventos, setores e lotes. A administração aprova quem vende e acompanha a
        plataforma ao vivo.
      </p>
      <div className="mt-xl hidden justify-between lg:flex" aria-hidden="true">
        {Array.from({ length: DOT_COUNT }, (_, index) => (
          <span key={index} className="block size-1 rounded-full bg-text-inverse" />
        ))}
      </div>
      <div className="mt-xl hidden lg:block">
        <p className="mono-eyebrow text-text-inverse">Primeiro acesso</p>
        <p className="body-s mt-sm max-w-(--container-card) text-text-inverse-secondary">
          Cadastre a sua empresa para começar a vender. Quem faz parte da equipe entra com o convite que chega
          por e-mail.
        </p>
      </div>
    </section>
  )
}
