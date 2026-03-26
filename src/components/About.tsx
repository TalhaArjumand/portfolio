import { portfolio } from "../content/portfolio";

const About = () => {
  const [primaryParagraph, secondaryParagraph] = portfolio.about.paragraphs;

  return (
    <section className="section about" id="about">
      <div className="about__panel">
        <p className="about__eyebrow" data-reveal>
          About Me
        </p>
        <p className="about__statement" data-split="words">
          {primaryParagraph}
        </p>
        <p className="about__support" data-reveal>
          {secondaryParagraph}
        </p>
        <div className="about__meta" data-reveal>
          {portfolio.about.principles.map((principle) => (
            <span key={principle.title}>{principle.title}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
