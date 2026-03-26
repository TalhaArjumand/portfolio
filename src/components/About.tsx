import { portfolio } from "../content/portfolio";
import SectionHeading from "./SectionHeading";

const About = () => {
  return (
    <section className="section about" id="about">
      <div className="about__intro">
        <SectionHeading
          eyebrow="About Me"
          title="A cleaner read on how you think and work"
          description="The reference keeps this section simple. That is the right instinct. This area should be compact, legible, and useful."
        />
      </div>

      <div className="about__grid">
        <div className="about__copy" data-reveal>
          {portfolio.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="about__principles">
          {portfolio.about.principles.map((principle) => (
            <article className="principle-card" data-reveal key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
