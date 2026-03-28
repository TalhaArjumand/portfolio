import { FiFileText, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiUpwork } from "react-icons/si";
import { portfolio } from "../content/portfolio";

const getDockIcon = (label: string) => {
  if (label === "LinkedIn") {
    return <FiLinkedin aria-hidden="true" />;
  }

  if (label === "GitHub") {
    return <FiGithub aria-hidden="true" />;
  }

  if (label === "Upwork") {
    return <SiUpwork aria-hidden="true" />;
  }

  return null;
};

const SocialDock = () => {
  const socialLinks = portfolio.contact.links.filter(
    (item) =>
      item.href.startsWith("http") &&
      item.href !== "NEEDS_INPUT" &&
      ["LinkedIn", "GitHub", "Upwork"].includes(item.label)
  );
  const resumeLink = portfolio.contact.links.find(
    (item) => item.label === "Resume" && item.href !== "NEEDS_INPUT"
  );

  return (
    <aside className="social-dock" aria-label="Social links">
      <div className="social-dock__rail" id="social">
        <span className="social-dock__item">
          <a
            aria-label="Email"
            className="social-dock__icon"
            data-cursor="disable"
            href={`mailto:${portfolio.contact.email}`}
          >
            <FiMail aria-hidden="true" />
          </a>
        </span>

        {socialLinks.map((link) => (
          <span className="social-dock__item" key={link.label}>
            <a
              aria-label={link.label}
              className="social-dock__icon"
              data-cursor="disable"
              href={link.href}
              rel="noreferrer"
              target="_blank"
            >
              {getDockIcon(link.label)}
            </a>
          </span>
        ))}
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
