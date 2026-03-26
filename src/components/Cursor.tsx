import { useEffect, useState } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      setActive(Boolean(target.closest("a, button, .project-card, .capability-card")));
    };

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("mouseover", handleOver);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`cursor ${active ? "cursor--active" : ""}`}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      <div className="cursor__dot" />
    </div>
  );
};

export default Cursor;
