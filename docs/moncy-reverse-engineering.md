# MoncyDev Reference Reverse Engineering

This document is for analysis only.

We will not use the source repo as the base for your final portfolio because:

- the README explicitly says not to clone or replicate the full website or design
- the license forbids commercial use and forbids copying the full website, design, or experience
- the project uses `gsap-trial` plugins that cannot be used for production hosting
- the original assets and 3D content are proprietary

Reference files:

- `moncydev-reference/README.md`
- `moncydev-reference/LICENSE`

## What the site actually is

Stack:

- Vite
- React 18
- TypeScript
- GSAP
- `gsap-trial`
- React Three Fiber / Three.js

Main structure:

- App shell
- desktop 3D character scene
- landing hero
- about section
- "what I do" section
- career timeline
- work showcase
- tech stack
- contact/footer

Core composition:

- `src/App.tsx`
- `src/components/MainContainer.tsx`

## What makes the site feel premium

### 1. Hero composition

- oversized typography
- role-switching animated text
- dark cinematic background
- floating or interactive 3D object on desktop

### 2. Motion system

- split-text reveal on headings and paragraphs
- scroll-linked transitions between sections
- horizontal pinned projects rail
- custom cursor and hover affordances

### 3. Visual language

- black / off-black background
- white typography
- thin borders, dashed lines, geometric framing
- sparse layout with lots of empty space

## What is reusable as an idea

- strong hero with bold name and role
- motion-led storytelling
- horizontal project gallery
- timeline section
- premium monochrome styling
- selective 3D or illustration layer

## What we should not copy

- exact layout proportions
- exact section wording
- exact animation timings
- exact CSS treatment
- exact 3D setup and assets
- exact component structure

## Trial / proprietary blockers

The repo depends on these trial-only GSAP features:

- `ScrollSmoother`
- `SplitText`

Found in:

- `src/components/Navbar.tsx`
- `src/components/utils/splitText.ts`
- `src/components/utils/initialFX.ts`

The repo also contains proprietary 3D / visual assets under `public/models`.

## Clean-room rebuild plan

We can reproduce the *effect category* without copying the implementation.

### Replacement strategy

- smooth scroll: `lenis` or native scroll
- split text animation: `split-type` + GSAP or Motion
- section reveal: GSAP core or Motion
- horizontal projects rail: custom GSAP / CSS transform logic
- 3D hero: original lightweight R3F scene, or no 3D in v1

### Recommended version for your portfolio

Keep:

- premium dark editorial feel
- strong name-driven hero
- services / skills section
- career / credibility section
- selected work rail or cards
- direct contact CTA

Change:

- use your own content architecture
- make the copy job/client oriented
- simplify the 3D dependency if needed
- replace trial plugins
- build original visuals and spacing

## Suggested information architecture for your version

- Hero
- Selected Work
- Services / Capabilities
- Experience / Credibility
- About
- Contact

Optional later:

- Testimonials
- Resume
- Writing

## Decision

We can use this repo as a design and interaction reference only.

We should build your portfolio from scratch, inspired by its feel, but with:

- original code
- original assets
- production-safe dependencies
- your own positioning and content
