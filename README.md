# Nocturne Portfolio

Portfólio pessoal de Gustavo Maquias e apresentação do ecossistema Nocturne. O projeto é uma aplicação Next.js de página única, responsiva e acessível, com uma introdução cinematográfica e conteúdo profissional centralizado.

## Requisitos

- Node.js 24 ou superior
- pnpm 11.15.1 ou superior, preferencialmente habilitado pelo Corepack

## Desenvolvimento local

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Comandos

| Comando | Finalidade |
| --- | --- |
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Gera o build de produção |
| `pnpm start` | Executa o build de produção |
| `pnpm lint` | Verifica o código com ESLint |
| `pnpm typecheck` | Verifica os tipos TypeScript |
| `pnpm test` | Executa testes unitários e de componentes |
| `pnpm test:e2e` | Executa os cenários E2E no Chromium |

Para preparar o navegador dos testes E2E:

```bash
pnpm exec playwright install chromium
```

## Configuração

Defina a URL pública completa na implantação:

```bash
NEXT_PUBLIC_SITE_URL=https://seu-dominio.example
```

Essa variável alimenta a URL canônica, Open Graph, Twitter Cards, `robots.txt` e `sitemap.xml`. Implantações na Vercel também reconhecem `VERCEL_PROJECT_PRODUCTION_URL` e `VERCEL_URL`. Sem uma URL pública, o desenvolvimento usa `http://localhost:3000` e bloqueia indexação em `robots.txt`.

O projeto não requer credenciais, banco de dados ou serviços de backend.

## Arquitetura

- `app/`: App Router, layout, metadados e arquivos de descoberta.
- `components/`: Server Components para conteúdo estático e ilhas cliente para navegação, animações e diálogo.
- `data/portfolio.ts`: fonte tipada do conteúdo exibido.
- `hooks/`: comportamento interativo e acessível.
- `lib/`: matemática e direção da jornada cinematográfica.
- `app/styles/`: tokens, base, layout, seções, diálogo, jornada e atmosfera.
- `e2e/` e arquivos `*.test.ts(x)`: testes de interface, acessibilidade, dados e lógica.

Decisões importantes:

- O conteúdo estático permanece no servidor; somente interações necessárias são hidratadas.
- A Content Security Policy usa nonce por resposta, portanto as páginas são renderizadas dinamicamente.
- Ícones armazenados nos dados usam chaves serializáveis e são resolvidos na camada de apresentação.
- O CSS é próprio e modular, sem Tailwind.
- A fonte JetBrains Mono é servida localmente.

## Qualidade e segurança

O workflow de CI executa instalação congelada, lint, typecheck, testes, build, E2E com verificações axe e auditoria de dependências. Antes de enviar uma mudança, execute:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
pnpm audit --audit-level high
```

## Implantação

1. Configure Node.js 24 e pnpm via Corepack.
2. Defina `NEXT_PUBLIC_SITE_URL` com o domínio final.
3. Execute `pnpm install --frozen-lockfile` e `pnpm build`.
4. Inicie com `pnpm start` ou use uma plataforma compatível com Next.js 16.
5. Confirme `/robots.txt`, `/sitemap.xml`, a URL canônica e as imagens `/opengraph-image` e `/twitter-image`.

O uso de nonce na CSP exige execução server-side por requisição; uma exportação puramente estática não é compatível com a configuração atual.

## Atualização de conteúdo

[IDENTITY.md](IDENTITY.md) é a fonte canônica da identidade profissional. Ao atualizar o portfólio:

1. Preserve a precisão factual e não exagere experiência ou habilidades.
2. Atualize `IDENTITY.md` quando a identidade profissional mudar.
3. Reflita o conteúdo público em `data/portfolio.ts`.
4. Execute todas as verificações de qualidade antes da implantação.
