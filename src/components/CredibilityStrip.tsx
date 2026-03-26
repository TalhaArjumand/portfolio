import { portfolio } from "../content/portfolio";

const CredibilityStrip = () => {
  return (
    <section className="band section" aria-label="Credibility highlights">
      <div className="band__inner">
        {portfolio.credibility.map((item) => (
          <div className="band__item" key={item}>
            <span className="band__dot" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CredibilityStrip;
