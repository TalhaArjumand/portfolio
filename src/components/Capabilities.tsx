import { useState } from "react";
import { portfolio } from "../content/portfolio";

const Capabilities = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section capabilities" id="services">
      <div className="capabilities__layout">
        <div className="capabilities__intro">
          <p className="section-heading__eyebrow" data-reveal>
            What I Do
          </p>
          <h2 className="capabilities__title" data-reveal>
            W<span className="capabilities__title-lite">hat</span>
            <br />
            I<span className="capabilities__title-accent"> Do</span>
          </h2>
          <p className="capabilities__description" data-split="words">
            Frontend execution, polished interfaces, and structured delivery for
            teams that need the product to look sharp and move clearly.
          </p>
        </div>

        <div className="capabilities__stack">
          {portfolio.capabilities.map((capability, index) => (
            <article
              className={`capability-card ${
                activeIndex === index ? "capability-card--active" : ""
              }`}
              data-reveal
              key={capability.title}
              onFocus={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              onTouchStart={() => setActiveIndex(index)}
              tabIndex={0}
            >
              <div className="capability-card__frame capability-card__frame--vertical" />
              <div className="capability-card__frame capability-card__frame--horizontal" />
              <div className="capability-card__content">
                <h3>{capability.title}</h3>
                <h4>Description</h4>
                <p>{capability.summary}</p>
                <h5>Skillset &amp; tools</h5>
                <div className="capability-card__tags">
                  {capability.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <span className="capability-card__arrow" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
