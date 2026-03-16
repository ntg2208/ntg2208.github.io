# Portfolio Website Redesign: Astro + Tailwind Flat Design

## Overview

Full rewrite of ntg2208.github.io from Jekyll + vanilla HTML/CSS/JS to Astro + Tailwind CSS v4. The goal is a modern, flat, clean corporate aesthetic (Linear/Vercel style) — light mode only, static output, deployed to GitHub Pages.

## Architecture

### Tech Stack

- **Framework:** Astro (static output)
- **Styling:** Tailwind CSS v4 (utility-first, CSS-based config via `@theme` directives)
- **Icons:** Lucide
- **Font:** Inter (self-hosted woff2 subset)
- **Interactivity:** Preact island for project search/filter only
- **Deployment:** GitHub Actions → GitHub Pages
- **Forms:** Formspree (compatible with static GitHub Pages hosting)

### Astro Configuration

Required integrations and settings in `astro.config.mjs`:
- `@astrojs/tailwind` — Tailwind CSS integration
- `@astrojs/preact` — Preact for interactive islands
- `site: 'https://ntg2208.github.io'` — required for GitHub Pages
- `output: 'static'` — static site generation

### Project Structure

```
ntg2208.github.io/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── .github/workflows/deploy.yml
├── public/
│   ├── favicon.png
│   ├── images/
│   │   ├── profile-img.webp
│   │   ├── experience/          # SVG icons preferred, WebP for photos
│   │   └── projects/            # SVG icons preferred, WebP for photos
│   └── resume/
│       └── Truong_Giang_Nguyen_Resume.pdf
├── src/
│   ├── layouts/
│   │   └── Layout.astro         # Base HTML, meta/OG tags, fonts, global styles
│   ├── components/
│   │   ├── Header.astro         # Includes inline <script> for mobile toggle + IntersectionObserver nav highlight
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Skills.astro
│   │   ├── Experience.astro
│   │   ├── Projects.astro
│   │   ├── ProjectFilter.tsx    # Preact island for search/filter
│   │   ├── Education.astro
│   │   ├── Testimonials.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro         # Includes back-to-top button
│   ├── content/
│   │   ├── config.ts
│   │   ├── projects/            # JSON per project
│   │   └── experience/          # JSON per company
│   ├── pages/
│   │   ├── index.astro          # Single page, composes all sections
│   │   └── 404.astro            # Custom 404 page
│   └── styles/
│       └── global.css           # Tailwind directives + @theme config
```

### Key Architectural Decisions

- **Single page:** `index.astro` composes all section components
- **Content collections:** Projects and experience as structured data files with Zod schemas for validation
- **Minimal client JS:** Only the project search/filter uses a Preact island (`client:visible`). Mobile menu toggle, active nav highlight, and back-to-top use inline `<script>` tags within their respective Astro components.
- **Static output:** `output: 'static'` in Astro config
- **Tailwind v4 config:** Theming via `@theme` directives in `global.css` (no `tailwind.config.mjs`)

### Content Collection Schemas

**Projects collection** (`src/content/projects/*.json`):
| Field        | Type       | Required | Description                        |
|--------------|------------|----------|------------------------------------|
| title        | string     | yes      | Project name                       |
| description  | string     | yes      | Short description (1-2 sentences)  |
| sector       | enum       | yes      | "nlp", "healthcare", "energy", "cv", "ml" |
| tech         | string[]   | yes      | Technology tags                    |
| image        | string     | no       | Path to thumbnail in public/images |
| links        | object[]   | no       | Array of {label, url} for external links |
| date         | string     | no       | Project date or year               |
| order        | number     | no       | Sort order within sector           |

**Experience collection** (`src/content/experience/*.json`):
| Field        | Type       | Required | Description                        |
|--------------|------------|----------|------------------------------------|
| company      | string     | yes      | Company name                       |
| location     | string     | yes      | City, country                      |
| role         | string     | yes      | Job title                          |
| startDate    | string     | yes      | Start date (e.g., "Dec 2024")      |
| endDate      | string     | yes      | End date or "Present"              |
| logo         | string     | no       | Path to company logo SVG/WebP      |
| projects     | object[]   | yes      | Array of {title, description, tech: string[]} |
| order        | number     | yes      | Sort order (most recent first)     |

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
- WCAG 2.1 AA accessibility compliance (maintain or improve on current site's aria labels, semantic HTML, keyboard navigation)

## Section Designs

### Header
Fixed top bar, white background, thin bottom border. "TGN" logo left, nav links center, "Download Resume" button right (solid blue). Mobile: hamburger menu with inline `<script>` toggle in `Header.astro`. Active nav highlight via `IntersectionObserver` also in `Header.astro`.

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
Two-column. Left: contact info list with Lucide icons. Right: form (name, email, subject, message, send button). Form submits to Formspree.

### Footer
Centered on slate-50 background. Logo, tagline, quick links row, social icons row, copyright. Includes back-to-top button.

## SEO & Metadata

`Layout.astro` includes:
- `<title>` tag with site name
- `<meta name="description">` with portfolio summary
- `<meta name="keywords">` with relevant terms
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- Canonical URL
- Favicon and apple-touch-icon links

## Interactivity

| Feature              | Approach                                   | Location         | JS Cost    |
|----------------------|--------------------------------------------|------------------|------------|
| Mobile menu toggle   | Inline `<script>` in component             | Header.astro     | ~10 lines  |
| Project search/filter| Preact island `client:visible`             | ProjectFilter.tsx | ~3-5KB     |
| Smooth scroll        | CSS `scroll-behavior: smooth`              | global.css       | 0          |
| Active nav highlight | IntersectionObserver inline `<script>`     | Header.astro     | ~15 lines  |
| Back to top          | Inline `<script>` with scroll listener     | Footer.astro     | ~5 lines   |

Total JS budget: <5KB bundled (excluding images).

## Performance Targets

- Astro zero-JS default — only Projects island adds framework JS
- Images: SVG preferred for icons/logos (not processed by `<Image>`), WebP for photos via Astro `<Image>` optimization
- Fonts: self-hosted Inter woff2 subset
- Target: <80KB total page weight uncompressed (excluding images and fonts)
- Lighthouse: 95+ across all categories

## Deployment

GitHub Actions workflow:
1. Trigger on push to `master`
2. Install dependencies, run `astro build`
3. Deploy `dist/` directory to GitHub Pages

## Migration Notes

- All content (projects, experience, skills, testimonials, education) extracted from current `index.html` and JS files into content collections
- Existing images in `assets/images/` moved to `public/images/` — SVG files used directly, WebP/PNG processed by Astro `<Image>` where applicable
- Resume PDF moved to `public/resume/`
- Old Jekyll files (`_config.yml`, `Gemfile`, `style.css`, `assets/css/`, `assets/js/`) to be removed after migration is verified
- Contact form switches to Formspree (GitHub Pages does not support Netlify Forms)
- `.env` file must NOT be migrated — any Formspree keys use GitHub Actions secrets
- Existing SEO meta tags carried over and enhanced with OG/Twitter Card tags
