type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

const SectionHeading = ({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) => {
  return (
    <div className="section-heading">
      <p className="section-heading__eyebrow" data-reveal>
        {eyebrow}
      </p>
      <h2 className="section-heading__title" data-split="chars">
        {title}
      </h2>
      <p className="section-heading__description" data-split="words">
        {description}
      </p>
    </div>
  );
};

export default SectionHeading;
