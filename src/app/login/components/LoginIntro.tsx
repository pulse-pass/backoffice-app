const ROLES = [
  { name: 'Organizador', description: 'Eventos, setores, lotes e o painel de vendas' },
  { name: 'Dono da conta', description: 'Tudo do organizador, mais a equipe da empresa' },
  { name: 'Administrador', description: 'Organizadores, métricas ao vivo e auditoria' },
]

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
      <dl className="mt-xl hidden grid-cols-[auto_1fr] items-baseline gap-x-xl gap-y-md lg:grid">
        {ROLES.map((role) => (
          <div key={role.name} className="col-span-2 grid grid-cols-subgrid items-baseline">
            <dt className="mono-eyebrow">{role.name}</dt>
            <dd className="body-s text-text-inverse-secondary">{role.description}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
