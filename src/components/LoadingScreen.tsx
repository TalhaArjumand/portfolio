import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
  const [isReady, setIsReady] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const isActivatingRef = useRef(false);

  const activate = useCallback(() => {
    if (!isReady || isActivatingRef.current) {
      return;
    }

    isActivatingRef.current = true;
    setIsActivating(true);
    window.setTimeout(onComplete, 920);
  }, [isReady, onComplete]);

  useEffect(() => {
    let timeoutId = 0;

    const tick = () => {
      setProgress((current) => {
        if (current >= 100) {
          return current;
        }

        let increment = 1;
        let delay = 90;

        if (current < 58) {
          increment = Math.round(2 + Math.random() * 4);
          delay = 80 + Math.round(Math.random() * 40);
        } else if (current < 88) {
          increment = Math.round(Math.random() * 2);
          delay = 170 + Math.round(Math.random() * 60);
        } else {
          increment = 1;
          delay = 34;
        }

        const nextValue = Math.min(100, current + increment);

        if (nextValue >= 100) {
          window.setTimeout(() => {
            setIsReady(true);
          }, 260);
        } else {
          timeoutId = window.setTimeout(tick, delay);
        }

        return nextValue;
      });
    };

    timeoutId = window.setTimeout(tick, 120);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      activate();
    }, 520);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activate, isReady]);

  const marqueeText = useMemo(() => loadingWords.join("  •  "), []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;

    if (!wrap) {
      return;
    }

    const bounds = wrap.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    wrap.style.setProperty("--loader-x", `${x}px`);
    wrap.style.setProperty("--loader-y", `${y}px`);
  };

  return (
    <div
      className={`loading-screen ${
        isActivating ? "loading-screen--activating" : ""
      }`}
    >
      <div className="loading-screen__header">
        <span className="loading-screen__brand">Portfolio</span>
        <div className={`loading-screen__mini-loader ${isActivating ? "loading-screen__mini-loader--out" : ""}`}>
          <div className="loading-screen__mini-track">
            {Array.from({ length: 18 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
          <span className="loading-screen__mini-ball" />
        </div>
      </div>

      <div className="loading-screen__marquee">
        <div className="loading-screen__marquee-track">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>

      <div
        className={`loading-screen__wrap ${
          isActivating ? "loading-screen__wrap--active" : ""
        }`}
        onPointerMove={handlePointerMove}
        ref={wrapRef}
      >
        <span className="loading-screen__hover" />
        <button
          className={`loading-screen__button ${
            isReady ? "loading-screen__button--ready" : ""
          }`}
          disabled={!isReady}
          onClick={activate}
          type="button"
        >
          <span className="loading-screen__button-glow" />
          <span className="loading-screen__button-shell">
            <span className="loading-screen__button-copy">
              Loading <span>{progress}%</span>
            </span>
            <span className="loading-screen__button-cursor" />
          </span>
          <span className="loading-screen__button-progress">
            <span>Welcome</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoadingScreen;
