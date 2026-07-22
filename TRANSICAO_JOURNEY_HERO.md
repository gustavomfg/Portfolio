# Análise da Transição: Nocturne Journey → Hero (Plano Simplificado)

## 1. Diagnóstico da Causa Raiz

**Quebra de continuidade atmosférica e espacial entre duas cenas independentes:**

| Journey | Hero |
|---------|------|
| `height: 300vh`, sticky stage | `min-height: 100svh`, fluxo normal |
| CSS Variables controladas por `useScrollJourney` → `nocturne-director` | Background próprio: `radial-gradient(circle at 50% 48%, #7e48d62e, transparent 34%), #0c0c1270` |
| Fundo preto puro (`#030304`) + eclipse centralizado | `system-visual` com grid, órbitas, nodes, conexões SVG |
| Animações via CSS vars (`--eclipse-opacity`, `--identity-opacity`, etc.) | Animações via `motion/react` (initial/animate) |

**LightField** (atmosfera compartilhada) fica no `layout.tsx` — fixo no viewport, `pointer-events: none`, `z-index: -1`. **Não reage** ao scroll da Journey nem sabe da transição.

**Resultado:** No final da Journey (progress ~1.0), o eclipse já fez fade-out (`eclipseOpacity: 0` em progress 0.9), a identity aparece, mas **o fundo permanece preto**. Ao entrar na Hero, surge um novo background + system-visual + featured-rail — um "corte" visual perceptível. Não há ponte entre a aura do eclipse e o glow do system-visual.

---

## 2. Objetivo Emocional

> **Sensação de "emergir" do eclipse para dentro do mesmo ecossistema.**  
> O visitante não "troca de página" — ele **atravessa a superfície do eclipse** e acorda dentro do system-visual, como se o eclipse **fosse** o core do sistema.

---

## 3. Narrativa da Transição (Simplificada)

| Fase | Progress | O que acontece |
|------|----------|----------------|
| **Approach** | 0.65–0.85 | Eclipse atinge escala máxima; aura pulsa mais forte |
| **Breach** | 0.85–0.95 | **Nova variável `--journey-bridge-opacity`: 0 → 1**. Gradiente radial da Hero (mesmo centro, mesma cor) aparece **por trás** do eclipse via pseudo-elemento no container. Eclipse continua seu fade-out normal. |
| **Settle** | 0.95–1.0 | Bridge opacity = 1 (totalmente visível). Identity faz exit (clip-path + fade). Eclipse opacity = 0. |
| **Hero Ready** | 1.0+ | Hero entra com sua animação nativa. O gradiente radial já está presente no fundo da Journey — **sem flash preto**. |

---

## 4. Proposta Técnica Mínima (4 arquivos)

### A. `lib/nocturne-director.ts` — Uma nova variável narrativa
```ts
// Adicionar ao NocturneJourneyFrame:
journeyBridgeOpacity: number;  // 0 → 1 no intervalo 0.85–0.95
```

Lógica: `mapRange(progress, 0.85, 0.95, 0, 1)` com clamp 0–1 e easing `easeInOutCubic`.

### B. `hooks/use-scroll-journey.ts` — Repassar a variável
```ts
section.style.setProperty("--journey-bridge-opacity", frame.journeyBridgeOpacity.toString());
```

### C. `app/globals.css` — Pseudo-elemento no container do eclipse
```css
.journey-eclipse-container::before {
  content: "";
  position: absolute;
  inset: -20%; /* cobrir área maior que o eclipse */
  border-radius: 50%;
  background: radial-gradient(
    circle at 50% 48%,
    rgb(126 72 214 / 18%) 0%,
    transparent 34%
  );
  opacity: var(--journey-bridge-opacity, 0);
  pointer-events: none;
  z-index: -1; /* atrás do eclipse */
}
```
- Usa **exatamente o mesmo gradiente** do `.system-visual` (linha 169 do globals.css)
- `opacity` controlada pela CSS var — GPU only, sem repaint excessivo
- `inset: -20%` garante que o gradiente seja maior que o eclipse, cobrindo a transição

### D. `components/nocturne-journey/EclipseVisual.tsx` — Apenas garantir estrutura
O container `.journey-eclipse-container` já existe no `NocturneJourney.tsx`. O pseudo-elemento no CSS cuida do resto. **Nenhuma mudança lógica necessária**, apenas confirmar que o container tem `position: relative` ou `absolute` (já tem: `position: absolute` no CSS linha 468-470).

---

## 5. Reduced Motion

O `nocturne-director` já usa `mapRange` + `easeInOutCubic`. Em `prefers-reduced-motion`, o CSS global (linha 425-428) já zera animações/transições. A variável `--journey-bridge-opacity` saltará de 0 para 1 instantaneamente no progress 0.85 — **continuidade visual mantida** (o gradiente aparece), apenas sem interpolação suave.

---

## 6. Trade-offs

| Vantagem | Custo |
|----------|-------|
| **Apenas 4 arquivos** (dentro do limite) | Pseudo-elemento em vez de componente compartilhado — mas evita novo arquivo |
| **Uma única variável narrativa** (`--journey-bridge-opacity`) | Simples, declarativa, reversível |
| **Zero JS extra no frame loop** | Só adiciona 1 `setProperty` no hook existente |
| **Hero inalterado** | Continuidade só no sentido Journey → Hero |
| **GPU-only (opacity + transform)** | Sem `mask-image`, sem layout shift |
| **Respeita reduced motion nativamente** | CSS global já trata |

---

## 7. Arquivos a Alterar (exatos 4)

1. **`lib/nocturne-director.ts`** — +1 campo `journeyBridgeOpacity` no frame + lógica progress 0.85–0.95
2. **`hooks/use-scroll-journey.ts`** — +1 `setProperty` call
3. **`app/globals.css`** — pseudo-elemento `::before` em `.journey-eclipse-container` com gradiente da Hero + `opacity: var(--journey-bridge-opacity)`
4. **`components/nocturne-journey/EclipseVisual.tsx`** — sem mudança lógica; apenas validação de que o container suporta o pseudo-elemento (já suporta)

---

## 8. Critérios de Aceite

- [ ] Scroll down 0.85–0.95: gradiente radial da Hero aparece **suavemente** por trás do eclipse
- [ ] Scroll down 0.95–1.0: gradiente totalmente visível (opacity 1), eclipse gone, identity exiting
- [ ] Scroll up 1.0→0.85: gradiente some **suavemente**, eclipse reaparece
- [ ] `prefers-reduced-motion`: gradiente aparece/instanta em progress 0.85, sem animação — **sem flash preto**
- [ ] 1440×900 / 1280×720 / 768×1024 / 390×844 — sem layout shift, sem overflow
- [ ] `pnpm lint && pnpm typecheck && pnpm build` passam
- [ ] **Exatamente 4 arquivos modificados**

---

## 9. Riscos e Rollback

| Risco | Mitigação / Rollback |
|-------|----------------------|
| Pseudo-elemento `::before` não renderiza (z-index, stacking context) | Verificar que `.journey-eclipse-container` tem `position: absolute` e `z-index` não isola. Rollback: remover CSS do pseudo-elemento. |
| Gradiente não bate visual com Hero (tamanho/posição) | Usar **mesmos valores** do CSS: `circle at 50% 48%`, `rgb(126 72 214 / 18%)`, `transparent 34%`. Ajustar `inset` se necessário. Rollback: remover pseudo-elemento. |
| Variável vaza para fora da Journey | CSS var definida no `.journey` (já escopo). Hook seta no `section.style`. Rollback: remover `setProperty` no hook. |
| Mobile performance | Opacity + transform = GPU. 300vh unchanged. Rollback: remover feature flag via variável no director (retornar 0). |
| Reduced motion: transição instantânea pode parecer "pop" | Aceitável — continuidade visual (gradiente presente) > suavidade. Rollback: não aplicável. |

---

## 10. Intervalos Exatos de Progresso

| Variável | Início | Fim | Easing |
|----------|--------|-----|--------|
| `eclipseOpacity` (existente) | 0.65 | 0.90 | easeInOutCubic |
| `identityOpacity` (existente) | 0.43 | 0.61 | easeInOutCubic |
| **`journeyBridgeOpacity` (NOVA)** | **0.85** | **0.95** | **easeInOutCubic** |

**Sobreposição intencional:** Bridge começa quando eclipse já está em ~60% do fade-out (progress 0.85 de 0.65–0.90), garantindo que o gradiente apareça **antes** do eclipse sumir completamente.

---

## Próximos Passos

Aguardando aprovação final para implementar os 4 arquivos conforme acima.