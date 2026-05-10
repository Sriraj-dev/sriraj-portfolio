# Portfolio Website Plan — Sriraj

## Context

Building a professional, dark-mode portfolio website for Sriraj (IIT BHU 2024, Analyst at AQR Capital). The site must be responsive (desktop + mobile), driven entirely by a single `profile.json` file so content can be updated without touching code. Layout is a single scrollable page. Stack: Next.js (App Router) + Tailwind CSS + Framer Motion.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14+ (App Router, TypeScript) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React + React Icons (social platform logos) |
| Images | Next.js `<Image>` (local `/public` or remote CDN via `remotePatterns`) |
| Linting | ESLint + Prettier |

---

## Project Structure

```
sriraj-portfolio/
├── public/
│   └── assets/
│       ├── avatar.jpg
│       ├── resume.pdf
│       ├── products/        # SaaS product screenshots
│       ├── projects/        # Project screenshots
│       └── education/       # Institution/company logos
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout: fonts, metadata, providers
│   │   ├── page.tsx         # Composes all sections in order
│   │   └── globals.css      # Tailwind base + custom scrollbar
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── SaasProducts.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Background.tsx   # Education + Experience timeline
│   │   │   ├── Blogs.tsx
│   │   │   └── Contact.tsx
│   │   ├── ui/
│   │   │   ├── AnimatedSection.tsx  # Scroll-triggered fade+slide wrapper
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── SectionHeading.tsx
│   │   └── layout/
│   │       ├── Navbar.tsx       # Sticky, scroll-spy active link
│   │       └── Footer.tsx
│   ├── data/
│   │   └── profile.json         # Single source of truth
│   ├── lib/
│   │   └── types.ts             # TypeScript interfaces matching JSON shape
│   └── hooks/
│       └── useScrollSpy.ts      # Returns active section ID based on scroll
├── PLAN.md                      # This document (in repo)
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## profile.json Schema

```json
{
  "meta": {
    "name": "Sriraj",
    "title": "Software Developer",
    "description": "Portfolio of Sriraj — Software Developer at AQR Capital",
    "keywords": ["software developer", "IIT BHU", "AQR Capital"],
    "avatar": "/assets/avatar.jpg",
    "resumeUrl": "/assets/resume.pdf"
  },
  "intro": {
    "greeting": "Hi, I'm",
    "name": "Sriraj",
    "roles": ["Software Developer", "Analyst @ AQR Capital", "IIT BHU '24"],
    "bio": "Short compelling bio here.",
    "cta": { "label": "View My Work", "href": "#projects" }
  },
  "skills": {
    "languages": ["Python", "TypeScript", "Go", "SQL"],
    "frameworks": ["Next.js", "React", "FastAPI", "Django"],
    "tools": ["Docker", "AWS", "PostgreSQL", "Redis", "Git"]
  },
  "saasProducts": [
    {
      "id": "product-1",
      "name": "Product Name",
      "description": "Short description of what it does.",
      "image": "/assets/products/product1.png",
      "url": "https://example.com",
      "tags": ["Next.js", "AI", "SaaS"],
      "status": "live"
    }
  ],
  "projects": [
    {
      "id": "project-1",
      "title": "Project Title",
      "description": "What this project does and why it matters.",
      "image": "/assets/projects/proj1.png",
      "githubUrl": "https://github.com/Sriraj-dev/...",
      "demoUrl": "https://...",
      "tags": ["Python", "ML", "FastAPI"],
      "featured": true
    }
  ],
  "experience": [
    {
      "company": "AQR Capital",
      "role": "Analyst",
      "startDate": "2024-07",
      "endDate": null,
      "logo": "/assets/experience/aqr.png",
      "description": "Short description of role.",
      "highlights": ["Highlight 1", "Highlight 2"]
    }
  ],
  "education": [
    {
      "institution": "IIT BHU",
      "degree": "B.Tech",
      "field": "Computer Science & Engineering",
      "startYear": 2020,
      "endYear": 2024,
      "logo": "/assets/education/iitbhu.png",
      "highlights": ["Highlight 1"]
    }
  ],
  "blogs": [
    {
      "title": "Blog Post Title",
      "summary": "One-line summary of what the post covers.",
      "url": "https://medium.com/...",
      "platform": "medium",
      "publishedAt": "2025-01-15",
      "tags": ["AI", "Python"]
    }
  ],
  "contact": {
    "email": "psriraj1902@gmail.com",
    "socials": [
      { "platform": "github", "label": "Sriraj-dev", "url": "https://github.com/Sriraj-dev" },
      { "platform": "linkedin", "label": "LinkedIn", "url": "https://linkedin.com/in/..." },
      { "platform": "twitter", "label": "Twitter", "url": "https://twitter.com/..." }
    ]
  }
}
```

**Image URL pattern:** All `image`/`logo` fields accept either:
- Local path: `/assets/...` → served from `public/`, zero config
- Remote URL: `https://res.cloudinary.com/...` → add domain to `next.config.ts` `images.remotePatterns`

This means switching from local to CDN only requires updating the JSON value — no component changes.

---

## Page Sections Order

1. **Navbar** (sticky, scroll-spy highlights active section)
2. **Hero / Intro** — full viewport
3. **Skills** — tech stack icon/badge strip
4. **SaaS Products** — card grid
5. **Projects** — featured cards grid
6. **Background** — Education + Experience as vertical timeline
7. **Blogs** — card list (links out)
8. **Contact** — social links + email
9. **Footer** — minimal

---

## UI Design

### Color Palette (Dark Mode)

| Token | Value | Usage |
|---|---|---|
| `bg-primary` | `#0a0a0a` | Page background |
| `bg-surface` | `#111111` | Card backgrounds |
| `bg-elevated` | `#1a1a1a` | Hover states |
| `border` | `#2a2a2a` | Card borders |
| `accent` | `#6366f1` (indigo) | Links, CTAs, highlights |
| `accent-secondary` | `#8b5cf6` (violet) | Gradient end |
| `text-primary` | `#f1f5f9` | Headings, body |
| `text-muted` | `#64748b` | Subheadings, dates |

### Section-by-Section UI

**Hero:**
- Full-height (`100dvh`)
- Name as large gradient text (indigo → violet)
- Roles as a typewriter/cycling animation
- Subtle animated grid or dot-pattern background
- Two CTAs: "View My Work" (primary) + "Download Resume" (ghost)
- Scroll indicator (animated chevron)

**Skills:**
- Horizontal pill/badge strip, grouped by category (Languages / Frameworks / Tools)
- Subtle separator between groups
- No cards — just badges to keep it lightweight

**SaaS Products:**
- 2–3 column responsive grid
- Each card: image thumbnail, name, status badge (live/beta/building), description, tags, external link
- Hover: card lifts with border glow (indigo)

**Projects:**
- Featured projects in larger cards (span 2 cols on desktop)
- Standard projects in smaller cards
- Hover: image scales slightly, overlay with GitHub/demo icons appears
- Tag badges at bottom of each card

**Background (Education + Experience):**
- Vertical timeline with center line (desktop) / left-aligned (mobile)
- Left = Experience, Right = Education (or interleaved by date)
- Logo avatar, institution/company name, role, date range
- Expand/collapse highlights on click (optional v2)

**Blogs:**
- Simple vertical list of cards (not grid — blogs are text-heavy)
- Platform badge (Medium/Hashnode/etc.)
- Published date + tags
- Entire card is a link → opens in new tab

**Contact:**
- Centered layout
- Large "Get in touch" heading
- Email with one-click copy button
- Row of social icon buttons with hover animations
- Subtle gradient bg to visually separate from blogs

### Animations (Framer Motion)

| Effect | Where |
|---|---|
| Fade + slide-up on scroll | Every section entry via `AnimatedSection` wrapper |
| Stagger children | Card grids (cards appear 100ms apart) |
| Hover scale + border glow | Product and project cards |
| Typewriter / text cycle | Hero roles |
| Smooth scroll | CSS `scroll-behavior: smooth` |
| Scroll-spy highlight | Navbar active link |
| Copy button feedback | Contact email (icon swap) |

---

## Image & Video Handling

**Images:**
- All rendered via Next.js `<Image>` for automatic WebP conversion, lazy loading, and blur placeholder
- Local images in `public/assets/` categorized by type (products, projects, education, experience)
- JSON supports both local paths and remote URLs — `next.config.ts` will list allowed remote domains
- For missing/placeholder images during build: use a default placeholder from `/assets/placeholder.png`

**Videos (if needed for SaaS products):**
- Short demo videos: `<video autoPlay muted loop playsInline>` for ambient hero-style clips
- Longer demos: YouTube embed (iframe) — store YouTube URL in JSON under `videoUrl` field
- No video hosting planned initially; link out or use YouTube

---

## Sections Added Beyond Original List

| Added | Reason |
|---|---|
| **Skills** | Essential for any dev portfolio; shows tech stack at a glance |
| **Experience** | Sriraj has a notable role at AQR Capital — separating it from Education gives it proper prominence |

---

## Implementation Phases

### Phase 1 — Structure & Data (current)
Goal: Working, responsive skeleton with all sections reading from `profile.json`. No polish yet.

1. `npx create-next-app@latest` with TypeScript, Tailwind, ESLint, App Router, `src/` directory
2. Create `PLAN.md` in repo root
3. Set up `src/data/profile.json` with mock data + `src/lib/types.ts` TypeScript interfaces
4. Configure Tailwind theme (custom dark-mode colors, fonts) and `globals.css`
5. Build `useScrollSpy` hook
6. Build layout: `Navbar` (sticky, scroll-spy) + `Footer`
7. Build UI primitives: `AnimatedSection`, `Badge`, `SectionHeading`
8. Build sections (data-wired, responsive, no heavy animation yet): Hero → Skills → SaaS Products → Projects → Background (timeline) → Blogs → Contact
9. Wire all sections in `app/page.tsx` + configure `next.config.ts`
10. Verify: `npm run build` passes, all sections render correctly on mobile & desktop

### Phase 2 — UI Polish (after Phase 1 review)
Goal: Elevate to production-grade design using the `frontend-design` skill.

- Refined typography, spacing, visual hierarchy
- Framer Motion scroll animations, stagger effects, hover states
- Hero typewriter animation, gradient text, dot-grid background
- Card hover effects (lift, border glow)
- Contact copy-email button animation
- Accessibility pass: semantic HTML, ARIA labels, focus states
- Lighthouse audit: target 90+ on all metrics

---

## Verification

- Run `npm run dev` and verify all sections render with mock data
- Resize to 375px (iPhone SE) and verify no horizontal overflow, all cards stack correctly
- Verify navbar scroll-spy highlights correct section as you scroll
- Verify all external links (blogs, projects, socials) open in new tab
- Run `npm run build` — zero TypeScript errors, zero ESLint errors
- Lighthouse audit: Performance, Accessibility, Best Practices, SEO all ≥ 90
