# Portfolio — Context & Architecture

This document is a living reference for continuing work on this project in future sessions. It covers what has been built, how the application is structured, and the key conventions to follow.

---

## What This Is

A personal portfolio website for **Sriraj** (IIT BHU 2024, Analyst at AQR Capital). It is a single-page scrollable site with a dark-mode-only design, built with Next.js. The entire content of the site is driven by a single JSON file — **no content is hardcoded in any component**.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React + React Icons |
| Images | Next.js `<Image>` (supports local paths & remote CDN URLs) |
| Fonts | Syne (display/headings) + Geist Sans (body) + Geist Mono (mono labels) |
| Linting | ESLint |

---

## The Golden Rule — JSON-Driven Content

**`src/data/profile.json` is the single source of truth for all content.**

To update any text, image, link, or list on the site — edit only this file. No component code needs to change. The TypeScript types for this file live in `src/lib/types.ts`.

### JSON Schema Overview

```
profile.json
├── meta          → SEO metadata, avatar path, resume URL
├── intro         → Hero section: greeting, name, roles[], bio, CTA button
├── skills        → languages[], frameworks[], tools[]
├── saasProducts  → Array of products (name, description, image, videoUrl, url, tags, status)
├── projects      → Array of projects (title, description, image, githubUrl, demoUrl, tags, featured)
├── experience    → Array of work entries (company, role, dates, highlights[])
├── education     → Array of education entries (institution, degree, field, years, highlights[])
├── blogs         → Array of blog posts (title, summary, url, platform, publishedAt, tags)
└── contact       → email + socials[] (platform, label, url)
```

### Adding / Removing Content

- **New project** → add an object to `projects[]`
- **New blog post** → add an object to `blogs[]`
- **New skill** → append to `skills.languages[]`, `skills.frameworks[]`, or `skills.tools[]`
- **New social link** → add to `contact.socials[]` with platform = `"github"` | `"linkedin"` | `"twitter"` | `"instagram"`

---

## Project Structure

```
sriraj-portfolio/
├── public/
│   └── assets/
│       ├── avatar.jpg          ← Profile photo (not yet added)
│       ├── resume.pdf          ← Resume (not yet added)
│       ├── products/           ← Product screenshots / demo videos
│       │   ├── synapticAI.JPG
│       │   ├── synapticAI-2.JPG
│       │   ├── marketPulseAI.jpg
│       │   └── c2v.jpg
│       ├── projects/           ← Project screenshots (empty, add as needed)
│       ├── education/          ← Institution logos (empty, add as needed)
│       └── experience/         ← Company logos (empty, add as needed)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Root layout: loads fonts, sets metadata from profile.json
│   │   ├── page.tsx            ← Composes all sections in order
│   │   └── globals.css         ← CSS variables, Tailwind v4 theme, utility classes
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      ← Sticky glassmorphism navbar with scroll-spy
│   │   │   └── Footer.tsx      ← Minimal footer
│   │   ├── sections/           ← One file per page section
│   │   │   ├── Hero.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── SaasProducts.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Background.tsx  ← Experience + Education timeline
│   │   │   ├── Blogs.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/                 ← Reusable primitives
│   │       ├── AnimatedSection.tsx
│   │       ├── Badge.tsx
│   │       └── SectionHeading.tsx
│   │
│   ├── data/
│   │   └── profile.json        ← ALL CONTENT LIVES HERE
│   │
│   ├── hooks/
│   │   └── useScrollSpy.ts     ← Returns the active section ID based on scroll position
│   │
│   └── lib/
│       └── types.ts            ← TypeScript interfaces matching profile.json exactly
│
├── CONTEXT.md                  ← This file
├── PLAN.md                     ← Original design plan and UI decisions
├── next.config.ts              ← Image remote patterns (Cloudinary, Unsplash, GitHub avatars)
├── .gitignore                  ← Includes: node_modules, .next, .DS_Store, AGENTS.md, .claude/
└── package.json
```

---

## Page Sections — Order & IDs

The page renders these sections top to bottom. Each section has an HTML `id` used by the navbar scroll-spy.

| Order | Section | ID | File |
|---|---|---|---|
| 1 | Sticky Navbar | — | `layout/Navbar.tsx` |
| 2 | Hero / Intro | `#hero` | `sections/Hero.tsx` |
| 3 | Skills | `#skills` | `sections/Skills.tsx` |
| 4 | SaaS Products | `#products` | `sections/SaasProducts.tsx` |
| 5 | Projects | `#projects` | `sections/Projects.tsx` |
| 6 | Background | `#background` | `sections/Background.tsx` |
| 7 | Blogs / Writing | `#blogs` | `sections/Blogs.tsx` |
| 8 | Contact | `#contact` | `sections/Contact.tsx` |
| 9 | Footer | — | `layout/Footer.tsx` |

---

## Design System

### Color Palette (CSS variables in `globals.css`)

| Variable | Value | Used For |
|---|---|---|
| `--bg-primary` | `#080810` | Page background |
| `--bg-surface` | `#0e0e18` | Alternate section backgrounds |
| `--bg-elevated` | `#14141f` | Card hover states |
| `--border-color` | `#1e1e2e` | Default card/component borders |
| `--border-bright` | `#2e2e45` | Hovered or active borders |
| `--accent` | `#6366f1` (indigo) | CTAs, links, active states, highlights |
| `--accent-secondary` | `#8b5cf6` (violet) | Gradient end, secondary accents |
| `--text-primary` | `#e8eaf0` | Headings, body copy |
| `--text-muted` | `#5a5f7a` | Subtitles, dates, labels |

### Fonts

- **`Syne`** — display font for headings, section titles, hero name, navbar logo. Applied via `style={{ fontFamily: "var(--font-syne), sans-serif" }}` or the CSS variable.
- **`Geist Sans`** — default body font.
- **`Geist Mono`** — used for labels, tags, dates, monospace accents (`font-mono`).

### Utility CSS Classes (defined in `globals.css`)

| Class | Purpose |
|---|---|
| `.dot-grid` | Radial dot-grid background pattern (used in Hero) |
| `.gradient-text` | Indigo→violet gradient applied to text via `background-clip` |
| `.card-glow` | Card hover: lifts 2px, border glows indigo, box-shadow |
| `.cursor-blink` | Blinking block cursor animation (used in Hero role cycling) |
| `.accent-line` | Gradient underline bar used in `SectionHeading` |

---

## Key Component Behaviours

### Navbar
- Transparent when at top of page; glassmorphism (`backdrop-blur-xl` + semi-transparent bg) once scrolled past 30px
- Active link highlighted using Framer Motion `layoutId="nav-pill"` — the indicator slides smoothly between items
- Mobile: hamburger menu with `AnimatePresence` slide-in drawer
- Logo renders as `<Name />` in Syne font

### Hero
- Name rendered at fluid size (`clamp(4rem, 14vw, 9rem)`) with gradient text
- Roles cycle with `AnimatePresence` (fade up/down every 2.8s) with a blinking cursor
- Staggered entry animations using Framer Motion
- Dot-grid + radial glow orb background

### SaaS Product Cards
Media priority order per card:
1. **YouTube URL** (`videoUrl` contains `youtube.com` or `youtu.be`) → renders as silent looping `<iframe>` embed. Accepts both `https://youtube.com/watch?v=ID` and `https://youtu.be/ID` formats.
2. **Local/CDN video** (`videoUrl` is a non-YouTube URL) → `<video autoPlay muted loop playsInline>`
3. **Image** (`image` field) → Next.js `<Image fill>` with `object-cover`
4. **No media** → gradient placeholder

### AnimatedSection
Wraps any content with a scroll-triggered fade + slide-up animation (Framer Motion `useInView`). Accepts a `delay` prop for staggering children.

### useScrollSpy
Custom hook at `src/hooks/useScrollSpy.ts`. Listens to scroll events and returns the ID of whichever section is currently at the top of the viewport (with an 80px offset for the navbar height).

---

## Image & Media Handling

All `image`, `logo`, and `videoUrl` fields in `profile.json` accept:
- **Local path**: `/assets/products/myimage.jpg` — file must exist in `public/`
- **Remote URL**: `https://res.cloudinary.com/...` — domain must be listed in `next.config.ts` under `images.remotePatterns`

Currently allowed remote image domains (`next.config.ts`):
- `res.cloudinary.com`
- `images.unsplash.com`
- `avatars.githubusercontent.com`

To add a new remote domain, add it to `next.config.ts` → `images.remotePatterns`.

---

## Things Still Pending / To Do

- [ ] Add real product descriptions to `saasProducts[]` in `profile.json`
- [ ] Add real project entries to `projects[]` in `profile.json`
- [ ] Add real blog post links to `blogs[]` in `profile.json`
- [ ] Upload avatar photo to `public/assets/avatar.jpg`
- [ ] Upload resume PDF to `public/assets/resume.pdf`
- [ ] Update LinkedIn and Twitter URLs in `contact.socials`
- [ ] Add YouTube demo video URLs to products that have them (`videoUrl` field)
- [ ] Consider deploying to Vercel (connect GitHub repo → import project)

---

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev        # → http://localhost:3000

# Production build (run to check for errors)
npm run build

# Start production server
npm start
```

---

## How to Continue in a New Session

1. Open this file (`CONTEXT.md`) and share it at the start of the conversation for full context.
2. All content changes → edit `src/data/profile.json` only.
3. All structural/UI changes → edit the relevant file in `src/components/`.
4. After any change, run `npm run build` to verify zero TypeScript errors before committing.
