import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";
import { portfolio } from "../content/portfolio";

gsap.registerPlugin(ScrollTrigger);

const ProjectsRail = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || window.innerWidth < 1024) {
      return;
    }

    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) {
      return;
    }

    const context = gsap.context(() => {
      const tween = gsap.to(track, {
        x: () => {
          const distance = Math.max(0, track.scrollWidth - section.clientWidth);
          return -distance;
        },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => {
            const distance = Math.max(0, track.scrollWidth - section.clientWidth);
            return `+=${distance + window.innerHeight * 0.4}`;
          },
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
      };
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section className="projects section" id="work" ref={sectionRef}>
      <div className="projects__headline">
        <p className="projects__eyebrow" data-reveal>
          Selected work
        </p>
        <h2 data-reveal>
          My <span>Work</span>
        </h2>
        <p className="projects__description" data-split="words">
          Interfaces, systems, and product surfaces designed to communicate
          clearly and feel immediate at first glance.
        </p>
      </div>

      <div className="projects__rail">
        <div className="projects__track" ref={trackRef}>
          {portfolio.projects.map((project, index) => (
            <article
              className={`project-card ${index % 2 === 1 ? "project-card--reverse" : ""}`}
              data-project-card
              key={project.index}
              style={{ ["--project-accent" as string]: project.accent }}
            >
              <div className="project-card__body">
                <div className="project-card__info">
                  <div className="project-card__header">
                    <span className="project-card__index">{project.index}</span>
                    <div className="project-card__title-wrap">
                      <h3>{project.title}</h3>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <div className="project-card__meta">
                    <h4>Tools and features</h4>
                    <p>{project.stack.join(", ")}</p>
                  </div>
                  <p className="project-card__summary">{project.summary}</p>
                  <p className="project-card__outcome">{project.outcome}</p>
                </div>

                <div className="project-card__preview">
                  <div className="project-card__preview-stage">
                    <div className="project-card__preview-glow" />
                    <div className="project-card__preview-frame">
                      <div className="project-card__preview-panel">
                        <div className="project-card__preview-bar" />
                        <div className="project-card__preview-block project-card__preview-block--one" />
                        <div className="project-card__preview-grid">
                          <div className="project-card__preview-block project-card__preview-block--two" />
                          <div className="project-card__preview-block project-card__preview-block--three" />
                        </div>
                        <div className="project-card__preview-strip">
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>
                      {project.href ? (
                        <span className="project-card__preview-link" aria-hidden="true">
                          <FiArrowUpRight />
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              {project.href ? (
                <a className="project-card__link" href={project.href}>
                  View case study <FiArrowUpRight />
                </a>
              ) : (
                <p className="project-card__link project-card__link--muted">
                  Case study available on request
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsRail;
