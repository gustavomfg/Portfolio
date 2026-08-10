import Image from "next/image";

interface NocturneStudioEvidenceItem {
  id: "workspace" | "review" | "health" | "providers";
  index: string;
  label: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
}

const EVIDENCE_ITEMS: readonly NocturneStudioEvidenceItem[] = [
  {
    id: "workspace",
    index: "01",
    label: "Workspace",
    title: "Projeto, conversa e agente no mesmo ambiente",
    description: "O workspace mantém contexto, execução e acompanhamento do agente dentro do mesmo fluxo.",
    src: "/nocturne-studio/workspace.png",
    alt: "Workspace do Nocturne Studio com navegação, conversa, execução e painel do agente",
    width: 1920,
    height: 1043,
    sizes: "(max-width: 700px) calc(100vw - 32px), min(1240px, calc(100vw - 56px))",
  },
  {
    id: "review",
    index: "02",
    label: "Revisão",
    title: "Sugestões fundamentadas em evidências",
    description: "Cada revisão pode reunir origem, arquivos afetados, histórico, benefícios esperados e uma solução proposta antes da aplicação.",
    src: "/nocturne-studio/suggestion-detail.png",
    alt: "Detalhe de uma sugestão do Nocturne Studio com evidências, proveniência, histórico, arquivos afetados e solução proposta",
    width: 1194,
    height: 1013,
    sizes: "(max-width: 700px) calc(100vw - 32px), 780px",
  },
  {
    id: "health",
    index: "03",
    label: "Saúde do projeto",
    title: "Análise técnica por dimensão",
    description: "Arquitetura, segurança, testes, performance, manutenção e documentação organizadas em uma leitura única do projeto.",
    src: "/nocturne-studio/suggestions.png",
    alt: "Painel do Nocturne Studio mostrando a saúde do projeto e sugestões organizadas por dimensão técnica",
    width: 676,
    height: 1015,
    sizes: "(max-width: 700px) calc(100vw - 32px), 420px",
  },
  {
    id: "providers",
    index: "04",
    label: "Provedores",
    title: "IA sem dependência de um único acesso",
    description: "O Studio permite configurar diferentes formas de conexão, incluindo conta ChatGPT, APIs e execução local.",
    src: "/nocturne-studio/ai-settings.png",
    alt: "Configurações do Nocturne Studio com opções de Conta ChatGPT, OpenAI API, DeepSeek, OpenRouter e Ollama",
    width: 1009,
    height: 769,
    sizes: "(max-width: 700px) calc(100vw - 32px), 560px",
  },
] as const;

function EvidenceCopy({ item }: { item: NocturneStudioEvidenceItem }) {
  return (
    <div className="nocturne-evidence-copy">
      <p className="nocturne-evidence-label">
        <span>{item.index}</span>
        <span>{item.label}</span>
      </p>
      <h4>{item.title}</h4>
      <p>{item.description}</p>
    </div>
  );
}

function EvidenceFigure({ item, priority = false }: { item: NocturneStudioEvidenceItem; priority?: boolean }) {
  return (
    <figure className={`nocturne-evidence-figure nocturne-evidence-figure--${item.id}`}>
      <div className="nocturne-evidence-media">
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          sizes={item.sizes}
          unoptimized={item.id === "workspace"}
          priority={priority}
          className="nocturne-evidence-image"
          draggable={false}
        />
      </div>
      <figcaption>
        <span>{item.index}</span>
        <span>Captura real · {item.label}</span>
      </figcaption>
    </figure>
  );
}

export function NocturneStudioEvidence() {
  const [workspace, review, health, providers] = EVIDENCE_ITEMS;

  return (
    <section className="nocturne-evidence-story" aria-label="Evidências visuais do Nocturne Studio">
      <article className="nocturne-evidence-entry nocturne-evidence-entry--workspace">
        <EvidenceCopy item={workspace} />
        <EvidenceFigure item={workspace} priority />
      </article>

      <article className="nocturne-evidence-entry nocturne-evidence-entry--review">
        <EvidenceCopy item={review} />
        <EvidenceFigure item={review} />
      </article>

      <div className="nocturne-evidence-support-grid">
        <article className="nocturne-evidence-entry nocturne-evidence-entry--health">
          <EvidenceCopy item={health} />
          <EvidenceFigure item={health} />
        </article>
        <article className="nocturne-evidence-entry nocturne-evidence-entry--providers">
          <EvidenceCopy item={providers} />
          <EvidenceFigure item={providers} />
        </article>
      </div>
    </section>
  );
}
