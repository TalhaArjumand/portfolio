import { portfolio } from "../content/portfolio";
import SectionHeading from "./SectionHeading";

const Capabilities = () => {
  return (
    <section className="section capabilities" id="services">
      <SectionHeading
        eyebrow="What I Do"
        title="A section that feels more directional"
        description="Moncy’s reference uses this area as a strong service statement. This version keeps the same energy but frames the work around product execution, frontend quality, and delivery."
      />
      <div className="capabilities__grid">
        {portfolio.capabilities.map((capability) => (
          <article className="capability-card" data-reveal key={capability.title}>
            <div className="capability-card__frame capability-card__frame--vertical" />
            <div className="capability-card__frame capability-card__frame--horizontal" />
            <h3>{capability.title}</h3>
            <h4>Description</h4>
            <p>{capability.summary}</p>
            <h5>Skillset &amp; tools</h5>
            <div className="capability-card__tags">
              {capability.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Capabilities;
