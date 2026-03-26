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
            <div className="timeline__row">
              <div className="timeline__info">
                <div className="timeline__role-wrap">
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                </div>
                <strong>{item.period}</strong>
              </div>
              <div className="timeline__content">
                <p>{item.summary}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
