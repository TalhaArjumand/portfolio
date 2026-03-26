import { useEffect, useRef } from "react";
import { FiFileText, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { portfolio } from "../content/portfolio";

const SocialDock = () => {
  const links = portfolio.contact.links.filter((item) => item.href.startsWith("http"));
  const resumeLink = portfolio.contact.links.find((item) => item.label === "Resume");
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

      const handlePointerMove = (event: PointerEvent) => {
        const bounds = item.getBoundingClientRect();
        const x = event.clientX - bounds.left - bounds.width / 2;
        const y = event.clientY - bounds.top - bounds.height / 2;

        anchor.style.setProperty("--dock-x", `${x * 0.24}px`);
        anchor.style.setProperty("--dock-y", `${y * 0.24}px`);
      };

      const reset = () => {
        anchor.style.setProperty("--dock-x", "0px");
        anchor.style.setProperty("--dock-y", "0px");
      };

      item.addEventListener("pointermove", handlePointerMove);
      item.addEventListener("pointerleave", reset);

      return () => {
        item.removeEventListener("pointermove", handlePointerMove);
        item.removeEventListener("pointerleave", reset);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <aside className="social-dock" aria-label="Social links">
      <div className="social-dock__rail">
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
