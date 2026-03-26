import { portfolio } from "../content/portfolio";

const TechStack = () => {
  const stackItems = Array.from(
    new Set([
      ...portfolio.capabilities.flatMap((capability) => capability.tags),
      ...portfolio.projects.flatMap((project) => project.stack),
      "GSAP",
      "Motion Design",
    ])
  );

  const firstLane = [...stackItems, ...stackItems];
  const secondLane = [...stackItems.slice().reverse(), ...stackItems.slice().reverse()];

  return (
    <section className="section tech-stack" id="stack">
      <div className="tech-stack__header">
        <p className="section-heading__eyebrow" data-reveal>
          Tools I Work With
        </p>
        <h2 className="tech-stack__title" data-reveal>
          My Techstack
        </h2>
      </div>

      <div className="tech-stack__lanes" data-reveal>
        <div className="tech-stack__lane">
          <div className="tech-stack__track">
            {firstLane.map((item, index) => (
              <span className="tech-stack__pill" key={`${item}-${index}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="tech-stack__lane tech-stack__lane--reverse">
          <div className="tech-stack__track">
            {secondLane.map((item, index) => (
              <span className="tech-stack__pill" key={`${item}-reverse-${index}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
