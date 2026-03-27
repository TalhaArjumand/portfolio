import { startTransition, useEffect, useState } from "react";

type RoleTickerProps = {
  roles: string[];
};

const RoleTicker = ({ roles }: RoleTickerProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const shift = roles.length > 0 ? 100 / roles.length : 100;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      startTransition(() => {
        setActiveIndex((current) => (current + 1) % roles.length);
      });
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, [roles.length]);

  return (
    <div className="role-ticker" aria-live="polite">
      <div className="role-ticker__window">
        <div
          className="role-ticker__track"
          style={{ transform: `translateY(-${activeIndex * shift}%)` }}
        >
          {roles.map((role) => (
            <span className="role-ticker__item" key={role}>
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleTicker;
