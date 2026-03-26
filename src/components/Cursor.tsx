import { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cursor = cursorRef.current;

    if (!cursor) {
      return;
    }

    let locked = false;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const position = { x: mouse.x, y: mouse.y };
    let frame = 0;

    const setState = (target: HTMLElement | null) => {
      cursor.classList.remove("cursor--active", "cursor--icons", "cursor--disabled");
      locked = false;

      if (!target) {
        return;
      }

      const cursorTarget = target.closest<HTMLElement>("[data-cursor]");

      if (cursorTarget?.dataset.cursor === "icons") {
        const rect = cursorTarget.getBoundingClientRect();
        cursor.classList.add("cursor--icons");
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        gsap.to(cursor, {
          x: rect.left + 10,
          y: rect.top + 10,
          duration: 0.14,
          ease: "power2.out",
        });
        locked = true;
        return;
      }

      if (cursorTarget?.dataset.cursor === "disable") {
        cursor.classList.add("cursor--disabled");
        return;
      }

      if (target.closest("a, button, .project-card, .capability-card")) {
        cursor.classList.add("cursor--active");
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseOver = (event: MouseEvent) => {
      setState(event.target as HTMLElement | null);
    };

    const handleMouseOut = (event: MouseEvent) => {
      setState(event.relatedTarget as HTMLElement | null);
    };

    const loop = () => {
      if (!locked) {
        const delay = 6;
        position.x += (mouse.x - position.x) / delay;
        position.y += (mouse.y - position.y) / delay;
        gsap.set(cursor, { x: position.x, y: position.y });
      }

      frame = window.requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    frame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return <div aria-hidden="true" className="cursor" ref={cursorRef} />;
};

export default Cursor;
