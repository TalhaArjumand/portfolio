import { portfolio } from "../content/portfolio";
import RoleTicker from "./RoleTicker";

const Hero = () => {
  const { identity, projects } = portfolio;
  const parts = identity.name.trim().split(/\s+/);
  const firstName = parts[0] ?? "Your";
  const remainingName = parts.slice(1).join(" ") || "Name";
  const heroRoles = ["Engineer", "Systems", "Automation"];
  const heroVisual = projects[0];

  return (
    <section className="hero section" id="top">
      <div className="hero__media" aria-hidden="true">
        <figure className="hero__media-layer hero__media-layer--base">
          <img
            className="hero__media-image"
            src={heroVisual.image}
            alt=""
          />
        </figure>
        <div className="hero__media-scrim hero__media-scrim--base" />
        <div className="hero__media-scrim hero__media-scrim--left" />
        <div className="hero__media-scrim hero__media-scrim--bottom" />
      </div>

      <div className="hero__container">
        <div className="hero__intro">
          <p className="hero__eyebrow hero__eyebrow--intro">Software Engineer</p>
          <h1 className="hero__nameplate">
            <span className="hero__name-line" data-intro-split="chars">
              {firstName}
            </span>
            <span
              className="hero__name-line hero__nameplate-accent"
              data-intro-split="chars"
            >
              {remainingName}
            </span>
          </h1>

          <div className="hero__identity">
            <p className="hero__role-prefix">AI Full-Stack</p>
            <div className="hero__role-main">
              <RoleTicker roles={heroRoles} />
            </div>
          </div>

          <p className="hero__summary" data-intro-split="words">
            I build backend systems, AI workflows, and production web products
            teams can actually run.
          </p>

          <div className="hero__actions">
            {identity.ctas.map((cta, index) => (
              <a
                className={`button ${index === 0 ? "button--solid" : "button--ghost"}`}
                href={cta.href}
                key={cta.label}
              >
                {cta.label}
              </a>
            ))}
          </div>
        </div>

        <a className="hero__scroll-cue" href="#work">
          <span className="hero__scroll-copy">Scroll</span>
          <span className="hero__scroll-track">
            <span className="hero__scroll-dot" />
          </span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
