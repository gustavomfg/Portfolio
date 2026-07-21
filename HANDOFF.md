# Handoff — Nocturne Portfolio

> Estado documentado em 20 de julho de 2026. Este arquivo descreve o código que está efetivamente no branch `master`, não apenas as ideias registradas nos documentos iniciais.

## 1. Objetivo do projeto

O Nocturne Portfolio é o portfólio pessoal de um desenvolvedor Full Stack e a apresentação pública do ecossistema **Nocturne**.

O produto deve:

- apresentar projetos, competências, trajetória e formas de contato;
- colocar os três produtos Nocturne em destaque desde o início;
- comunicar cuidado com engenharia, design de interface e pensamento de produto;
- ser útil para recrutadores, empresas, desenvolvedores, comunidade open source e potenciais clientes;
- parecer um produto de software premium, não um portfólio genérico, template ou demonstração técnica;
- manter excelente legibilidade, acessibilidade, responsividade e desempenho.

Os três projetos atualmente destacados são:

1. **Nocturne Inspector** — Engineering Intelligence;
2. **Nocturne Codex** — Engineering Execution;
3. **Nocturne Control** — Visual Systems.

Não reintroduzir informações sobre **Multibelt** ou **Gelprime**. O proprietário informou que são empresas em que trabalhou e pediu a remoção de qualquer conteúdo delas nos documentos do portfólio.

## 2. Estado atual resumido

- Aplicação de página única construída com Next.js App Router.
- Conteúdo principal já dividido em hero, projetos, sobre, tecnologias, jornada, contato e footer.
- Os cards de projeto são clicáveis e abrem um diálogo com informações resumidas.
- A abertura atual é uma composição **2D**, baseada em SVG e CSS, com eclipse, texto “Bem-vindo” e véu escuro.
- A abertura é exibida uma vez por sessão, é ignorada com `prefers-reduced-motion` e pode ser acelerada pela tecla Escape.
- A implementação Three.js/React Three Fiber anterior foi removida no commit `478e0b9` para priorizar simplicidade e coesão visual.
- A identidade usa JetBrains Mono, tema escuro, vidro discreto, roxo profundo e animações suaves.
- Informações pessoais definitivas, links, imagens, GitHub, LinkedIn, currículo e e-mail real ainda não foram fornecidos.

## 3. Regras obrigatórias do repositório

O arquivo `AGENTS.md` na raiz determina:

- toda mudança de arquivo deve resultar em commit;
- não alterar arquivos fora do escopo proposto;
- estudar ou revisar a implementação antes de modificá-la;
- manter o foco em um produto confortável e de alto nível para recrutadores e outros visitantes.

Além disso, o processo estabelecido durante o desenvolvimento exige:

1. apresentar um plano curto antes de implementar;
2. explicar o problema, a solução e os arquivos envolvidos;
3. fazer mudanças pequenas e verificáveis;
4. validar visualmente com Playwright em desktop e mobile quando houver alteração de UI;
5. conferir console, acessibilidade e limpeza de listeners/estado;
6. criar um commit separado após cada alteração concluída;
7. preservar mudanças preexistentes do usuário e nunca incluí-las por acidente.

## 4. Tecnologias utilizadas

### Runtime e framework

- Next.js `^16.2.10`, App Router;
- React e React DOM `^19.2.7`;
- TypeScript `^5.9.3`, com `strict: true`;
- pnpm `11.15.1`, fixado no campo `packageManager`.

### Interface

- Tailwind CSS `^4.3.3` via `@tailwindcss/postcss`;
- CSS global autoral em `app/globals.css`;
- Motion for React `^12.42.2`;
- Lucide React `^1.25.0`;
- JetBrains Mono Variable via `@fontsource-variable/jetbrains-mono`;
- Embla Carousel `^8.6.0`, instalado mas ainda não utilizado.

### Qualidade

- ESLint 9 com `eslint-config-next`;
- TypeScript sem emissão para typecheck;
- React Strict Mode habilitado.

### Tecnologias previstas, mas não presentes na implementação atual

- `shadcn/ui` aparece na documentação original, mas não está instalado nem possui componentes gerados em `components/ui`;
- React Three Fiber, Drei, Three.js e `@types/three` foram removidos no commit `478e0b9`;
- não há suíte de testes automatizados nem Playwright configurado no repositório; a validação visual foi feita pelo Playwright MCP externo;
- não há Prettier configurado, apesar de ser mencionado na documentação inicial.

## 5. Arquitetura

```text
.
├── app/
│   ├── globals.css             # tokens, layout, componentes e responsividade
│   ├── layout.tsx              # metadata, fonte e bootstrap da intro
│   └── page.tsx                # compõe intro + portfólio
├── components/
│   ├── animations/
│   │   └── reveal.tsx
│   ├── intro/
│   │   ├── IntroMark2D.tsx
│   │   ├── IntroOverlay.tsx
│   │   └── NocturneIntro.tsx
│   ├── layout/
│   │   ├── footer.tsx
│   │   └── navbar.tsx
│   ├── sections/
│   │   ├── about-section.tsx
│   │   ├── contact-section.tsx
│   │   ├── hero-section.tsx
│   │   ├── journey-section.tsx
│   │   ├── project-dialog.tsx
│   │   ├── projects-section.tsx
│   │   └── stack-marquee.tsx
│   ├── ui/
│   │   ├── brand-mark.tsx
│   │   └── section-heading.tsx
│   └── nocturne-portfolio.tsx  # orquestrador client-side da home
├── data/
│   └── portfolio.ts            # conteúdo estruturado da página
├── hooks/
│   ├── use-intro-session.ts
│   ├── use-pointer-glow.ts
│   ├── use-portfolio-navigation.ts
│   ├── use-project-dialog.ts
│   └── use-scroll-progress.ts
├── lib/
│   └── intro-timeline.ts       # fases e duração da introdução
├── public/
│   ├── nocturne-eclipse.svg    # símbolo grande da abertura
│   └── nocturne-mark.svg       # marca usada no site e metadata
├── types/
│   └── portfolio.ts
├── AGENTS.md
├── ID2.md                      # documentação inicial; parcialmente desatualizada
├── Ideia para portfolio.md     # conceito inicial; parcialmente desatualizado
├── package.json
└── pnpm-lock.yaml
```

Não existem atualmente as pastas `utils/` ou uma biblioteca real de componentes shadcn. Não criar diretórios vazios apenas para coincidir com uma arquitetura idealizada.

## 6. Fluxo principal da aplicação

`app/page.tsx` renderiza dois irmãos:

1. `NocturneIntro` — camada fixa temporária;
2. `NocturnePortfolio` — conteúdo real da página, carregado desde o início.

Isso mantém o conteúdo disponível para SSR/SEO e evita que a introdução seja a página real.

`NocturnePortfolio` concentra somente o estado compartilhado da home:

- índice do projeto destacado no mapa/rail do hero;
- estado de navegação ativa e menu mobile;
- projeto selecionado no diálogo.

Os textos e metadados reutilizados ficam em `data/portfolio.ts`, tipados em `types/portfolio.ts`.

## 7. Introdução Nocturne atual

### Implementação

A abertura foi simplificada para SVG/CSS. Não existe Canvas ou WebGL no estado atual.

- `app/layout.tsx` executa um script pequeno antes da hidratação;
- o script consulta `prefers-reduced-motion` e `sessionStorage`;
- o resultado é salvo em `html[data-nocturne-intro="play|skip"]`;
- `useIntroSession` expõe `checking`, `play` ou `skip` usando `useSyncExternalStore`;
- `NocturneIntro` usa um único loop de `requestAnimationFrame`;
- `lib/intro-timeline.ts` converte tempo decorrido em fases;
- a página principal fica com `inert` enquanto a introdução está ativa;
- `body.intro-active` bloqueia scroll;
- ao completar, o estado de sessão é gravado e toda a introdução desmonta.

### Timeline atual

| Fase | Início | Função |
|---|---:|---|
| `dark` | 0 ms | tela escura inicial |
| `eclipse` | 520 ms | revela o crescente |
| `welcome` | 1.850 ms | apresenta “Bem-vindo” |
| `hold` | 2.850 ms | sustenta a composição |
| `depart` | 4.100 ms | retira símbolo e texto |
| `reveal` | 4.650 ms | dissolve o véu sobre a home |
| `complete` | 5.200 ms | registra sessão e desmonta |

Quando a aba fica oculta, o tempo deixa de avançar. Ao voltar, `previousTime` é reiniciado para evitar saltos. Escape move a timeline para pelo menos 4.350 ms.

### Decisão importante

Houve uma V1/V2 em Three.js com núcleo procedural, anéis e partículas. Ela foi removida porque estava parecendo uma demonstração técnica e competia com o conteúdo. A direção mais recente escolheu uma abertura mínima: um eclipse assimétrico, muito espaço negativo, iluminação sugerida no próprio SVG e apenas a palavra “Bem-vindo”.

Não reintroduzir 3D automaticamente. Qualquer retorno a WebGL precisa ser justificado por ganho claro de profundidade, estudado visualmente e aprovado antes de implementação.

## 8. Componentes existentes

### Estrutura e navegação

- `NocturnePortfolio`: compõe todas as seções e conecta os estados compartilhados.
- `Navbar`: marca, navegação desktop/mobile, disponibilidade e barra de progresso.
- `Footer`: marca, assinatura e link para voltar ao topo.

### Introdução

- `NocturneIntro`: lifecycle, timeline, sessão, `inert`, Escape e desmontagem.
- `IntroMark2D`: renderiza `nocturne-eclipse.svg` com `next/image` e aura CSS.
- `IntroOverlay`: texto “Bem-vindo” controlado pelas fases.

### Conteúdo

- `HeroSection`: mensagem principal, CTAs, resumo profissional, mapa interativo do ecossistema e rail dos três projetos.
- `ProjectsSection`: lista de cards clicáveis com feedback visual e abertura do diálogo.
- `ProjectDialog`: status, problema resolvido, destaques técnicos e tags.
- `AboutSection`: apresentação, princípios e áreas de atuação.
- `StackMarquee`: faixa contínua de tecnologias, duplicada para loop visual.
- `JourneySection`: timeline em quatro momentos.
- `ContactSection`: CTA, e-mail e links sociais; os destinos ainda são placeholders.

### Reutilização e animação

- `BrandMark`: wrapper reutilizável de `nocturne-mark.svg`.
- `SectionHeading`: eyebrow, título e descrição opcional.
- `Reveal`: scroll reveal com Motion e respeito a movimento reduzido.

## 9. Hooks existentes

- `useIntroSession`: sincroniza a decisão de exibir a intro com o bootstrap do HTML e `sessionStorage`.
- `useScrollProgress`: atualiza `transform: scaleX()` diretamente em um elemento persistente; usa `requestAnimationFrame`, listeners passivos e nenhum `setState` durante scroll.
- `usePortfolioNavigation`: controla menu mobile e seção ativa com `IntersectionObserver`; fecha o menu com Escape e resize.
- `useProjectDialog`: controla o índice do projeto aberto, Escape e classe `body.dialog-open`.
- `usePointerGlow`: escreve coordenadas em custom properties CSS; desativa a atualização com `prefers-reduced-motion`.

## 10. Dados e tipagem

`data/portfolio.ts` contém:

- `NAV_ITEMS`;
- `PROJECTS`;
- `STACK`;
- `CAPABILITIES`;
- `TIMELINE`.

Os arrays usam `as const satisfies ...` para preservar literais e validar o contrato sem perder readonly.

`types/portfolio.ts` define:

- `ProjectAccent`;
- `NavItem`;
- `Project`;
- `Capability`;
- `TimelineItem`.

Ao adicionar links, imagens, arquitetura, desafios ou roadmap aos projetos, ampliar primeiro a interface `Project`, depois atualizar todos os itens e somente então adaptar a UI.

## 11. Decisões de design

### Princípios

- um ponto focal por composição;
- remover quando houver dúvida entre adicionar e remover;
- qualidade proveniente de hierarquia, espaço, contraste, timing e microinteração;
- evitar neon forte, excesso de partículas, HUD fictício, estética gamer e aparência de template;
- 3D, quando existir, deve servir à profundidade e não demonstrar tecnologia;
- todo elemento clicável deve parecer clicável e oferecer feedback;
- animações nunca devem prejudicar leitura ou navegação.

### Identidade visual

- fundo principal `#07070a`;
- superfícies quase pretas e vidro escuro;
- violeta `#9167ff` como acento primário;
- azul e ciano somente para diferenciar projetos;
- verde reservado a estados positivos/disponibilidade;
- bordas translúcidas e reflexos discretos;
- ruído de fundo muito leve;
- tipografia JetBrains Mono em toda a interface.

### Hierarquia tipográfica

Tokens principais em `:root`:

- label: `0.75rem` / 12 px;
- body pequeno: `0.8125rem` / 13 px;
- body: `0.9375rem` / 15 px;
- subtítulo: `1.125rem` / 18 px.

Não usar texto essencial abaixo de 12 px. Títulos usam `clamp()` e pesos intermediários da fonte variável.

### Movimento

- easing predominante: `[0.22, 1, 0.36, 1]`;
- fades e deslocamentos curtos;
- scroll reveals executam uma vez;
- orbits e marquee são lentos;
- o CSS global reduz animações e transições a `0.01ms` com `prefers-reduced-motion`;
- a introdução é inteiramente ignorada para usuários com movimento reduzido.

### Referência de arte

A imagem mais recente fornecida pelo proprietário está em:

`/home/g/Área de trabalho/PNG.png`

Extrair dela atmosfera, uso de vazio, eclipse, iluminação lateral e hierarquia. Não copiar HUD, cantos técnicos, estrelas, neon ou elementos específicos.

## 12. Acessibilidade já considerada

- idioma do documento: `pt-BR`;
- link “Pular para o conteúdo” visível ao receber foco;
- foco global com contraste;
- navegação mobile expõe `aria-expanded` e `aria-controls`;
- navegação ativa usa `aria-current`;
- nós do hero usam `aria-pressed`;
- cards informam `aria-haspopup="dialog"`;
- diálogo tem `role="dialog"`, `aria-modal` e título associado;
- Escape fecha menu e diálogo;
- a home recebe `inert` durante a introdução;
- `prefers-reduced-motion` é respeitado por CSS e Motion.

## 13. Performance

- a página principal é renderizada independentemente da introdução;
- não existe atualmente Canvas, WebGL, listener de ponteiro global ou pós-processamento;
- a barra de scroll não provoca render React por evento;
- listeners são removidos nos cleanups dos hooks;
- `next/image` é usado para os símbolos;
- a fonte é servida pelo pacote local, sem dependência de Google Fonts;
- componentes client-side são usados somente onde existe estado, browser API ou Motion.

Evitar memoização preventiva. Medir antes de introduzir `memo`, `useMemo` ou novas dependências.

## 14. Problemas conhecidos e lacunas

### Conteúdo

1. O nome real do proprietário não aparece na página.
2. `mailto:contato@exemplo.com` é fictício.
3. GitHub e LinkedIn usam `href="#"`.
4. Não há link de currículo.
5. Os projetos não possuem URLs de GitHub ou demonstração.
6. Os projetos não possuem imagens, galeria, arquitetura detalhada, desafios completos ou roadmap.
7. `ProjectDialog` exibe “Mais informações e links em breve”.
8. Os textos de trajetória ainda são genéricos e precisam ser validados com informações reais.
9. `ID2.md` e `Ideia para portfolio.md` citam SysMon, mas a UI atual destaca Inspector, Codex e Control. Tratar os documentos como contexto histórico, não fonte única da verdade.
10. O usuário informou que o projeto Nocturne Inspector existe em uma pasta do PyCharm dentro de Documentos. Localizar e estudar esse projeto antes de escrever detalhes técnicos adicionais.

### Introdução

1. Não existe botão visível “Pular introdução”; apenas Escape. Isso conflita com um requisito anterior e torna a ação pouco descobrível.
2. A duração atual é 5.200 ms, 200 ms acima do intervalo originalmente pedido de 3–5 segundos.
3. A introdução mostra apenas “Bem-vindo”; avaliar com o proprietário se a identidade Nocturne precisa aparecer textual ou se a marca silenciosa é intencional.
4. O asset 2D e sua transição precisam ser validados novamente em navegadores reais, especialmente Firefox, pois as auditorias anteriores usaram Chromium via Playwright MCP.

### UI e acessibilidade

1. `ProjectDialog` não implementa focus trap, retorno de foco ao card acionador nem `inert` no conteúdo de fundo.
2. Há duas declarações idênticas de `.project-card::after` em `app/globals.css`; remover somente em uma refatoração CSS explicitamente proposta.
3. O marquee usa CSS contínuo e Embla não é usado; decidir se Embla é realmente necessário antes de construir uma galeria.
4. Não há testes automatizados de teclado, responsividade ou lifecycle.
5. O favicon oficial é `/nocturne-mark.svg` via metadata. Não existe `public/favicon.ico`; uma requisição direta a `/favicon.ico` poderá continuar retornando 404.

### Dependências e arquitetura

1. `embla-carousel-react` está instalado sem consumidor atual.
2. A documentação pede shadcn/ui, mas o projeto usa componentes autorais e não possui a dependência.
3. Quase toda a estilização está em um único `app/globals.css`; ele já é grande e deve ser reorganizado apenas com justificativa e sem uma migração ampla não solicitada.
4. Não existe pipeline de CI descrito no repositório.

### Estado do Git que deve ser preservado

No momento deste handoff existe uma alteração preexistente e não relacionada em `next-env.d.ts`:

```diff
-import "./.next/types/routes.d.ts";
+import "./.next/dev/types/routes.d.ts";
```

Não incluir essa alteração em commits sem autorização. `next build` pode regenerar o arquivo; após builds, conferir e restaurar a alteração preexistente se necessário.

## 15. Componentes/funcionalidades pendentes

- dados pessoais reais: nome, apresentação, localização e disponibilidade;
- links reais: GitHub, LinkedIn, e-mail, currículo e demos;
- páginas ou experiências de produto completas para Inspector, Codex e Control;
- imagens e galerias dos projetos;
- campos tipados para desafios, arquitetura, roadmap e links;
- integração visual com GitHub, se ainda desejada;
- decisão sobre carousel/Embla;
- decisão sobre adoção real de shadcn/ui;
- acessibilidade completa do diálogo;
- testes automatizados e possível CI;
- auditoria final em Firefox, Safari/WebKit e dispositivos reais;
- metadata social: Open Graph, Twitter card, canonical e imagem de compartilhamento;
- analytics somente se houver necessidade e consentimento claro;
- deploy em Vercel após conteúdo e links definitivos.

## 16. TODOs priorizados

### P0 — conteúdo que impede publicação

1. Obter do proprietário nome, cargo final, e-mail, GitHub, LinkedIn e currículo.
2. Revisar os três projetos diretamente em seus repositórios antes de escrever claims técnicos.
3. Substituir todos os placeholders e validar cada link.
4. Definir quais projetos têm repositório público e/ou demonstração.

### P1 — experiência e acessibilidade

1. Reavaliar um controle visível e discreto para pular a introdução.
2. Ajustar a intro para no máximo 5 segundos, caso o requisito continue válido.
3. Implementar focus trap, retorno de foco e isolamento do fundo no `ProjectDialog`.
4. Validar contraste, zoom de 200%, teclado e leitores de tela.
5. Testar Firefox real, pois é o navegador usado pelo proprietário.

### P2 — profundidade dos projetos

1. Evoluir `Project` com imagens, links, desafios, arquitetura e roadmap.
2. Decidir entre diálogos enriquecidos e rotas dedicadas por projeto.
3. Se houver múltiplas imagens, avaliar Embla; caso contrário, remover a dependência não usada.
4. Produzir conteúdo específico para Inspector, Codex e Control sem inventar informações.

### P3 — acabamento e entrega

1. Adicionar metadata social e asset Open Graph.
2. Remover duplicação CSS conhecida e revisar organização do stylesheet.
3. Adicionar testes essenciais e CI.
4. Fazer auditorias Lighthouse, performance e acessibilidade em build de produção.
5. Preparar e validar deploy na Vercel.

## 17. Convenções de código

- componentes funcionais React;
- TypeScript estrito, sem `any` desnecessário;
- componentes exportados em PascalCase;
- arquivos de componentes e hooks em kebab-case, exceto a pasta `intro`, que mantém nomes PascalCase já existentes;
- aliases absolutos `@/` conforme `tsconfig.json`;
- props declaradas em interfaces locais quando não são compartilhadas;
- tipos de domínio centralizados em `types/portfolio.ts`;
- conteúdo reutilizado centralizado em `data/portfolio.ts`;
- arrays estáticos como `readonly`, preferencialmente com `as const satisfies`;
- responsabilidade única e componentes pequenos;
- comentários apenas quando explicam uma decisão não óbvia;
- `useReducedMotion` em animações controladas por React;
- listeners sempre acompanhados de cleanup;
- não usar `setState` em eventos de scroll de alta frequência;
- preferir `requestAnimationFrame` e propriedades compostas, como `transform` e `opacity`;
- manter labels e textos essenciais com pelo menos 12 px;
- preservar HTML semântico, estados de foco e nomes acessíveis;
- não instalar dependências sem necessidade demonstrada.

## 18. Como iniciar o projeto

### Pré-requisitos

- Node.js compatível com Next.js 16;
- Corepack habilitado;
- pnpm conforme a versão fixada no `package.json`.

### Instalação

```bash
corepack enable
corepack pnpm install
```

### Desenvolvimento

```bash
corepack pnpm dev
```

Por padrão, abrir `http://localhost:3000`.

Para rever a introdução durante a mesma sessão, apagar a chave abaixo no DevTools e recarregar:

```js
sessionStorage.removeItem("nocturne-intro-viewed");
```

### Validação

```bash
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm build
```

### Build de produção local

```bash
corepack pnpm build
corepack pnpm start
```

Depois de executar `next build`, verificar `git diff -- next-env.d.ts` antes de preparar qualquer commit.

## 19. Processo recomendado para alterações de UI

1. Ler `AGENTS.md` e este handoff integralmente.
2. Inspecionar o componente e os estilos envolvidos.
3. Apresentar problema, solução e lista exata de arquivos.
4. Fazer uma única melhoria pequena.
5. Rodar lint/typecheck e build conforme o risco.
6. Abrir a build com Playwright MCP.
7. Validar no mínimo 1440×900 e 390×844.
8. Capturar estados relevantes, conferir console e testar teclado.
9. Verificar `git diff`, excluir artefatos locais do Playwright e preservar `next-env.d.ts`.
10. Fazer commit apenas dos arquivos daquela melhoria.
11. Explicar o resultado antes de iniciar a melhoria seguinte.

## 20. Arquivos alterados nas rodadas recentes

### Introdução Three.js — histórico, posteriormente removido

Os commits `38a6500` a `ea66c45` criaram e refinaram uma introdução 3D com lifecycle, símbolo procedural, transição, materiais, anéis, partículas e placeholder 2D. Esses componentes e dependências não existem mais no estado atual.

### Introdução 2D atual

Commit-base: `478e0b9 refactor: rebuild intro around a minimal eclipse`

Arquivos modificados ou removidos nesse commit:

- `app/globals.css`;
- `components/intro/IntroFallback.tsx` — removido;
- `components/intro/IntroMark2D.tsx`;
- `components/intro/IntroOverlay.tsx`;
- `components/intro/NocturneCore.tsx` — removido;
- `components/intro/NocturneIntro.tsx`;
- `components/intro/NocturneParticles.tsx` — removido;
- `components/intro/NocturneScene.tsx` — removido;
- `hooks/use-webgl-support.ts` — removido;
- `lib/intro-timeline.ts`;
- `package.json`;
- `pnpm-lock.yaml`;
- `public/nocturne-eclipse.svg` — criado.

Assets de marca ativos:

- `public/nocturne-eclipse.svg` — abertura;
- `public/nocturne-mark.svg` — navbar, hero, footer e favicon declarado.

## 21. Próximos passos recomendados

A próxima conversa deve começar pelo conteúdo, não por novos efeitos.

Sequência recomendada:

1. solicitar ao proprietário nome, bio curta, e-mail, GitHub, LinkedIn, currículo e preferências de disponibilidade;
2. localizar e revisar os projetos Nocturne Inspector, Codex e Control em seus repositórios;
3. propor um schema ampliado de `Project` baseado apenas em informações verificadas;
4. substituir placeholders e completar os diálogos ou decidir por páginas dedicadas;
5. corrigir os pontos de acessibilidade do diálogo e o controle de pular introdução;
6. fazer uma auditoria visual completa em Firefox real e mobile;
7. somente depois avaliar galeria, Embla, shadcn/ui, integrações externas ou qualquer aumento de complexidade.

O princípio de decisão permanece: se algo parecer uma demonstração técnica, template ou ornamento sem função, remover ou simplificar. O objetivo é que o visitante perceba cuidado e coerência, não a quantidade de efeitos.

## 22. Validação no momento do handoff

Em 20 de julho de 2026, o estado atual passou por:

- `corepack pnpm lint`;
- `corepack pnpm typecheck`;
- `corepack pnpm build`.

O build terminou com sucesso e gerou estaticamente `/` e `/_not-found`. Essa validação não substitui a auditoria visual em Firefox nem os testes automatizados ainda pendentes.
