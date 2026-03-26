import { portfolio } from "../content/portfolio";
import RoleTicker from "./RoleTicker";

const Hero = () => {
  const { identity } = portfolio;
  const parts = identity.name.trim().split(/\s+/);
  const firstName = parts[0] ?? "Your";
  const remainingName = parts.slice(1).join(" ") || "Name";

  return (
    <section className="hero section" id="top">
      <div className="hero__intro">
        <p className="hero__eyebrow">Hello! I'm</p>
        <h1 className="hero__nameplate">
          <span data-split="chars">{firstName}</span>
          <br />
          <span className="hero__nameplate-accent" data-split="chars">
            {remainingName}
          </span>
        </h1>
      </div>

      <div className="hero__stage hero__panel">
        <div className="hero__stage-lines hero__stage-lines--top" />
        <div className="hero__stage-lines hero__stage-lines--bottom" />
        <div className="hero__stage-rim" />
        <div className="hero__orb" />
        <div className="hero__atmosphere" />
        <div className="hero__figure">
          <div className="hero__figure-head" />
          <div className="hero__figure-neck" />
          <div className="hero__figure-body" />
          <div className="hero__figure-arm hero__figure-arm--left" />
          <div className="hero__figure-arm hero__figure-arm--right" />
          <div className="hero__figure-leg hero__figure-leg--left" />
          <div className="hero__figure-leg hero__figure-leg--right" />
          <div className="hero__figure-chair" />
        </div>
        <div className="hero__desk">
          <div className="hero__desk-top" />
          <div className="hero__desk-leg hero__desk-leg--left" />
          <div className="hero__desk-leg hero__desk-leg--right" />
        </div>
        <div className="hero__screen">
          <div className="hero__screen-bar">
            <span />
            <span />
            <span />
          </div>
          <div className="hero__screen-body">
            <div className="hero__screen-chip">Live build</div>
            <div className="hero__screen-line hero__screen-line--strong" />
            <div className="hero__screen-line" />
            <div className="hero__screen-line hero__screen-line--short" />
            <div className="hero__screen-tags">
              <span>UI Systems</span>
              <span>Frontend</span>
              <span>Delivery</span>
            </div>
          </div>
        </div>
        <div className="hero__keyboard" />
      </div>

      <aside className="hero__info">
        <p className="hero__eyebrow">{identity.location}</p>
        <h2 className="hero__label">A Creative</h2>
        <RoleTicker roles={[...identity.rotatingRoles]} />
        <p className="hero__summary" data-split="words">
          {identity.oneLiner}
        </p>
        <p className="hero__support">{identity.supportLine}</p>
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
        <div className="hero__availability">{identity.availability}</div>
      </aside>
    </section>
  );
};

export default Hero;
