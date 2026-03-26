import { FiArrowUpRight } from "react-icons/fi";
import { portfolio } from "../content/portfolio";

const Contact = () => {
  const { contact } = portfolio;
  const year = new Date().getFullYear();
  const socialLinks = contact.links.filter(
    (link) => link.href.startsWith("http") && link.href !== "NEEDS_INPUT"
  );
  const hasResume = contact.links.some(
    (link) => link.label === "Resume" && link.href !== "NEEDS_INPUT"
  );

  return (
    <section className="section contact" id="contact">
      <div className="contact__intro">
        <p className="contact__eyebrow" data-reveal>
          Let&apos;s Connect
        </p>
        <h2 className="contact__title" data-split="chars">
          Contact
        </h2>
        <p className="contact__lede" data-split="words">
          For hiring, freelance work, or product conversations that need both
          clarity and execution.
        </p>
      </div>
      <div className="contact__grid">
        <div className="contact-column" data-reveal>
          <h4>Email</h4>
          <p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <h4>Phone</h4>
          <p>
            <a href={`tel:${contact.phone}`}>{contact.phone}</a>
          </p>
        </div>
        <div className="contact-column" data-reveal>
          <h4>Social</h4>
          {socialLinks.map((link) => (
            <a
              className="contact-social"
              href={link.href}
              key={link.label}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              target={link.href.startsWith("http") ? "_blank" : undefined}
            >
              {link.label} <FiArrowUpRight />
            </a>
          ))}
          {!hasResume ? <p>Resume available on request.</p> : null}
        </div>
        <div className="contact-column contact-column--closing" data-reveal>
          <h5>{contact.closing}</h5>
          <p>
            Designed and developed by <span>{portfolio.identity.name}</span>.
            Built to support both applications and client conversations.
          </p>
          <div className="contact__closing-meta">
            <span>{portfolio.identity.availability}</span>
            <span className="contact__copyright">© {year}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
