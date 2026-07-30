interface StackMarqueeProps {
  technologies: readonly string[];
}

export function StackMarquee({ technologies }: StackMarqueeProps) {
  const repeatedTechnologies = Array.from(
    { length: 4 },
    () => technologies,
  ).flat();

  return (
    <section className="stack-section" aria-label="Tecnologias">
      <p className="sr-only">Tecnologias: {technologies.join(", ")}.</p>
      <div className="stack-track" aria-hidden="true">
        {[0, 1].map((group) => (
          <div className="stack-group" key={group}>
            {repeatedTechnologies.map((technology, index) => (
              <span key={`${group}-${technology}-${index}`}><i />{technology}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
