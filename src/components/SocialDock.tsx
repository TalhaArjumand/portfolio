import { useEffect, useRef } from "react";
import { FiFileText, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { portfolio } from "../content/portfolio";

const SocialDock = () => {
  const links = portfolio.contact.links.filter(
    (item) => item.href.startsWith("http") && item.href !== "NEEDS_INPUT"
  );
  const resumeLink = portfolio.contact.links.find(
    (item) => item.label === "Resume" && item.href !== "NEEDS_INPUT"
  );
  const itemRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cleanups = itemRefs.current.map((item) => {
      const anchor = item?.querySelector<HTMLAnchorElement>(".social-dock__icon");

      if (!item || !anchor) {
        return () => undefined;
      }

      const bounds = item.getBoundingClientRect();
      let mouseX = bounds.width / 2;
      let mouseY = bounds.height / 2;
      let currentX = 0;
      let currentY = 0;
      let frame = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        anchor.style.setProperty("--dock-x", `${currentX - bounds.width / 2}px`);
        anchor.style.setProperty("--dock-y", `${currentY - bounds.height / 2}px`);

        frame = window.requestAnimationFrame(updatePosition);
      };

      const handleMouseMove = (event: MouseEvent) => {
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = bounds.width / 2;
          mouseY = bounds.height / 2;
        }
      };

      document.addEventListener("mousemove", handleMouseMove);
      frame = window.requestAnimationFrame(updatePosition);

      return () => {
        window.cancelAnimationFrame(frame);
        document.removeEventListener("mousemove", handleMouseMove);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <aside className="social-dock icons-section" aria-label="Social links">
      <div className="social-dock__rail" data-cursor="icons" id="social">
        <span
          className="social-dock__item"
          ref={(node) => {
            itemRefs.current[0] = node;
          }}
        >
          <a className="social-dock__icon" href={`mailto:${portfolio.contact.email}`}>
            <FiMail />
          </a>
        </span>
        {links.find((item) => item.label === "LinkedIn") ? (
          <span
            className="social-dock__item"
            ref={(node) => {
              itemRefs.current[1] = node;
            }}
          >
            <a
              className="social-dock__icon"
              href={links.find((item) => item.label === "LinkedIn")!.href}
              rel="noreferrer"
              target="_blank"
            >
              <FiLinkedin />
            </a>
          </span>
        ) : null}
        {links.find((item) => item.label === "GitHub") ? (
          <span
            className="social-dock__item"
            ref={(node) => {
              itemRefs.current[2] = node;
            }}
          >
            <a
              className="social-dock__icon"
              href={links.find((item) => item.label === "GitHub")!.href}
              rel="noreferrer"
              target="_blank"
            >
              <FiGithub />
            </a>
          </span>
        ) : null}
      </div>

      {resumeLink ? (
        <a className="resume-button hover-link" href={resumeLink.href}>
          <span className="hover-in">
            <span>Resume</span>
            <div>Resume</div>
          </span>
          <span className="resume-button__icon">
            <FiFileText />
          </span>
        </a>
      ) : null}
    </aside>
  );
};

export default SocialDock;
