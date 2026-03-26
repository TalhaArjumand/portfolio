import { portfolio } from "../content/portfolio";
import SectionHeading from "./SectionHeading";

const Experience = () => {
  return (
    <section className="section experience" id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="My career & experience"
        description="This area should read like progression, ownership, and responsibility. It does not need many entries, but it does need structure."
      />
      <div className="timeline">
        {portfolio.experience.map((item) => (
          <article className="timeline__item" data-reveal key={item.period}>
            <div className="timeline__marker" />
            <div className="timeline__content">
              <div className="timeline__topline">
                <p>{item.period}</p>
                <span>{item.company}</span>
              </div>
              <h3>{item.role}</h3>
              <p>{item.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
