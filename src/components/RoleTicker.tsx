import { startTransition, useEffect, useState } from "react";

type RoleTickerProps = {
  roles: string[];
};

const RoleTicker = ({ roles }: RoleTickerProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      startTransition(() => {
        setActiveIndex((current) => (current + 1) % roles.length);
      });
    }, 2400);

    return () => window.clearInterval(intervalId);
  }, [roles.length]);

  return (
    <div className="role-ticker" aria-live="polite">
      <span className="role-ticker__label">Shaped for</span>
      <div className="role-ticker__window">
        <div
          className="role-ticker__track"
          style={{ transform: `translateY(-${activeIndex * 100}%)` }}
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
