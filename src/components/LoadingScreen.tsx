import { useEffect, useMemo, useState } from "react";

type LoadingScreenProps = {
  onComplete: () => void;
};

const loadingWords = [
  "Creative Developer",
  "Frontend Builder",
  "Product Partner",
  "Creative Developer",
  "Frontend Builder",
];

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let frame = 0;
    let timeoutId = 0;
    const startedAt = performance.now();

    const tick = (time: number) => {
      const elapsed = time - startedAt;
      const nextValue = Math.min(100, Math.round((elapsed / 1400) * 100));
      setProgress(nextValue);

      if (nextValue >= 100) {
        timeoutId = window.setTimeout(() => {
          setIsExiting(true);
          window.setTimeout(onComplete, 850);
        }, 380);
        return;
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeoutId);
    };
  }, [onComplete]);

  const marqueeText = useMemo(() => loadingWords.join("  •  "), []);

  return (
    <div className={`loading-screen ${isExiting ? "loading-screen--exit" : ""}`}>
      <div className="loading-screen__header">
        <span className="loading-screen__brand">Portfolio</span>
        <span className="loading-screen__status">
          {progress < 100 ? "Preparing the experience" : "Entering"}
        </span>
      </div>

      <div className="loading-screen__marquee">
        <div className="loading-screen__marquee-track">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>

      <button
        className={`loading-screen__button ${
          progress >= 100 ? "loading-screen__button--ready" : ""
        }`}
        onClick={() => {
          setIsExiting(true);
          window.setTimeout(onComplete, 850);
        }}
        type="button"
      >
        <span className="loading-screen__button-glow" />
        <span className="loading-screen__button-copy">
          {progress >= 100 ? "Enter Portfolio" : "Loading"}
        </span>
        <span className="loading-screen__button-progress">
          {progress >= 100 ? "Welcome" : `${progress}%`}
        </span>
      </button>
    </div>
  );
};

export default LoadingScreen;
