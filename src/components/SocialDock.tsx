import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { portfolio } from "../content/portfolio";

const SocialDock = () => {
  const links = portfolio.contact.links.filter((item) => item.href.startsWith("http"));

  return (
    <aside className="social-dock" aria-label="Social links">
      <a href={`mailto:${portfolio.contact.email}`}>
        <FiMail />
      </a>
      {links.find((item) => item.label === "LinkedIn") ? (
        <a
          href={links.find((item) => item.label === "LinkedIn")!.href}
          rel="noreferrer"
          target="_blank"
        >
          <FiLinkedin />
        </a>
      ) : null}
      {links.find((item) => item.label === "GitHub") ? (
        <a
          href={links.find((item) => item.label === "GitHub")!.href}
          rel="noreferrer"
          target="_blank"
        >
          <FiGithub />
        </a>
      ) : null}
    </aside>
  );
};

export default SocialDock;
