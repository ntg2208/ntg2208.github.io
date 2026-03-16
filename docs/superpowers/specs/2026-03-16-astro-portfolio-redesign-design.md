# Portfolio Website Redesign: Astro + Tailwind Flat Design

## Overview

Full rewrite of ntg2208.github.io from Jekyll + vanilla HTML/CSS/JS to Astro + Tailwind CSS v4. The goal is a modern, flat, clean corporate aesthetic (Linear/Vercel style) — light mode only, static output, deployed to GitHub Pages.

## Architecture

### Tech Stack

- **Framework:** Astro (static output)
- **Styling:** Tailwind CSS v4 (utility-first)
- **Icons:** Lucide
- **Font:** Inter (self-hosted woff2 subset)
- **Interactivity:** Preact island for project search/filter only
- **Deployment:** GitHub Actions → GitHub Pages
- **Forms:** Netlify Forms or Formspree

### Project Structure

```
ntg2208.github.io/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── tsconfig.json
├── .github/workflows/deploy.yml
├── public/
│   ├── favicon.png
│   ├── images/
│   │   ├── profile-img.webp
│   │   ├── experience/
│   │   └── projects/
│   └── resume/
│       └── Truong_Giang_Nguyen_Resume.pdf
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Skills.astro
│   │   ├── Experience.astro
│   │   ├── Projects.astro
│   │   ├── ProjectFilter.tsx       # Preact island
│   │   ├── Education.astro
│   │   ├── Testimonials.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── content/
│   │   ├── config.ts
│   │   ├── projects/               # JSON/MD per project
│   │   └── experience/             # JSON/MD per company
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
```

### Key Architectural Decisions

- **Single page:** `index.astro` composes all section components
- **Content collections:** Projects and experience as structured data files with Zod schemas for validation
- **Minimal client JS:** Only the project search/filter uses a Preact island (`client:visible`). Everything else is static HTML + CSS.
- **Static output:** `output: 'static'` in Astro config

## Design System

### Typography

- Font: Inter (self-hosted woff2)
- Scale: 14px body, 16px emphasis, 20/24/32/48px headings
- Weights: 400 (body), 500 (subheadings), 600 (headings), 700 (hero title only)

### Color Palette

| Token         | Value     | Usage                          |
|---------------|-----------|--------------------------------|
| bg-primary    | #ffffff   | Main background                |
| bg-alt        | #f8fafc   | Alternating section background |
| text-primary  | #0f172a   | Main text (slate-900)          |
| text-secondary| #64748b   | Secondary text (slate-500)     |
| accent        | #2563eb   | Links, buttons, active states  |
| accent-hover  | #1d4ed8   | Hover states                   |
| border        | #e2e8f0   | Borders, dividers (slate-200)  |

### Design Principles

- No gradients, glows, or particle backgrounds
- Cards use 1px borders, no shadows (or subtle shadow-sm at most)
- Buttons: solid fill or outlined, `rounded-md`
- Minimal hover effects: subtle color shifts only
- Generous whitespace
- Lucide icon set (consistent line style)

## Section Designs

### Header
Fixed top bar, white background, thin bottom border. "TGN" logo left, nav links center, "Download Resume" button right (solid blue). Mobile: hamburger menu with inline JS toggle (~10 lines).

### Hero
Two-column layout. Left: eyebrow text ("AI Engineer & LLM Specialist"), large name heading, 2-line description, two buttons ("View My Work" outlined, "Get In Touch" solid blue). Right: profile image in rounded rectangle, no effects. Stats row below description (5+ years, 20+ projects, 6 companies).

### About
Two-column. Left: profile image. Right: bio text + 2x2 grid of expertise cards (icon, title, description). Cards have border only.

### Skills
Grouped tag/chip layout. Four categories as labeled groups, each skill as a flat chip (light blue background, blue text). No progress bars.

### Experience
Vertical left-aligned timeline. Each entry: company logo/icon, company name, role, date range. Nested project cards with descriptions and tech tags. Clean connecting lines.

### Projects
Search input + filter dropdown at top. 3-column card grid (1-column mobile). Each card: thumbnail, title, 2-line description, tech tags, link icons. Border only. Search/filter via Preact island with `client:visible`.

### Education
Two cards side by side. Institution, degree, dates, brief description.

### Testimonials
Three static cards in a row (no carousel). Quote text, author name, title, quotation mark icon.

### Contact
Two-column. Left: contact info list with Lucide icons. Right: form (name, email, subject, message, send button). Form submits to Netlify Forms or Formspree.

### Footer
Centered on slate-50 background. Logo, tagline, quick links row, social icons row, copyright.

## Interactivity

| Feature              | Approach                        | JS Cost    |
|----------------------|---------------------------------|------------|
| Mobile menu toggle   | Inline `<script>`               | ~10 lines  |
| Project search/filter| Preact island `client:visible`  | ~3-5KB     |
| Smooth scroll        | CSS `scroll-behavior: smooth`   | 0          |
| Active nav highlight | IntersectionObserver inline     | ~15 lines  |
| Back to top          | Inline script or CSS anchor     | ~5 lines   |

Total JS budget: <5KB (excluding images).

## Performance Targets

- Astro zero-JS default — only Projects island adds JS
- Images: existing WebP files + Astro `<Image>` optimization
- Fonts: self-hosted Inter woff2 subset
- Target: <50KB total page weight (excluding images)
- Lighthouse: 95+ across all categories

## Deployment

GitHub Actions workflow:
1. Trigger on push to `master`
2. Install dependencies, run `astro build`
3. Deploy `dist/` directory to GitHub Pages

## Migration Notes

- All content (projects, experience, skills, testimonials, education) extracted from current `index.html` and JS files into content collections
- Existing images in `assets/images/` moved to `public/images/`
- Resume PDF moved to `public/resume/`
- Old Jekyll files (`_config.yml`, `Gemfile`, `style.css`, `assets/css/`, `assets/js/`) to be removed after migration is verified
- Contact form switches from Netlify to Formspree (works with static GitHub Pages hosting)
