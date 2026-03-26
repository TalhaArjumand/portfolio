import { FiArrowUpRight } from "react-icons/fi";
import { portfolio } from "../content/portfolio";

const Contact = () => {
  const { contact } = portfolio;
  const year = new Date().getFullYear();

  return (
    <section className="section contact" id="contact">
      <h2 className="contact__title" data-split="chars">
        Contact
      </h2>
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
          {contact.links.map((link) => (
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
        </div>
        <div className="contact-column contact-column--closing" data-reveal>
          <h5>
            Designed and developed by <span>{portfolio.identity.name}</span>
          </h5>
          <p>{contact.closing}</p>
          <span className="contact__copyright">© {year}</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
