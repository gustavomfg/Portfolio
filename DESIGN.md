---
name: "Gustavo Maquias Portfolio"
description: "Um caderno técnico noturno para apresentar evolução, engenharia e projetos reais."
colors:
  carbon-night: "#000000"
  surface-root: "#08090f"
  carbon-surface: "#0d0d13"
  carbon-surface-soft: "#111119"
  carbon-overlay: "rgba(10, 10, 16, 0.82)"
  carbon-glass: "rgba(16, 16, 24, 0.55)"
  carbon-glass-strong: "rgba(22, 21, 31, 0.72)"
  line-subtle: "rgba(255, 255, 255, 0.1)"
  line-strong: "rgba(255, 255, 255, 0.17)"
  text-primary: "#f4f2f8"
  text-bright: "#d8d5df"
  text-muted: "#b3afbb"
  text-label: "#9d99a6"
  text-dim: "#8d8996"
  text-inverse: "#ffffff"
  text-on-light: "#0b0a0e"
  text-navigation: "#aaa6b2"
  text-mobile-nav: "#b4b0bb"
  text-footer: "#8f8b97"
  text-action-muted: "#8b8793"
  text-index: "#4c4954"
  line-link: "#66616e"
  engineering-violet: "#9167ff"
  engineering-violet-soft: "#c6b3ff"
  diagnostic-blue: "#5d8aff"
  diagnostic-cyan: "#55d9e8"
  verified-green: "#78e0b2"
  verified-green-muted: "#4a9d78"
  action-light: "#f1edf9"
  action-ink: "#121016"
  surface-badge: "#101018"
  surface-visual: "#080a10"
  surface-control: "rgba(12, 13, 19, 0.88)"
  surface-control-hover: "rgba(29, 24, 44, 0.88)"
  surface-ink-wash: "rgba(5, 8, 14, 0.18)"
  surface-ink-deep: "rgba(3, 5, 10, 0.11)"
  line-cool: "rgba(198, 209, 230, 0.2)"
  line-cool-strong: "rgba(214, 223, 241, 0.34)"
typography:
  display:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, monospace"
    fontSize: "clamp(48px, 5.7vw, 82px)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.058em"
  headline:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, monospace"
    fontSize: "clamp(40px, 5vw, 68px)"
    fontWeight: 500
    lineHeight: 1.03
    letterSpacing: "-0.05em"
  title:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, monospace"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "-0.02em"
  body:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, monospace"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.07em"
  scale:
    body-base: "1rem"
    body-mobile: "0.9rem"
    body-compact: "0.82rem"
    utility: "0.875rem"
    title-mobile: "1.5rem"
    caption: "0.68rem"
    meta: "0.67rem"
    micro: "0.62rem"
    lanyard-header: "0.57rem"
    lanyard-note: "0.61rem"
    sysmon-role: "0.8rem"
    sysmon-label: "0.73rem"
    sysmon-value: "0.7rem"
    control: "1.25rem"
    dialog-index-mobile: "3.2rem"
    dialog-section-mobile: "1.28rem"
rounded:
  button: "9px"
  card: "14px"
  dialog: "17px"
  pill: "99px"
  control: "8px"
  control-compact: "7px"
  special: "18px"
  visual: "20px"
  icon: "12px"
  icon-medium: "11px"
  icon-compact: "6px"
  media: "10px"
  cord: "42px"
components:
  button-primary:
    backgroundColor: "{colors.action-light}"
    textColor: "{colors.action-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "0 18px"
    height: "47px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "0 18px"
    height: "47px"
  project-card:
    backgroundColor: "{colors.carbon-glass}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.card}"
    padding: "28px"
  technology-chip:
    backgroundColor: "transparent"
    textColor: "{colors.text-label}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "7px 9px"
  site-navigation:
    backgroundColor: "{colors.carbon-overlay}"
    textColor: "{colors.text-bright}"
    rounded: "{rounded.card}"
    height: "68px"
---

# Design System: Gustavo Maquias Portfolio

## Overview

**Creative North Star: "Caderno Técnico Noturno"**

O sistema visual apresenta o portfólio como um registro de construção, documentação e evolução em engenharia de software. A atmosfera escura cria continuidade e concentração, enquanto tipografia monoespaçada, divisores finos e pequenas marcações técnicas organizam o conteúdo sem simular um terminal ou um painel de observabilidade.

O caráter deve permanecer sóbrio, técnico e humano. A interface existe para enquadrar as evidências, nunca para competir com elas: projetos reais têm mais peso visual e profissional do que os componentes que os apresentam. Profundidade vem primeiro de composição, contraste tonal, espaçamento e hierarquia tipográfica; gradientes, transparência e sombras são recursos controlados para superfícies especiais.

O sistema rejeita tanto a estética futurista gratuita quanto a aparência previsível de landing pages de IA. Personalidade deve surgir da identidade de Gustavo, do rigor editorial e dos detalhes de engenharia, não de ornamentação acumulada.

**Key Characteristics:**

- Escuridão concentrada com contraste tonal progressivo.
- Tipografia monoespaçada usada como voz editorial completa.
- Projetos como principal evidência e foco visual.
- Bordas, divisores e ritmo espacial como principais ferramentas de estrutura.
- Violeta técnico raro, com azul, ciano e verde reservados a significado.
- Movimento discreto, funcional e sempre dispensável para compreensão.

## Colors

A paleta combina negros de carbono e texto levemente violeta com sinais cromáticos precisos, evitando que o acento se torne decoração difusa.

### Primary

- **Engineering Violet** (`#9167ff`): sinal principal para seleção, foco, progresso e identificação de projetos. Deve permanecer concentrado.
- **Engineering Violet Soft** (`#c6b3ff`): versão de maior legibilidade para eyebrows, ícones, textos curtos e foco visível em fundos escuros.

### Secondary

- **Diagnostic Blue** (`#5d8aff`): diferencia projetos ou informações técnicas sem disputar com o violeta principal.
- **Diagnostic Cyan** (`#55d9e8`): acento complementar ainda mais raro, aplicado apenas quando uma categoria precisa de distinção própria.

### Tertiary

- **Verified Green** (`#78e0b2`): comunica disponibilidade, estado positivo ou confirmação. Não deve funcionar como cor decorativa.

### Neutral

- **Carbon Night** (`#000000`): fundo raiz e espaço negativo dominante.
- **Carbon Surface** (`#0d0d13`) e **Carbon Surface Soft** (`#111119`): camadas estruturais discretas para navegação, cards e regiões internas.
- **Text Primary** (`#f4f2f8`) e **Text Bright** (`#d8d5df`): títulos e conteúdo de maior prioridade.
- **Text Muted** (`#b3afbb`), **Text Label** (`#9d99a6`) e **Text Dim** (`#8d8996`): corpo secundário, metadados e rótulos; preservar contraste legível.
- **Line Subtle** (`rgba(255, 255, 255, 0.1)`) e **Line Strong** (`rgba(255, 255, 255, 0.17)`): estrutura, separação e estados interativos.

**The Quiet Accent Rule.** Cor comunica foco, categoria ou estado. Nenhum acento existe apenas para preencher espaço vazio.

## Typography

**Display Font:** JetBrains Mono Variable (com JetBrains Mono e `monospace` como fallback)  
**Body Font:** JetBrains Mono Variable (com JetBrains Mono e `monospace` como fallback)  
**Label/Mono Font:** JetBrains Mono Variable

**Character:** Uma única família monoespaçada sustenta a voz técnica e autoral. A hierarquia depende de escala, peso, contraste e espaçamento — nunca da multiplicação de famílias tipográficas.

### Hierarchy

- **Display** (500, `clamp(48px, 5.7vw, 82px)`, 0.98): títulos principais de alto impacto, balanceados e com tracking negativo.
- **Headline** (500, `clamp(40px, 5vw, 68px)`, 1.03): títulos de seção e chamadas principais.
- **Title** (500, `1.125rem`, 1.5): títulos de cards compactos, capacidades e itens de trajetória.
- **Body** (400, `0.9375rem`, 1.7): explicações e conteúdo corrido; manter linhas legíveis e blocos normalmente limitados a aproximadamente 560–600px.
- **Label** (600, `0.75rem`, `0.07em`, geralmente uppercase): navegação, eyebrows, tags, status e metadados.

**The One Technical Voice Rule.** A tipografia monoespaçada é editorial, não cenográfica: evitar prompts falsos, código decorativo e jargão de terminal sem função.

Os tamanhos fixos recorrentes vivem em `app/styles/tokens.css` (`--font-*`). As escalas `clamp()` específicas de hero, diálogo, evidência e contato são exceções responsivas: seus extremos expressam composição e não devem ser achatados em uma única escala fixa.

## Layout

O conteúdo usa um shell central de até `1240px`, com gutters de `28px` no desktop, `16px` abaixo de `700px` e `12px` abaixo de `430px`. A navegação flutua dentro de até `1280px`. Seções principais usam espaço vertical amplo e separadores horizontais sutis para criar capítulos no caderno.

O hero combina texto e visual em uma grade `1.2fr / 0.8fr`, com gap fluido entre `36px` e `100px`. Títulos de seção usam uma coluna de rótulo e duas colunas de conteúdo. Projetos formam uma grade de duas colunas; capacidades usam três e a trajetória quatro.

Em `1000px`, hero e navegação mudam de estrutura, capacidades passam a duas colunas e a trajetória a duas. Em `700px`, as composições se tornam lineares, projetos e trajetória usam uma coluna, CTAs ocupam a largura disponível e o diálogo se aproxima de um bottom sheet. Em `430px`, gutters e tipografia são reduzidos novamente. A introdução possui adaptação própria em `768px`.

O ritmo interno recorre a passos compactos de 8–18px, padding de componentes entre 18–34px e separações de seção entre aproximadamente 50–75px. Espaço vazio deve agrupar conteúdo e estabelecer importância antes que um novo contêiner seja introduzido.

**The Evidence Leads Rule.** A composição deve conduzir primeiro ao nome, ao papel e à profundidade técnica de cada projeto; controles, tags e decoração permanecem subordinados.

`app/styles/tokens.css` é a fonte de verdade para cores, raios, sombras e tamanhos compartilhados. Tons translúcidos dentro de gradientes, máscaras e superfícies smoked-glass permanecem locais quando representam uma camada óptica específica; não são novos papéis semânticos.

## Elevation & Depth

O sistema é quase plano. Fundos em diferentes níveis de carbono, bordas translúcidas, divisores e contraste tipográfico são a base da profundidade. O código atual usa blur e sombras ambientais em navegação, visual do hero, diálogo, contato e alguns estados elevados; esses tratamentos são exceções documentadas, não uma licença para aplicar glassmorphism a toda superfície.

### Shadow Vocabulary

- **Glass Highlight** (`inset 0 1px 0 rgba(255, 255, 255, 0.05)`): linha de luz interna usada em superfícies especiais translúcidas.
- **Ambient Low** (`0 16px 48px rgba(0, 0, 0, 0.18)`): separação suave de superfícies interativas quando o contraste tonal não basta.
- **Ambient Strong** (`0 24px 64px rgba(0, 0, 0, 0.25)`): reservado a diálogo, navegação móvel e estados temporariamente elevados.

**The Composition Before Effects Rule.** Profundidade deve vir de composição, não de efeitos. Sombras, blur e gradientes só permanecem quando esclarecem hierarquia ou estado.

**The Controlled Glass Rule.** Transparência e blur são reservados à navegação, diálogos, hero e superfícies especiais; não devem ser propagados indiscriminadamente para cards e seções.

## Shapes

A geometria é contida e consistente: botões usam raio de `9px`, cards `14px`, diálogos `17px` e chips cápsula de `99px`. Superfícies especiais usam os tokens `18px` ou `20px`; ícones internos usam os tokens compactos de `6–12px`.

Raios de `50%`, `inherit`, `0` e a forma composta do cordão do hero são exceções geométricas intencionais para círculos, herança de componentes e bordas abertas. `app/styles/journey.css` não faz parte da superfície vigente e permanece ausente.

Bordas de 1px definem estrutura com mais frequência que sombras. Círculos aparecem apenas em indicadores de estado, órbitas e elementos atmosféricos; não constituem uma linguagem decorativa universal. Cantos arredondados suavizam a densidade técnica sem transformar os componentes em formas excessivamente amigáveis.

## Components

Os componentes são precisos e contidos. Estados precisam ser claros, áreas interativas confortáveis e ornamentação mínima; nenhum componente deve fazer o portfólio parecer um dashboard ou terminal fictício.

### Buttons

- **Shape:** retângulo compacto com raio de `9px` e altura mínima de `47px`.
- **Primary:** fundo claro (`#f1edf9`), texto quase preto (`#121016`) e padding horizontal de `18px`; alto contraste sem usar o violeta como preenchimento automático.
- **Hover / Focus:** elevação de `2px`, mudança discreta de sombra ou borda e outline global de `2px` em Engineering Violet Soft com offset de `4px`.
- **Ghost:** fundo transparente, borda Line Subtle e texto muted; ganha contraste tonal no hover.

### Chips

- **Style:** cápsulas pequenas com borda Line Subtle, fundo quase transparente, texto Label e tracking amplo.
- **State:** representam tecnologia ou categoria, não ação. Evitar acumular chips quando texto simples for suficiente.

### Cards / Containers

- **Corner Style:** raio padrão de `14px`.
- **Background:** Carbon Surface em variações tonais; transparência é permitida apenas quando o contexto especial justificar.
- **Shadow Strategy:** planos por padrão; borda e fundo mudam no hover/foco. Sombras fortes são reservadas.
- **Border:** 1px, normalmente Line Subtle ou uma mistura controlada com o acento do projeto.
- **Internal Padding:** geralmente `22–28px`, reduzido no mobile.

### Navigation

- **Style:** barra fixa de `68px`, fundo Carbon Overlay, borda fina, raio de `14px` e tipografia Label.
- **States:** links ficam mais claros e recebem um sublinhado violeta de 1px no hover ou seção ativa.
- **Mobile:** abaixo de `1000px`, links migram para um menu vertical de linhas amplas; seção ativa usa violeta suave com fundo tonal discreto.

### Project Card

O card de projeto é o componente de evidência principal. Nome, papel, descrição e acesso ao detalhe dominam; status, índice, tags e ícone apenas orientam. Acentos violeta, azul e ciano diferenciam projetos, mas nunca substituem conteúdo técnico. No mobile, a grade interna é simplificada e toda a informação essencial permanece acessível.

### Project Dialog

O diálogo detalha problema, destaques técnicos, tecnologias e links públicos. Usa overlay escuro, borda colorida pelo projeto e profundidade excepcional por ser uma camada modal. Em telas pequenas, torna-se uma superfície alinhada à base, com conteúdo em uma coluna e links em largura total.

### Section Heading

Eyebrow pequeno e técnico abre o capítulo; título grande fornece a ideia; texto opcional explica. A estrutura passa de duas colunas para uma abaixo de `700px`, preservando a ordem de leitura.

## Do's and Don'ts

### Do:

- **Do** deixar projetos reais ocuparem o maior peso visual e narrativo.
- **Do** criar profundidade com contraste tonal, composição, espaço, tipografia, bordas e divisores.
- **Do** usar Engineering Violet, Diagnostic Blue, Diagnostic Cyan e Verified Green apenas com significado claro.
- **Do** manter estados de hover, foco, ativo e seleção perceptíveis, contidos e acessíveis.
- **Do** preservar o layout responsivo e uma experiência completa com `prefers-reduced-motion`.
- **Do** usar animação para revelar relação, progresso ou continuidade, nunca para atrasar o acesso ao conteúdo.

### Don't:

- **Don't** transformar a interface em terminal fictício, dashboard, painel de observabilidade ou landing page genérica de IA.
- **Don't** aplicar glassmorphism, gradientes ou sombras a todos os cards e seções.
- **Don't** criar personalidade acumulando ornamentação, badges, brilhos, grids decorativos ou textos gigantes.
- **Don't** usar cor apenas para preencher espaço ou tornar uma superfície artificialmente futurista.
- **Don't** permitir que componentes, efeitos ou animações sejam mais importantes que os projetos apresentados.
- **Don't** introduzir novos cards quando agrupamento, alinhamento ou espaço vazio resolverem a hierarquia.
