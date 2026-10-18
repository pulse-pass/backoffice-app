# backoffice-app

Aplicação web do backoffice do PulsePass, usada pelo organizador e pelo administrador. Fala apenas com o `backoffice-gateway`. É feita em Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 e MobX.

## Rodar localmente

O gateway precisa estar no ar em modo development, em `http://localhost:8190` (veja o README do `backoffice-gateway`). O Node 22 ou superior é necessário.

```bash
cp .env.example .env
npm install
npm run dev
```

A aplicação fica em `http://localhost:3000`. A URL do gateway vem de `NEXT_PUBLIC_API_URL` no `.env`; como o valor é embutido na compilação, mudar o `.env` exige reiniciar o `npm run dev`.

## Scripts

| Script                 | O que faz                                                  |
| ---------------------- | ---------------------------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento na porta 3000                  |
| `npm run build`        | Compilação de produção (saída `standalone`)                |
| `npm run lint`         | ESLint (inclui ordenação dos imports e proibição de `any`) |
| `npm run format`       | Formata o código com o Prettier                            |
| `npm run format:check` | Confere a formatação sem alterar arquivos                  |

## Docker

```bash
docker build --build-arg NEXT_PUBLIC_API_URL=http://localhost:8190 -t backoffice-app .
docker run --rm -p 3000:3000 backoffice-app
```

A imagem é multi-stage, roda com usuário sem privilégios e expõe a porta 3000. A URL do gateway é um argumento de build obrigatório (o build falha se vier vazio) porque o Next.js a embute no código do navegador. Na imagem publicada pelo workflow `Publish`, o valor vem da variável de repositório `NEXT_PUBLIC_API_URL` (GitHub → Settings → Secrets and variables → Actions → Variables).

## Rotas da aplicação

| Rota                | Descrição                                                             |
| ------------------- | --------------------------------------------------------------------- |
| `/`                 | Redireciona para `/cadastro`                                          |
| `/cadastro`         | Autocadastro do organizador: dados da empresa e da pessoa responsável |
| `/cadastro/enviado` | Confirmação de que o cadastro foi enviado                             |

## Estrutura

```
src/app/        rotas (page.tsx é o contêiner, PageView.tsx a apresentação)
src/components/ componentes base do Figma (Logo, Button, Field, Toast, PublicHeader)
src/services/   chamadas ao gateway e tipos da API
src/stores/     stores MobX
src/utils/      máscaras e validações puras
src/lib/        wrappers de bibliotecas (instância do axios e toast do Sonner)
```

As convenções de código, de design e de infraestrutura estão em `.claude/rules/`.
