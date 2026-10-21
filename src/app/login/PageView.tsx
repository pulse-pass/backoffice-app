import { Button } from '@/components/Button'
import { PublicHeader } from '@/components/PublicHeader'

import { LoginCard } from './components/LoginCard'
import { LoginIntro } from './components/LoginIntro'
import type { PageViewProps } from './page.types'

export function PageView(props: PageViewProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <PublicHeader
        action={
          <Button variant="outline" size="s" href="/cadastro">
            Cadastrar empresa
          </Button>
        }
      />
      <main className="grid flex-1 lg:grid-cols-[3fr_4fr]">
        <LoginIntro />
        <div className="flex items-start justify-center px-md py-lg lg:items-center lg:px-3xl lg:py-3xl">
          <LoginCard {...props} />
        </div>
      </main>
    </div>
  )
}
