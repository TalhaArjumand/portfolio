import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { portfolio } from "../content/portfolio";

const hasProjectHref = (href?: string) => Boolean(href && href !== "NEEDS_INPUT");
const hasProjectImage = (image?: string) => Boolean(image);
const RAIL_COPY_LIMITS = {
  description: 112,
  impact: 92,
} as const;
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const fitRailCopy = (text: string, limit: number) => {
  if (text.length <= limit) {
    return text;
  }

  const sentenceMatch = text.match(/^.*?[.!?](?:\s|$)/);
  const firstSentence = sentenceMatch?.[0]?.trim();

  if (firstSentence && firstSentence.length <= limit) {
    return firstSentence;
  }

  const slice = text.slice(0, limit + 1).trim();
  const cutAt = slice.lastIndexOf(" ");
  const safeSlice = cutAt > Math.floor(limit * 0.7) ? slice.slice(0, cutAt) : slice;

  return `${safeSlice.replace(/[,:;\-–—]+$/, "")}…`;
};

const ProjectsRail = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const sectionStartRef = useRef(0);
  const travelDistanceRef = useRef(0);
  const [detailViews, setDetailViews] = useState<Record<string, "description" | "impact">>(
    () =>
      Object.fromEntries(
        portfolio.projects.map((project) => [project.index, "description"])
      ) as Record<string, "description" | "impact">
  );
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const syncViewport = (event?: MediaQueryList | MediaQueryListEvent) => {
      setIsDesktop(event ? event.matches : mediaQuery.matches);
    };

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => {
      mediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !isDesktop) {
      return;
    }

    const section = sectionRef.current;
    const pin = pinRef.current;
    const rail = railRef.current;
    const track = trackRef.current;
    const headline = headlineRef.current;
    const progress = progressRef.current;

    if (!section || !pin || !rail || !track || !headline || !progress) {
      return;
    }

    const syncSectionGeometry = () => {
      const viewportWidth = rail.clientWidth || section.clientWidth;
      const trackStyles = window.getComputedStyle(track);
      const trailingPadding = parseFloat(trackStyles.paddingRight) || 0;
      const travel = Math.max(
        0,
        Math.ceil(track.scrollWidth - viewportWidth - trailingPadding)
      );
      const stickyHeight = Math.round(
        pin.getBoundingClientRect().height || window.innerHeight
      );

      section.style.setProperty("--projects-travel", `${travel}px`);
      section.style.setProperty("--projects-sticky-height", `${stickyHeight}px`);

      travelDistanceRef.current = travel;
      sectionStartRef.current = window.scrollY + section.getBoundingClientRect().top;
      return travel;
    };

    const applyProgress = (scrollValue = window.scrollY) => {
      const travel = travelDistanceRef.current;

      if (travel <= 0) {
        track.style.transform = "translate3d(0px, 0, 0)";
        headline.style.transform = "translate3d(0px, 0px, 0)";
        headline.style.opacity = "1";
        progress.style.transform = "scaleX(0)";
        return;
      }

      const scrolled = clamp(scrollValue - sectionStartRef.current, 0, travel);
      const progressValue = clamp(scrolled / travel, 0, 1);
      const trackOffset = travel * progressValue;
      const headlineOffset = headline.offsetHeight * 0.18 * progressValue;

      track.style.transform = `translate3d(${-trackOffset}px, 0, 0)`;
      headline.style.transform = `translate3d(0, ${-headlineOffset}px, 0)`;
      headline.style.opacity = `${1 - progressValue * 0.72}`;
      progress.style.transform = `scaleX(${progressValue})`;
    };

    const syncGeometryAndProgress = () => {
      syncSectionGeometry();
      applyProgress();
    };

    const resizeObserver = new ResizeObserver(syncGeometryAndProgress);

    resizeObserver.observe(section);
    resizeObserver.observe(pin);
    resizeObserver.observe(rail);
    resizeObserver.observe(track);

    syncSectionGeometry();
    applyProgress();
    window.addEventListener("resize", syncGeometryAndProgress);

    const handleLenisScroll = (
      event: Event
    ) => {
      const { detail } = event as CustomEvent<{ scroll?: number }>;
      applyProgress(detail?.scroll);
    };

    window.addEventListener("portfolio:lenis-scroll", handleLenisScroll);

    return () => {
      window.removeEventListener("resize", syncGeometryAndProgress);
      window.removeEventListener("portfolio:lenis-scroll", handleLenisScroll);
      resizeObserver.disconnect();

      section.style.removeProperty("--projects-travel");
      section.style.removeProperty("--projects-sticky-height");
      track.style.removeProperty("transform");
      headline.style.removeProperty("transform");
      headline.style.removeProperty("opacity");
      progress.style.removeProperty("transform");
    };
  }, [isDesktop]);

  return (
    <section className="projects section" id="work" ref={sectionRef}>
      <div className="projects__pin" ref={pinRef}>
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

        <div className="projects__rail" ref={railRef}>
          <div className="projects__track" ref={trackRef}>
            {portfolio.projects.map((project) => (
              (() => {
                const detailView = detailViews[project.index] ?? "description";
                const detailCopy =
                  detailView === "description"
                    ? fitRailCopy(
                        project.railSummary ?? project.summary,
                        RAIL_COPY_LIMITS.description
                      )
                    : fitRailCopy(
                        project.railOutcome ?? project.outcome,
                        RAIL_COPY_LIMITS.impact
                      );

                return (
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
                    <div
                      className="project-card__detail-wrap"
                      onMouseLeave={() =>
                        setDetailViews((current) => ({
                          ...current,
                          [project.index]: "description",
                        }))
                      }
                    >
                      <div
                        className="project-card__detail-switch"
                        aria-label={`${project.title} detail view`}
                      >
                        <button
                          className={`project-card__detail-button ${
                            detailView === "description"
                              ? "project-card__detail-button--active"
                              : ""
                          }`}
                          onClick={() =>
                            setDetailViews((current) => ({
                              ...current,
                              [project.index]: "description",
                            }))
                          }
                          onFocus={() =>
                            setDetailViews((current) => ({
                              ...current,
                              [project.index]: "description",
                            }))
                          }
                          onMouseEnter={() =>
                            setDetailViews((current) => ({
                              ...current,
                              [project.index]: "description",
                            }))
                          }
                          type="button"
                        >
                          Description
                        </button>
                        <button
                          className={`project-card__detail-button ${
                            detailView === "impact"
                              ? "project-card__detail-button--active"
                              : ""
                          }`}
                          onClick={() =>
                            setDetailViews((current) => ({
                              ...current,
                              [project.index]: "impact",
                            }))
                          }
                          onFocus={() =>
                            setDetailViews((current) => ({
                              ...current,
                              [project.index]: "impact",
                            }))
                          }
                          onMouseEnter={() =>
                            setDetailViews((current) => ({
                              ...current,
                              [project.index]: "impact",
                            }))
                          }
                          type="button"
                        >
                          Impact
                        </button>
                      </div>
                      <div className="project-card__detail-panel">
                        <p className="project-card__detail-copy">{detailCopy}</p>
                      </div>
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
                );
              })()
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsRail;
