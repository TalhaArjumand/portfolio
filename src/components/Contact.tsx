import { FiArrowUpRight, FiMail, FiPhone } from "react-icons/fi";
import { portfolio } from "../content/portfolio";

const Contact = () => {
  const { contact } = portfolio;

  return (
    <section className="section contact" id="contact">
      <p className="contact__eyebrow" data-reveal>
        Contact
      </p>
      <h2 className="contact__title" data-split="chars">
        Ready when the right project is.
      </h2>
      <div className="contact__grid">
        <div className="contact-column" data-reveal>
          <h4>Email</h4>
          <p>
            <a href={`mailto:${contact.email}`}>
              <FiMail /> {contact.email}
            </a>
          </p>
          <h4>Phone</h4>
          <p>
            <a href={`tel:${contact.phone}`}>
              <FiPhone /> {contact.phone}
            </a>
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
          <h5>{contact.closing}</h5>
          <p>
            Designed and developed for jobs, clients, and stronger first
            impressions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
