# Version Lock

## Final Direction

We are building an original portfolio inspired by premium motion-led developer portfolios, but without copying any protected layout, code, or assets.

## Locked Stack

- Bundler: Vite `8.0.3`
- UI: React `19.2.4`
- Language: TypeScript `6.0.2`
- Styling: Handwritten CSS with design tokens
- Motion: GSAP core `3.14.2` + ScrollTrigger
- Text splitting: SplitType `0.3.4`
- Smooth scrolling: Lenis `1.3.21`
- Icons: React Icons `5.6.0`
- Fonts: `@fontsource/sora` and `@fontsource/instrument-serif`

## Why this stack

- simpler than a heavy full-stack framework
- easy local development
- easy deployment to Vercel or Netlify
- original implementation
- production-safe replacements for trial-only GSAP plugins

## Boundaries

We will not use:

- `gsap-trial`
- `ScrollSmoother`
- `SplitText`
- proprietary 3D assets
- copied section layouts

## Content model

The site content will be driven from one file:

- `src/content/portfolio.ts`

That file will contain:

- identity
- hero copy
- services
- projects
- experience
- contact links

## First release scope

- one-page portfolio
- premium hero
- selected work
- capabilities
- experience timeline
- about section
- contact section
- responsive layout
- smooth motion

## Deferred from v1

- CMS
- blog
- custom 3D scene
- backend contact form
- multilingual support
