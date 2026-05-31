# Sweet Garden Hotel

A cinematic, award-quality luxury hotel homepage for Sweet Garden Hotel, Kumasi, Ghana — a tropical garden oasis in the Danyame Estates.

## Run & Operate

- `pnpm --filter @workspace/sweet-garden-hotel run dev` — run the hotel website (port 23857, preview path `/`)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite (react-vite artifact)
- Animations: GSAP 3 + ScrollTrigger + CustomEase
- Motion: Framer Motion
- Smooth scroll: @studio-freight/react-lenis (Lenis)
- Fonts: Google Fonts (Cormorant Garamond + DM Sans via CSS @import)
- Icons: lucide-react
- Styling: Tailwind CSS v4 with custom CSS variables

## Where things live

- `artifacts/sweet-garden-hotel/` — the hotel homepage artifact
- `artifacts/sweet-garden-hotel/src/lib/constants.ts` — all hotel data (rooms, dining, events, etc.)
- `artifacts/sweet-garden-hotel/src/lib/gsap-config.ts` — GSAP plugin registration
- `artifacts/sweet-garden-hotel/src/components/ui/LiquidButton.tsx` — signature GSAP clip-path button
- `artifacts/sweet-garden-hotel/src/components/ui/SmoothScrollProvider.tsx` — Lenis smooth scroll
- `artifacts/sweet-garden-hotel/src/components/shared/` — AnimatedText, ParallaxImage, SectionLabel
- `artifacts/sweet-garden-hotel/src/components/sections/` — 9 page sections
- `artifacts/sweet-garden-hotel/src/index.css` — color system, typography, global rules

## Color System

- `--cream: #F4EDE4` — primary light background
- `--forest: #0D2018` — primary dark background
- `--emerald: #2D6A4F` — brand green
- `--gold: #C9A86C` — warm gold accent

## Architecture decisions

- Presentation-first React + Vite app — no backend needed
- GSAP owns all scroll animations and the LiquidButton clip-path morph
- Lenis owns all smooth scrolling; CSS `scroll-behavior: smooth` is never used
- All colors declared as CSS custom properties in `:root` — no hardcoded hex in components
- No border-radius on any images (enforced globally in CSS)

## Product

A full luxury hotel homepage with: cinematic hero, welcome/about section, horizontal-scroll rooms showcase, Pool & Garden centrepiece, dining with infinite marquee, events carousel + private spaces grid, facilities icon grid, location with landmarks, testimonials, and footer with subscribe form.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Google Fonts @import MUST be the very first line of `index.css` (before `@import "tailwindcss"`)
- GSAP and @studio-freight/react-lenis must be installed as direct dependencies in the sweet-garden-hotel package (not workspace root)
- @studio-freight/react-lenis has peer dep warnings on React 19 — works fine despite warnings
- Never add `scroll-behavior: smooth` — Lenis owns all smooth scrolling

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
