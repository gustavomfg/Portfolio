interface StackMarqueeProps {
  technologies: readonly string[];
}

export function StackMarquee({ technologies }: StackMarqueeProps) {
  return (
    <section className="stack-section" aria-label="Tecnologias">
      <div className="stack-track">
        {[...technologies, ...technologies].map((technology, index) => (
          <span key={`${technology}-${index}`}><i />{technology}</span>
        ))}
      </div>
    </section>
  );
}
