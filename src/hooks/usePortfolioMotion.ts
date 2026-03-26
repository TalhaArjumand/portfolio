import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export const usePortfolioMotion = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: true,
    });

    let animationFrame = 0;

    const update = (time: number) => {
      lenis.raf(time);
      animationFrame = window.requestAnimationFrame(update);
    };

    lenis.on("scroll", ScrollTrigger.update);
    animationFrame = window.requestAnimationFrame(update);

    const splits: SplitType[] = [];

    const context = gsap.context(() => {
      const hero = document.querySelector<HTMLElement>(".hero");
      const stage = document.querySelector<HTMLElement>(".hero__stage");
      const figure = document.querySelector<HTMLElement>(".hero__figure");
      const screen = document.querySelector<HTMLElement>(".hero__screen");
      const orb = document.querySelector<HTMLElement>(".hero__orb");
      const rim = document.querySelector<HTMLElement>(".hero__stage-rim");
      const atmosphere =
        document.querySelector<HTMLElement>(".hero__atmosphere");
      const introCharSplits: SplitType[] = [];
      const introWordSplits: SplitType[] = [];

      document
        .querySelectorAll<HTMLElement>('[data-intro-split="chars"]')
        .forEach((element) => {
          const split = new SplitType(element, { types: "chars" });
          splits.push(split);
          introCharSplits.push(split);
        });

      document
        .querySelectorAll<HTMLElement>('[data-intro-split="words"]')
        .forEach((element) => {
          const split = new SplitType(element, { types: "words" });
          splits.push(split);
          introWordSplits.push(split);
        });

      document
        .querySelectorAll<HTMLElement>('[data-split="chars"]')
        .forEach((element) => {
          if (element.dataset.introSplit) {
            return;
          }

          const split = new SplitType(element, { types: "chars" });
          splits.push(split);

          gsap.fromTo(
            split.chars,
            { autoAlpha: 0, yPercent: 100, rotate: 6 },
            {
              autoAlpha: 1,
              yPercent: 0,
              rotate: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.02,
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
              },
            }
          );
        });

      document
        .querySelectorAll<HTMLElement>('[data-split="words"]')
        .forEach((element) => {
          if (element.dataset.introSplit) {
            return;
          }

          const split = new SplitType(element, { types: "words" });
          splits.push(split);

          gsap.fromTo(
            split.words,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.03,
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
              },
            }
          );
        });

      gsap.utils
        .toArray<HTMLElement>("[data-reveal]")
        .filter(
          (element) =>
            !element.matches(".capability-card") &&
            !element.matches(".timeline__item")
        )
        .forEach((element, index) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 26 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              delay: index === 0 ? 0.08 : 0,
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
              },
            }
          );
        });

      gsap.utils
        .toArray<HTMLElement>(".capability-card")
        .forEach((element, index) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 36, clipPath: "inset(0 0 16% 0)" },
            {
              autoAlpha: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.82,
              ease: "power3.out",
              delay: index * 0.04,
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
              },
            }
          );
        });

      gsap.utils
        .toArray<HTMLElement>(".timeline__item")
        .forEach((element, index) => {
          gsap.fromTo(
            element,
            {
              autoAlpha: 0,
              x: index % 2 === 0 ? -36 : 36,
            },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 86%",
              },
            }
          );
        });

      gsap.fromTo(
        ".nav-fade",
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=180",
            scrub: true,
          },
        }
      );

      const heroIntro = gsap.timeline({ defaults: { ease: "power3.out" } });
      const introChars = introCharSplits.flatMap((split) => split.chars ?? []);
      const introWords = introWordSplits.flatMap((split) => split.words ?? []);

      heroIntro
        .from(
          ".page-shell__circle",
          {
            autoAlpha: 0,
            scale: 0.7,
            duration: 0.9,
            stagger: 0.12,
          },
          0
        )
        .from(".topbar > *", {
          autoAlpha: 0,
          y: -18,
          duration: 0.65,
          stagger: 0.08,
        }, 0.08)
        .from(
          ".social-dock a",
          {
            autoAlpha: 0,
            x: -18,
            duration: 0.55,
            stagger: 0.08,
          },
          0.18
        )
        .from(
          [".hero__eyebrow--intro", ".hero__eyebrow--info", ".hero__label"],
          {
            autoAlpha: 0,
            y: 26,
            filter: "blur(4px)",
            duration: 0.8,
            stagger: 0.08,
          },
          0.22
        )
        .from(
          introChars,
          {
            autoAlpha: 0,
            yPercent: 118,
            rotate: 5,
            filter: "blur(5px)",
            duration: 1.1,
            stagger: 0.018,
          },
          0.28
        )
        .from(
          ".hero__info",
          {
            autoAlpha: 0,
            x: 34,
            duration: 0.9,
          },
          0.3
        )
        .from(
          ".role-ticker__window",
          {
            autoAlpha: 0,
            clipPath: "inset(0 0 100% 0)",
            duration: 0.92,
          },
          0.46
        )
        .from(
          introWords,
          {
            autoAlpha: 0,
            y: 28,
            filter: "blur(4px)",
            duration: 0.8,
            stagger: 0.045,
          },
          0.56
        )
        .from(
          [".hero__support", ".hero__actions", ".hero__availability"],
          {
            autoAlpha: 0,
            y: 18,
            duration: 0.7,
            stagger: 0.08,
          },
          0.68
        )
        .from(
          ".hero__stage",
          {
            autoAlpha: 0,
            y: 48,
            scale: 0.94,
            duration: 1.05,
          },
          0.18
        )
        .from(
          [".hero__stage-rim", ".hero__orb", ".hero__atmosphere"],
          {
            autoAlpha: 0,
            scale: 0.7,
            duration: 1,
            stagger: 0.1,
          },
          0.22
        )
        .from(
          [
            ".hero__figure-head",
            ".hero__figure-neck",
            ".hero__figure-body",
            ".hero__figure-arm",
            ".hero__figure-leg",
            ".hero__figure-chair",
            ".hero__desk",
            ".hero__screen",
            ".hero__keyboard",
          ],
          {
            autoAlpha: 0,
            y: 26,
            duration: 0.85,
            stagger: 0.04,
          },
          0.4
        );

      if (figure && screen && orb && rim && atmosphere) {
        gsap.to(figure, {
          y: -10,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(screen, {
          y: -7,
          rotation: -1.2,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(orb, {
          y: -10,
          x: 10,
          scale: 1.03,
          duration: 4.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(atmosphere, {
          opacity: 0.78,
          scale: 1.08,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        if (stage) {
          const figureX = gsap.quickTo(figure, "x", {
            duration: 0.6,
            ease: "power3.out",
          });
          const figureY = gsap.quickTo(figure, "y", {
            duration: 0.6,
            ease: "power3.out",
          });
          const screenX = gsap.quickTo(screen, "x", {
            duration: 0.65,
            ease: "power3.out",
          });
          const screenY = gsap.quickTo(screen, "y", {
            duration: 0.65,
            ease: "power3.out",
          });
          const orbX = gsap.quickTo(orb, "x", {
            duration: 0.9,
            ease: "power3.out",
          });
          const orbY = gsap.quickTo(orb, "y", {
            duration: 0.9,
            ease: "power3.out",
          });
          const rimX = gsap.quickTo(rim, "x", {
            duration: 0.9,
            ease: "power3.out",
          });

          const handlePointerMove = (event: PointerEvent) => {
            const bounds = stage.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;

            figureX(x * 18);
            figureY(y * 14);
            screenX(x * 12);
            screenY(y * 10);
            orbX(x * -26);
            orbY(y * -18);
            rimX(x * -16);
          };

          const handlePointerLeave = () => {
            figureX(0);
            figureY(0);
            screenX(0);
            screenY(0);
            orbX(0);
            orbY(0);
            rimX(0);
          };

          stage.addEventListener("pointermove", handlePointerMove);
          stage.addEventListener("pointerleave", handlePointerLeave);

          gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          })
            .to(
              ".hero__intro",
              { yPercent: -24, autoAlpha: 0.15, ease: "none" },
              0
            )
            .to(
              ".hero__info",
              { yPercent: -16, autoAlpha: 0.16, ease: "none" },
              0
            )
            .to(
              figure,
              { yPercent: -22, xPercent: 7, scale: 0.92, ease: "none" },
              0
            )
            .to(
              screen,
              { yPercent: -12, xPercent: -8, rotate: -5, ease: "none" },
              0
            )
            .to(
              orb,
              { yPercent: -14, scale: 1.1, autoAlpha: 0.32, ease: "none" },
              0
            )
            .to(
              rim,
              { scale: 0.72, autoAlpha: 0.22, ease: "none" },
              0
            );

          return () => {
            stage.removeEventListener("pointermove", handlePointerMove);
            stage.removeEventListener("pointerleave", handlePointerLeave);
          };
        }
      }
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      lenis.destroy();
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      splits.forEach((split) => split.revert());
    };
  }, [enabled]);
};
