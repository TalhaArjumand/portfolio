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

    lenis.on("scroll", (instance) => {
      ScrollTrigger.update();
      window.dispatchEvent(
        new CustomEvent("portfolio:lenis-scroll", {
          detail: {
            limit: instance.limit,
            progress: instance.progress,
            scroll: instance.scroll,
          },
        })
      );
    });
    animationFrame = window.requestAnimationFrame(update);

    const navLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".topbar__nav a[data-href]")
    );
    const brandLink = document.querySelector<HTMLAnchorElement>(".topbar__brand");

    const handleNavClick = (event: Event) => {
      if (window.matchMedia("(max-width: 1024px)").matches) {
        return;
      }

      event.preventDefault();
      const anchor = event.currentTarget as HTMLAnchorElement;
      const section = anchor.dataset.href;

      if (!section) {
        return;
      }

      lenis.scrollTo(section, {
        duration: 1.25,
      });
    };

    const handleBrandClick = (event: Event) => {
      if (window.matchMedia("(max-width: 1024px)").matches) {
        return;
      }

      event.preventDefault();
      lenis.scrollTo(0, { duration: 1.1 });
    };

    navLinks.forEach((link) => {
      link.addEventListener("click", handleNavClick);
    });
    brandLink?.addEventListener("click", handleBrandClick);

    const splits: SplitType[] = [];

    const context = gsap.context(() => {
      const hero = document.querySelector<HTMLElement>(".hero");
      gsap.set(".social-dock, .social-dock__rail, .social-dock__icon", {
        clearProps: "all",
      });
      const heroMediaImages = gsap.utils.toArray<HTMLElement>(".hero__media-image");
      const introCharSplits: SplitType[] = [];
      const introWordSplits: SplitType[] = [];
      const capabilityTitleSplits: SplitType[] = [];

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
        .querySelectorAll<HTMLElement>('[data-capability-title-split="chars"]')
        .forEach((element) => {
          const split = new SplitType(element, { types: "chars" });
          splits.push(split);
          capabilityTitleSplits.push(split);
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

      const capabilityTitle = document.querySelector<HTMLElement>(".capabilities__title");
      const capabilityKicker = document.querySelector<HTMLElement>(
        ".capabilities__title-kicker .capabilities__title-line-inner"
      );
      const [capabilityMainSplit, capabilityAccentSplit] = capabilityTitleSplits;

      if (capabilityTitle) {
        const capabilityTitleTl = gsap.timeline({
          scrollTrigger: {
            trigger: capabilityTitle,
            start: "top 84%",
          },
        });

        if (capabilityKicker) {
          capabilityTitleTl.from(
            capabilityKicker,
            {
              autoAlpha: 0,
              y: 18,
              letterSpacing: "0.38em",
              duration: 0.65,
              ease: "power2.out",
            },
            0
          );
        }

        if (capabilityMainSplit?.chars) {
          capabilityTitleTl.from(
            capabilityMainSplit.chars,
            {
              autoAlpha: 0,
              yPercent: 118,
              rotate: 4,
              duration: 0.92,
              ease: "power3.out",
              stagger: 0.018,
            },
            0.08
          );
        }

        if (capabilityAccentSplit?.chars) {
          capabilityTitleTl.from(
            capabilityAccentSplit.chars,
            {
              autoAlpha: 0,
              yPercent: 122,
              rotate: 2,
              duration: 0.95,
              ease: "power3.out",
              stagger: 0.022,
            },
            0.24
          );
        }
      }

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
        .from(".topbar > *", {
          autoAlpha: 0,
          y: -18,
          duration: 0.65,
          stagger: 0.08,
        }, 0.08)
        .from(
          [".hero__eyebrow--intro", ".hero__role-prefix"],
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
          ".hero__identity",
          {
            autoAlpha: 0,
            y: 18,
            duration: 0.9,
          },
          0.3
        )
        .from(
          ".hero__role-main",
          {
            autoAlpha: 0,
            clipPath: "inset(0 0 100% 0)",
            y: 22,
            duration: 0.9,
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
          ".hero__actions",
          {
            autoAlpha: 0,
            y: 18,
            duration: 0.7,
          },
          0.68
        )
        .from(
          ".hero__media",
          {
            autoAlpha: 0,
            scale: 1.06,
            duration: 1.25,
          },
          0.12
        )
        .from(
          ".hero__scroll-cue",
          {
            autoAlpha: 0,
            y: 16,
            duration: 0.7,
          },
          0.78
        );

      heroMediaImages.forEach((image, index) => {
        gsap.to(image, {
          yPercent: index % 2 === 0 ? -3 : 3,
          xPercent: index % 2 === 0 ? 2 : -2,
          duration: 14 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      gsap.to(".hero__scroll-dot", {
        y: 12,
        autoAlpha: 0.25,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      if (hero) {
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
            { yPercent: -12, autoAlpha: 0.2, ease: "none" },
            0
          )
          .to(
            ".hero__scroll-cue",
            { autoAlpha: 0, y: 16, ease: "none" },
            0
          );
      }
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleNavClick);
      });
      brandLink?.removeEventListener("click", handleBrandClick);
      lenis.destroy();
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      splits.forEach((split) => split.revert());
    };
  }, [enabled]);
};
