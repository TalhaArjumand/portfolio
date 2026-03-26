import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";
import { portfolio } from "../content/portfolio";

gsap.registerPlugin(ScrollTrigger);

const hasProjectHref = (href?: string) => Boolean(href && href !== "NEEDS_INPUT");
const hasProjectImage = (image?: string) => Boolean(image);

const ProjectsRail = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || window.innerWidth < 1024) {
      return;
    }

    const section = sectionRef.current;
    const track = trackRef.current;
    const headline = headlineRef.current;
    const progress = progressRef.current;

    if (!section || !track || !headline || !progress) {
      return;
    }

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card", section);
      const previewFrames = gsap.utils.toArray<HTMLElement>(
        ".project-card__preview-frame",
        section
      );
      const infoBlocks = gsap.utils.toArray<HTMLElement>(
        ".project-card__info",
        section
      );

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => {
            const distance = Math.max(0, track.scrollWidth - section.clientWidth);
            return `+=${distance + window.innerHeight * 0.8}`;
          },
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          headline,
          {
            yPercent: -32,
            autoAlpha: 0.18,
            ease: "none",
          },
          0
        )
        .fromTo(
          progress,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
          },
          0
        )
        .to(
          track,
          {
            x: () => {
              const distance = Math.max(0, track.scrollWidth - section.clientWidth);
              return -distance;
            },
            ease: "none",
          },
          0
        )
        .to(
          cards,
          {
            y: (index) => (index % 2 === 0 ? -28 : 28),
            ease: "none",
            stagger: 0,
          },
          0
        )
        .to(
          previewFrames,
          {
            y: (index) => (index % 2 === 0 ? -20 : 20),
            rotate: (index) => (index % 2 === 0 ? -3 : 3),
            ease: "none",
            stagger: 0,
          },
          0
        )
        .to(
          infoBlocks,
          {
            y: (index) => (index % 2 === 0 ? 16 : -16),
            ease: "none",
            stagger: 0,
          },
          0
        );

      return () => {
        timeline.kill();
      };
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section className="projects section" id="work" ref={sectionRef}>
      <div className="projects__headline" ref={headlineRef}>
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
      <div className="projects__progress" aria-hidden="true">
        <span className="projects__progress-fill" ref={progressRef} />
      </div>

      <div className="projects__rail">
        <div className="projects__track" ref={trackRef}>
          {portfolio.projects.map((project) => (
            <article
              className="project-card"
              data-project-card
              key={project.index}
              style={{ ["--project-accent" as string]: project.accent }}
            >
              <div className="project-card__body">
                <div className="project-card__header project-card__info">
                  <span className="project-card__index">{project.index}</span>
                  <div className="project-card__title-wrap">
                    <p>{project.category}</p>
                    <h3>{project.title}</h3>
                  </div>
                </div>

                <div className="project-card__preview">
                  <div className="project-card__preview-stage">
                    <div className="project-card__preview-glow" />
                    <div
                      className={`project-card__preview-frame ${
                        hasProjectImage(project.image)
                          ? "project-card__preview-frame--image"
                          : ""
                      }`}
                      data-cursor="disable"
                    >
                      {hasProjectImage(project.image) ? (
                        <>
                          <img
                            className="project-card__image"
                            src={project.image}
                            alt={`${project.title} project visual`}
                            loading="lazy"
                          />
                          <div className="project-card__image-overlay" />
                        </>
                      ) : (
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
                      )}
                      {hasProjectHref(project.href) ? (
                        <span className="project-card__preview-link" aria-hidden="true">
                          <FiArrowUpRight />
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="project-card__info project-card__info--details">
                  <div className="project-card__meta">
                    <h4>Core stack</h4>
                    <div className="project-card__stack">
                      {project.stack.map((item) => (
                        <span className="project-card__stack-chip" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="project-card__summary">{project.summary}</p>
                  <div className="project-card__impact">
                    <span>Impact</span>
                    <p>{project.outcome}</p>
                  </div>
                </div>
              </div>
              {hasProjectHref(project.href) ? (
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
