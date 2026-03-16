# Astro + Tailwind Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite ntg2208.github.io from Jekyll to Astro + Tailwind CSS v4 with a flat, clean corporate design (light mode only), deployed to GitHub Pages.

**Architecture:** Single-page Astro site with component-per-section, content collections for projects/experience data, Preact island for project search/filter, and static output deployed via GitHub Actions.

**Tech Stack:** Astro, Tailwind CSS v4, Preact, Lucide icons, Inter font (self-hosted), Formspree, GitHub Actions

**Spec:** `docs/superpowers/specs/2026-03-16-astro-portfolio-redesign-design.md`

---

## File Structure

```
src/
├── layouts/
│   └── Layout.astro              # Base HTML shell: <head> with meta/OG/fonts, <body> wrapper
├── components/
│   ├── Header.astro              # Fixed navbar + mobile menu + active nav (inline scripts)
│   ├── Hero.astro                # Two-column hero: text + image + stats
│   ├── About.astro               # Bio + 2x2 expertise cards
│   ├── Skills.astro              # Grouped skill chips
│   ├── Experience.astro          # Timeline with nested project cards
│   ├── Projects.astro            # Static wrapper, renders ProjectFilter island
│   ├── ProjectFilter.tsx         # Preact island: search + filter + card grid
│   ├── Education.astro           # Two education cards
│   ├── Testimonials.astro        # Three static quote cards
│   ├── Contact.astro             # Contact info + Formspree form
│   └── Footer.astro              # Links, social, copyright, back-to-top
├── content/
│   ├── config.ts                 # Zod schemas for projects + experience collections
│   ├── projects/                 # 17 JSON files, one per project
│   └── experience/               # 6 JSON files, one per company
├── pages/
│   ├── index.astro               # Composes all section components
│   └── 404.astro                 # Custom 404 page
├── styles/
│   └── global.css                # Tailwind directives + @theme tokens
public/
├── favicon.png
├── images/                       # Migrated from assets/images/
│   ├── profile-img.webp
│   ├── experience/               # SVG + WebP files
│   └── projects/                 # SVG + WebP + PNG files
└── resume/
    └── Truong_Giang_Nguyen_Resume.pdf
```

---

## Chunk 1: Project Scaffolding & Infrastructure

### Task 1: Initialize Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`, `src/styles/global.css`

- [ ] **Step 1: Create Astro project in a temporary directory and move files**

```bash
cd /Users/ntg/Documents/Personal_Projects
npm create astro@latest astro-temp -- --template minimal --no-install --no-git
```

- [ ] **Step 2: Move Astro scaffold files into the existing repo**

Copy `package.json`, `astro.config.mjs`, `tsconfig.json`, and `src/` from `astro-temp` into `ntg2208.github.io/`. Remove the temp directory. Do NOT overwrite existing files outside `src/`.

- [ ] **Step 3: Install dependencies**

Note: We use `@tailwindcss/vite` instead of the spec's `@astrojs/tailwind` because `@astrojs/tailwind` is for Tailwind v3 only. Tailwind v4 uses the Vite plugin directly, which Astro supports natively.

```bash
cd /Users/ntg/Documents/Personal_Projects/ntg2208.github.io
npm install
npm install @astrojs/preact preact
npm install -D @tailwindcss/vite tailwindcss lucide-astro
```

- [ ] **Step 4: Configure astro.config.mjs**

```javascript
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ntg2208.github.io',
  output: 'static',
  integrations: [preact()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 5: Configure global.css with Tailwind v4 @theme**

Write `src/styles/global.css`:

```css
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', system-ui, sans-serif;
  --color-accent: #2563eb;
  --color-accent-hover: #1d4ed8;
  --color-bg-alt: #f8fafc;
  --color-text-secondary: #64748b;
  --color-border: #e2e8f0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
}
```

- [ ] **Step 6: Create minimal index.astro to verify build**

Write `src/pages/index.astro`:

```astro
---
import '../styles/global.css';
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Truong Giang Nguyen</title>
  </head>
  <body class="bg-white text-slate-900">
    <h1 class="text-4xl font-bold p-8">Site scaffolding works!</h1>
  </body>
</html>
```

- [ ] **Step 7: Run dev server to verify**

```bash
npm run dev
```

Expected: Page renders at localhost:4321 with styled heading.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/
git commit -m "feat: scaffold Astro project with Tailwind v4 and Preact"
```

### Task 2: Migrate static assets to public/

**Files:**
- Create: `public/images/`, `public/resume/`, `public/favicon.png`

- [ ] **Step 1: Copy images and resume to public/**

```bash
cp -r assets/images/ public/images/
cp -r assets/resume/ public/resume/
cp assets/icons/favicon.png public/favicon.png
cp assets/icons/apple-touch-icon.png public/apple-touch-icon.png
```

- [ ] **Step 2: Verify files exist**

```bash
ls public/images/profile-img.webp
ls public/images/projects/
ls public/images/experience/
ls public/resume/Truong_Giang_Nguyen_Resume.pdf
```

- [ ] **Step 3: Commit**

```bash
git add public/
git commit -m "feat: migrate static assets to public/ for Astro"
```

### Task 3: Create Layout.astro with SEO metadata

**Files:**
- Create: `src/layouts/Layout.astro`
- Modify: `src/pages/index.astro` (use Layout)

- [ ] **Step 1: Download Inter font woff2 files**

Download Inter Regular (400), Medium (500), SemiBold (600), Bold (700) woff2 files and place in `public/fonts/`.

```bash
mkdir -p public/fonts
# Download Inter variable font woff2
curl -L -o public/fonts/Inter-Regular.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2"
curl -L -o public/fonts/Inter-Medium.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hiA.woff2"
curl -L -o public/fonts/Inter-SemiBold.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hiA.woff2"
curl -L -o public/fonts/Inter-Bold.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hiA.woff2"
```

- [ ] **Step 2: Add @font-face to global.css**

Add to `src/styles/global.css` AFTER the `@import "tailwindcss"` line (Tailwind v4 requires the import to be first):

```css
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/Inter-Regular.woff2') format('woff2');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/Inter-Medium.woff2') format('woff2');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/Inter-SemiBold.woff2') format('woff2');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/Inter-Bold.woff2') format('woff2');
}
```

- [ ] **Step 3: Write Layout.astro**

```astro
---
interface Props {
  title?: string;
  description?: string;
}

import '../styles/global.css';

const {
  title = 'Truong Giang Nguyen | AI Engineer & LLM Specialist',
  description = 'Portfolio of Truong Giang Nguyen — AI Engineer with 5+ years of experience building scalable AI solutions with LLMs, RAG systems, and computer vision.',
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content="AI Engineer, LLM, RAG, Machine Learning, Computer Vision, Portfolio" />
    <link rel="canonical" href={canonicalURL} />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL('/images/profile-img.webp', Astro.site)} />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={new URL('/images/profile-img.webp', Astro.site)} />

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <!-- Preload fonts -->
    <link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/Inter-SemiBold.woff2" as="font" type="font/woff2" crossorigin />
  </head>
  <body class="bg-white text-slate-900 text-sm leading-relaxed">
    <slot />
  </body>
</html>
```

- [ ] **Step 4: Update index.astro to use Layout**

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout>
  <h1 class="text-4xl font-bold p-8">Layout works!</h1>
</Layout>
```

- [ ] **Step 5: Run dev server to verify**

```bash
npm run dev
```

Expected: Page renders with Inter font, correct title in browser tab.

- [ ] **Step 6: Commit**

```bash
git add src/layouts/ src/pages/index.astro src/styles/global.css public/fonts/
git commit -m "feat: add Layout with SEO metadata and self-hosted Inter font"
```

### Task 4: Create content collections with schemas

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/projects/*.json` (17 files)
- Create: `src/content/experience/*.json` (6 files)

- [ ] **Step 1: Write content collection config with Zod schemas**

Create `src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    sector: z.enum(['nlp', 'healthcare', 'energy', 'cv', 'ml', 'transport', 'data-analysis', 'image-processing']),
    tech: z.array(z.string()),
    image: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.string().url() })).optional(),
    date: z.string().optional(),
    order: z.number(),
  }),
});

const experience = defineCollection({
  type: 'data',
  schema: z.object({
    company: z.string(),
    location: z.string(),
    role: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    logo: z.string().optional(),
    projects: z.array(z.object({
      title: z.string(),
      description: z.string(),
      tech: z.array(z.string()),
      image: z.string().optional(),
    })),
    order: z.number(),
  }),
});

export const collections = { projects, experience };
```

- [ ] **Step 2: Create all 17 project JSON files**

Create each file in `src/content/projects/`. Example for first project — `clinical-notes-lora.json`:

```json
{
  "title": "Efficient Clinical Notes Summarization with LoRA Fine-tuning",
  "description": "Engineered an efficient LLM fine-tuning pipeline using LoRA on a 4-bit quantized Mistral 7B model, improving clinical note summarization accuracy threefold. Processed and curated the 'Asclepius-Synthetic-Clinical-Notes' dataset, improving ROUGE-1 score from 0.381 to 0.423.",
  "sector": "nlp",
  "tech": ["Python", "PyTorch", "Hugging Face Transformers", "Unsloth", "ROUGE", "Pandas"],
  "image": "/images/projects/multimodal-conversational-ai-ecommerce.png",
  "links": [
    { "label": "Colab", "url": "https://colab.research.google.com/drive/1Q3IVwDquecpz_zfnjNq4TKudIzVQdnOk?usp=sharing" }
  ],
  "date": "2024",
  "order": 1
}
```

Note: The `sector` enum includes extra values (`transport`, `data-analysis`, `image-processing`) beyond the spec's 5 to accommodate actual project data that doesn't fit neatly into the spec's categories.

Create all 17 files following the same pattern with data from the content extraction:
- `clinical-notes-lora.json`
- `agentic-rag-llama3.json`
- `docpatientsumm-lora.json`
- `qa-system-rag-langchain.json`
- `complaint-tweet-classification.json`
- `shakespeare-text-generation.json`
- `cibmtr-survival-predictions.json`
- `nhs-employment-gap.json`
- `wind-turbine-yaw.json`
- `m1-traffic-analysis.json`
- `hospital-readmission.json`
- `edible-mushroom.json`
- `malaria-detection.json`
- `customer-sentiment-facial.json`
- `exam-impersonation.json`
- `luna16-lung-nodule.json`
- `jpeg-compression.json`

- [ ] **Step 3: Create all 6 experience JSON files**

Create each file in `src/content/experience/`. Example — `01-twentytwotensors.json`:

```json
{
  "company": "twentytwotensors",
  "location": "UK",
  "role": "Machine Learning Engineer",
  "startDate": "Dec 2024",
  "endDate": "Present",
  "projects": [
    {
      "title": "Production AI Multi-Agent Systems",
      "description": "Architected and deployed a production-grade multi-agent AI customer support system using Google Gemini, orchestrating a Master Agent with specialized Policy Agent (RAG) and Ticket Agent (database operations), reducing operational costs by 60% while enabling 24/7 service availability.",
      "tech": ["Google Gemini", "RAG", "Multi-Agent Systems", "Python"],
      "image": "/images/experience/ml-model-development.svg"
    },
    {
      "title": "RAG + Database Hybrid Architecture",
      "description": "Engineered a sophisticated RAG + Database hybrid architecture with location intelligence, achieving 100% routing accuracy across 15+ comprehensive test scenarios with sub-2-second response times.",
      "tech": ["RAG", "Database Architecture", "Location Intelligence", "Python"],
      "image": "/images/experience/data-analysis-processing.svg"
    }
  ],
  "order": 1
}
```

Create all 6 files:
- `01-twentytwotensors.json`
- `02-seedcom.json`
- `03-northumbria.json`
- `04-vulcan-labs.json`
- `05-emage.json`
- `06-robert-bosch.json`

- [ ] **Step 4: Verify content collections load**

Add to `src/pages/index.astro` temporarily:

```astro
---
import Layout from '../layouts/Layout.astro';
import '../styles/global.css';
import { getCollection } from 'astro:content';

const projects = await getCollection('projects');
const experience = await getCollection('experience');
---
<Layout>
  <p>Projects: {projects.length}</p>
  <p>Experience: {experience.length}</p>
</Layout>
```

Run `npm run dev` and verify it shows "Projects: 17" and "Experience: 6".

- [ ] **Step 5: Commit**

```bash
git add src/content/
git commit -m "feat: add content collections for projects and experience data"
```

### Task 5: GitHub Actions deployment workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Write deploy workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Build Astro
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "feat: add GitHub Actions workflow for Astro deployment"
```

---

## Chunk 2: Section Components (Header, Hero, About, Skills)

### Task 6: Header component

**Files:**
- Create: `src/components/Header.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write Header.astro**

```astro
---
const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];
---
<header class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
  <div class="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
    <a href="#home" class="text-xl font-bold text-slate-900">TGN</a>

    <nav class="hidden md:flex items-center gap-6">
      {navLinks.map(link => (
        <a href={link.href} class="text-sm text-slate-500 hover:text-blue-600 transition-colors" data-nav-link>
          {link.label}
        </a>
      ))}
    </nav>

    <div class="flex items-center gap-4">
      <a href="/resume/Truong_Giang_Nguyen_Resume.pdf" target="_blank" rel="noopener"
         class="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
        Download Resume
      </a>
      <button id="menu-toggle" class="md:hidden p-2 text-slate-500 hover:text-slate-900" aria-label="Toggle menu" aria-expanded="false">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path id="menu-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile menu -->
  <div id="mobile-menu" class="hidden md:hidden border-t border-slate-200 bg-white">
    <nav class="flex flex-col px-6 py-4 gap-3">
      {navLinks.map(link => (
        <a href={link.href} class="text-sm text-slate-500 hover:text-blue-600 transition-colors" data-mobile-link>
          {link.label}
        </a>
      ))}
      <a href="/resume/Truong_Giang_Nguyen_Resume.pdf" target="_blank" rel="noopener"
         class="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
        Download Resume
      </a>
    </nav>
  </div>
</header>

<script>
  // Mobile menu toggle
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  toggle?.addEventListener('click', () => {
    const open = menu?.classList.toggle('hidden') === false;
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('[data-mobile-link]').forEach(link => {
    link.addEventListener('click', () => menu?.classList.add('hidden'));
  });

  // Active nav highlighting via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('text-blue-600', active);
          link.classList.toggle('text-slate-500', !active);
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });
  sections.forEach(section => observer.observe(section));
</script>
```

- [ ] **Step 2: Add Header to index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
---
<Layout>
  <Header />
  <main class="pt-16">
    <section id="home" class="min-h-screen flex items-center justify-center">
      <h1 class="text-4xl font-bold">Sections coming soon</h1>
    </section>
  </main>
</Layout>
```

- [ ] **Step 3: Run dev server and verify**

Verify: fixed header, nav links visible on desktop, hamburger on mobile, resume button works.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.astro src/pages/index.astro
git commit -m "feat: add Header component with mobile menu and active nav"
```

### Task 7: Hero component

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write Hero.astro**

```astro
---
const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Completed' },
  { value: '6', label: 'Companies' },
];
---
<section id="home" class="min-h-screen flex items-center bg-white">
  <div class="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
    <div>
      <p class="text-sm font-medium text-blue-600 mb-3">Production-Ready AI Engineer & LLM Specialist</p>
      <h1 class="text-5xl font-bold text-slate-900 mb-4">Truong Giang Nguyen</h1>
      <p class="text-base text-slate-500 mb-8 leading-relaxed">
        Building scalable, enterprise-grade AI solutions with a focus on LLMs, RAG systems, and computer vision.
      </p>
      <div class="flex gap-3 mb-10">
        <a href="#projects" class="px-5 py-2.5 border border-blue-600 text-blue-600 text-sm font-medium rounded-md hover:bg-blue-50 transition-colors">
          View My Work
        </a>
        <a href="#contact" class="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
          Get In Touch
        </a>
      </div>
      <div class="flex gap-8">
        {stats.map(stat => (
          <div>
            <p class="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p class="text-xs text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
    <div class="flex justify-center">
      <img src="/images/profile-img.webp" alt="Truong Giang Nguyen" width="400" height="400"
           class="rounded-xl w-full max-w-sm" loading="eager" />
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Hero to index.astro**

Replace the placeholder section with `<Hero />` import.

- [ ] **Step 3: Run dev server and verify**

Verify: two-column layout, image right, text left, stats row, buttons styled.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add Hero section component"
```

### Task 8: About component

**Files:**
- Create: `src/components/About.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write About.astro**

```astro
---
import { MessageSquare, Settings, BarChart2, Eye } from 'lucide-astro';

const expertise = [
  {
    Icon: MessageSquare,
    title: 'LLM & RAG Systems',
    description: 'Architecting and deploying advanced language models, including multi-agent systems, for applications like customer support and personalized recommendations.',
  },
  {
    Icon: Settings,
    title: 'MLOps & Infrastructure',
    description: 'Designing and automating end-to-end ML pipelines on cloud platforms like AWS and Google Vertex AI, ensuring scalability and resilience.',
  },
  {
    Icon: BarChart2,
    title: 'Data Science & Analytics',
    description: 'Applying statistical analysis and machine learning to extract actionable insights from complex datasets, from healthcare to retail.',
  },
  {
    Icon: Eye,
    title: 'Computer Vision',
    description: 'Developing and deploying high-precision computer vision models for applications like defect detection, fashion recommendation, and facial recognition.',
  },
];
---
<section id="about" class="py-20 bg-slate-50">
  <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
    <div class="flex justify-center">
      <img src="/images/profile-img.webp" alt="Truong Giang Nguyen" width="400" height="400"
           class="rounded-xl w-full max-w-sm" loading="lazy" />
    </div>
    <div>
      <p class="text-sm font-medium text-blue-600 mb-2">About Me</p>
      <h2 class="text-3xl font-semibold text-slate-900 mb-4">Driving Business Value with Production-Grade AI</h2>
      <p class="text-slate-500 mb-8 leading-relaxed">
        I am a results-driven AI Engineer with over 5 years of experience in building and deploying scalable, enterprise-grade AI solutions. My expertise lies in leveraging Large Language Models (LLMs), Retrieval-Augmented Generation (RAG) systems, and Computer Vision to solve complex business problems and create measurable value.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {expertise.map(item => (
          <div class="p-4 border border-slate-200 rounded-lg bg-white">
            <item.Icon class="w-5 h-5 text-blue-600 mb-2" />
            <h3 class="text-sm font-semibold text-slate-900 mb-1">{item.title}</h3>
            <p class="text-xs text-slate-500 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
      <div class="flex gap-3 mt-8">
        <a href="#contact" class="px-5 py-2.5 border border-blue-600 text-blue-600 text-sm font-medium rounded-md hover:bg-blue-50 transition-colors">
          Let's Connect
        </a>
        <a href="/resume/Truong_Giang_Nguyen_Resume.pdf" target="_blank" rel="noopener"
           class="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
          Download CV
        </a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add About to index.astro**

- [ ] **Step 3: Run dev server and verify**

- [ ] **Step 4: Commit**

```bash
git add src/components/About.astro src/pages/index.astro
git commit -m "feat: add About section component"
```

### Task 9: Skills component

**Files:**
- Create: `src/components/Skills.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write Skills.astro**

```astro
---
const skillGroups = [
  {
    category: 'Programming Languages',
    skills: ['Python', 'C++', 'R', 'SQL', 'MATLAB'],
  },
  {
    category: 'ML/AI Frameworks',
    skills: ['PyTorch', 'TensorFlow', 'HuggingFace', 'OpenCV', 'Scikit-learn'],
  },
  {
    category: 'Cloud & Tools',
    skills: ['AWS', 'GCP', 'Docker', 'Git', 'Kubernetes'],
  },
  {
    category: 'Specializations',
    skills: ['LLMs', 'RAG Systems', 'Multi-Agent AI', 'MLOps', 'Computer Vision', 'Data Analytics'],
  },
];
---
<section id="skills" class="py-20 bg-white">
  <div class="max-w-6xl mx-auto px-6">
    <p class="text-sm font-medium text-blue-600 mb-2">Skills</p>
    <h2 class="text-3xl font-semibold text-slate-900 mb-10">Technologies & Expertise</h2>
    <div class="grid md:grid-cols-2 gap-8">
      {skillGroups.map(group => (
        <div>
          <h3 class="text-sm font-semibold text-slate-900 mb-3">{group.category}</h3>
          <div class="flex flex-wrap gap-2">
            {group.skills.map(skill => (
              <span class="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-md">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Skills to index.astro**

- [ ] **Step 3: Run dev server and verify**

- [ ] **Step 4: Commit**

```bash
git add src/components/Skills.astro src/pages/index.astro
git commit -m "feat: add Skills section with flat chip layout"
```

---

## Chunk 3: Section Components (Experience, Projects)

### Task 10: Experience component

**Files:**
- Create: `src/components/Experience.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write Experience.astro**

```astro
---
import { getCollection } from 'astro:content';

const experienceEntries = await getCollection('experience');
const sorted = experienceEntries.sort((a, b) => a.data.order - b.data.order);
---
<section id="experience" class="py-20 bg-slate-50">
  <div class="max-w-6xl mx-auto px-6">
    <p class="text-sm font-medium text-blue-600 mb-2">Experience</p>
    <h2 class="text-3xl font-semibold text-slate-900 mb-10">Professional Journey</h2>

    <div class="relative">
      <!-- Timeline line -->
      <div class="absolute left-0 md:left-4 top-0 bottom-0 w-px bg-slate-200"></div>

      <div class="flex flex-col gap-12">
        {sorted.map(entry => (
          <div class="relative pl-8 md:pl-12">
            <!-- Timeline dot -->
            <div class="absolute left-0 md:left-4 top-1 w-2 h-2 -translate-x-1/2 rounded-full bg-blue-600"></div>

            <div class="mb-4">
              <h3 class="text-lg font-semibold text-slate-900">{entry.data.company}</h3>
              <p class="text-sm text-blue-600 font-medium">{entry.data.role}</p>
              <p class="text-xs text-slate-500">{entry.data.startDate} — {entry.data.endDate} · {entry.data.location}</p>
            </div>

            <div class="flex flex-col gap-4">
              {entry.data.projects.map(project => (
                <div class="p-4 border border-slate-200 rounded-lg bg-white">
                  <h4 class="text-sm font-semibold text-slate-900 mb-2">{project.title}</h4>
                  <p class="text-xs text-slate-500 leading-relaxed mb-3">{project.description}</p>
                  <div class="flex flex-wrap gap-1.5">
                    {project.tech.map(tag => (
                      <span class="px-2 py-1 text-xs text-blue-700 bg-blue-50 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Experience to index.astro**

- [ ] **Step 3: Run dev server and verify**

Verify: timeline renders with all 6 companies, nested project cards show.

- [ ] **Step 4: Commit**

```bash
git add src/components/Experience.astro src/pages/index.astro
git commit -m "feat: add Experience section with timeline layout"
```

### Task 11: Projects section with Preact filter island

**Files:**
- Create: `src/components/Projects.astro`
- Create: `src/components/ProjectFilter.tsx`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write ProjectFilter.tsx (Preact island)**

```tsx
import { useState, useMemo } from 'preact/hooks';

interface ProjectLink {
  label: string;
  url: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  sector: string;
  tech: string[];
  image?: string;
  links?: ProjectLink[];
  date?: string;
}

interface Props {
  projects: Project[];
}

const sectorLabels: Record<string, string> = {
  all: 'All Projects',
  nlp: 'NLP & LLMs',
  healthcare: 'Healthcare',
  cv: 'Computer Vision',
  ml: 'Machine Learning',
  energy: 'Renewable Energy',
  transport: 'Transportation',
  'data-analysis': 'Data Analysis',
  'image-processing': 'Image Processing',
};

export default function ProjectFilter({ projects }: Props) {
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('all');

  const sectors = useMemo(() => {
    const unique = [...new Set(projects.map(p => p.sector))];
    return ['all', ...unique];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const matchesSector = sector === 'all' || p.sector === sector;
      const matchesSearch = search === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tech.some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchesSector && matchesSearch;
    });
  }, [projects, search, sector]);

  return (
    <div>
      <div class="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
          class="flex-1 px-4 py-2.5 text-sm border border-slate-200 rounded-md bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <select
          value={sector}
          onChange={(e) => setSector((e.target as HTMLSelectElement).value)}
          class="px-4 py-2.5 text-sm border border-slate-200 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        >
          {sectors.map(s => (
            <option key={s} value={s}>{sectorLabels[s] || s}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p class="text-sm text-slate-500 text-center py-12">No projects found matching your criteria.</p>
      ) : (
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(project => (
            <div key={project.id} class="border border-slate-200 rounded-lg bg-white overflow-hidden">
              {project.image && (
                <img src={project.image} alt={project.title} class="w-full h-40 object-cover" loading="lazy" />
              )}
              <div class="p-5">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-sm font-semibold text-slate-900 line-clamp-1">{project.title}</h3>
                  {project.date && <span class="text-xs text-slate-400 shrink-0 ml-2">{project.date}</span>}
                </div>
                <p class="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                <div class="flex flex-wrap gap-1.5 mb-3">
                  {project.tech.slice(0, 4).map(tag => (
                    <span key={tag} class="px-2 py-1 text-xs text-blue-700 bg-blue-50 rounded">{tag}</span>
                  ))}
                  {project.tech.length > 4 && (
                    <span class="px-2 py-1 text-xs text-slate-500 bg-slate-50 rounded">+{project.tech.length - 4}</span>
                  )}
                </div>
                {project.links && project.links.length > 0 && (
                  <div class="flex gap-3">
                    {project.links.map(link => (
                      <a key={link.url} href={link.url} target="_blank" rel="noopener"
                         class="text-xs text-blue-600 hover:text-blue-700 font-medium">
                        {link.label} →
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Write Projects.astro (wrapper)**

```astro
---
import { getCollection } from 'astro:content';
import ProjectFilter from './ProjectFilter.tsx';

const projectEntries = await getCollection('projects');
const projects = projectEntries
  .sort((a, b) => a.data.order - b.data.order)
  .map(entry => ({
    id: entry.id,
    ...entry.data,
  }));
---
<section id="projects" class="py-20 bg-white">
  <div class="max-w-6xl mx-auto px-6">
    <p class="text-sm font-medium text-blue-600 mb-2">Projects</p>
    <h2 class="text-3xl font-semibold text-slate-900 mb-8">Featured Work</h2>
    <ProjectFilter client:visible projects={projects} />
  </div>
</section>
```

- [ ] **Step 3: Add Projects to index.astro**

- [ ] **Step 4: Run dev server and verify**

Verify: project cards render, search filters in real-time, sector dropdown works, "No projects found" shows for empty results.

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects.astro src/components/ProjectFilter.tsx src/pages/index.astro
git commit -m "feat: add Projects section with Preact search/filter island"
```

---

## Chunk 4: Section Components (Education, Testimonials, Contact, Footer)

### Task 12: Education component

**Files:**
- Create: `src/components/Education.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write Education.astro**

```astro
---
const education = [
  {
    institution: 'Northumbria University',
    location: 'UK',
    degree: 'Master of Science in Data Science',
    distinction: 'with Distinction',
    period: 'Jan 2022 — Jul 2023',
    description: 'Developed a machine learning model to assess the effectiveness of smartphone and wearable cueing for drooling in Parkinson\'s Disease, utilizing statistical analysis and predictive modeling.',
  },
  {
    institution: 'VNU — Ho Chi Minh University of Technology',
    location: 'Vietnam',
    degree: 'Bachelor of Engineering in Electrical and Telecommunication',
    distinction: '',
    period: 'Sep 2015 — May 2020',
    description: 'Applied Deep Learning techniques to solve the inverse problem in Image Super-Resolution, enhancing image quality and resolution through advanced neural network architectures.',
  },
];
---
<section id="education" class="py-20 bg-slate-50">
  <div class="max-w-6xl mx-auto px-6">
    <p class="text-sm font-medium text-blue-600 mb-2">Education</p>
    <h2 class="text-3xl font-semibold text-slate-900 mb-10">Academic Background</h2>
    <div class="grid md:grid-cols-2 gap-6">
      {education.map(edu => (
        <div class="p-6 border border-slate-200 rounded-lg bg-white">
          <h3 class="text-lg font-semibold text-slate-900 mb-1">{edu.institution}</h3>
          <p class="text-sm text-blue-600 font-medium mb-1">
            {edu.degree}{edu.distinction && ` (${edu.distinction})`}
          </p>
          <p class="text-xs text-slate-500 mb-4">{edu.period} · {edu.location}</p>
          <p class="text-xs text-slate-500 leading-relaxed">{edu.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Education to index.astro**

- [ ] **Step 3: Commit**

```bash
git add src/components/Education.astro src/pages/index.astro
git commit -m "feat: add Education section component"
```

### Task 13: Testimonials component

**Files:**
- Create: `src/components/Testimonials.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write Testimonials.astro**

```astro
---
const testimonials = [
  {
    quote: "Truong's work on our multi-agent AI system was exceptional. His implementation of a RAG-based policy agent and a database-integrated ticket agent led to a 60% reduction in operational costs and enabled 24/7 customer support.",
    name: 'Dr. Sarah Chen',
    title: 'AI Research Director',
    company: 'Tech Innovation Labs',
  },
  {
    quote: "The fashion recommendation system Truong and his team built was a game-changer for our e-commerce platform. The computer vision model achieved 92% average precision, leading to a 30% increase in click-through rates and a 20% increase in cross-category purchases.",
    name: 'Michael Rodriguez',
    title: 'Lead Software Engineer',
    company: 'Vision Systems Inc',
  },
  {
    quote: "Truong's analysis of the CIBMTR dataset was outstanding. His Cox Proportional Hazards model achieved a C-index of 0.6688 and successfully stratified patients into distinct risk groups, providing invaluable insights for our clinical intervention strategies.",
    name: 'Prof. Emily Watson',
    title: 'Research Supervisor',
    company: 'Northumbria University',
  },
];
---
<section id="testimonials" class="py-20 bg-white">
  <div class="max-w-6xl mx-auto px-6">
    <p class="text-sm font-medium text-blue-600 mb-2">Testimonials</p>
    <h2 class="text-3xl font-semibold text-slate-900 mb-10">What People Say</h2>
    <div class="grid md:grid-cols-3 gap-6">
      {testimonials.map(t => (
        <div class="p-6 border border-slate-200 rounded-lg bg-white">
          <svg class="w-8 h-8 text-blue-100 mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p class="text-sm text-slate-600 leading-relaxed mb-6">{t.quote}</p>
          <div>
            <p class="text-sm font-semibold text-slate-900">{t.name}</p>
            <p class="text-xs text-slate-500">{t.title}, {t.company}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Testimonials to index.astro**

- [ ] **Step 3: Commit**

```bash
git add src/components/Testimonials.astro src/pages/index.astro
git commit -m "feat: add Testimonials section component"
```

### Task 14: Contact component

**Files:**
- Create: `src/components/Contact.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write Contact.astro**

```astro
---
import { Mail, MapPin, Linkedin, Github } from 'lucide-astro';

const contactInfo = [
  { Icon: Mail, label: 'Email', value: 'ntg2208@gmail.com', href: 'mailto:ntg2208@gmail.com' },
  { Icon: MapPin, label: 'Location', value: 'London, UK', href: undefined },
  { Icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/ntg2208', href: 'https://www.linkedin.com/in/ntg2208/' },
  { Icon: Github, label: 'GitHub', value: 'github.com/ntg2208', href: 'https://github.com/ntg2208' },
];
---
<section id="contact" class="py-20 bg-slate-50">
  <div class="max-w-6xl mx-auto px-6">
    <p class="text-sm font-medium text-blue-600 mb-2">Contact</p>
    <h2 class="text-3xl font-semibold text-slate-900 mb-4">Let's Build Something Amazing Together</h2>
    <p class="text-slate-500 mb-10 max-w-2xl">
      I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious team.
    </p>

    <div class="grid md:grid-cols-2 gap-12">
      <div class="flex flex-col gap-4">
        {contactInfo.map(info => (
          <div class="flex items-start gap-3">
            <info.Icon class="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <p class="text-xs text-slate-500 mb-0.5">{info.label}</p>
              {info.href ? (
                <a href={info.href} target={info.href.startsWith('mailto') ? undefined : '_blank'}
                   rel={info.href.startsWith('mailto') ? undefined : 'noopener'}
                   class="text-sm text-blue-600 hover:text-blue-700">
                  {info.value}
                </a>
              ) : (
                <p class="text-sm text-slate-900">{info.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="flex flex-col gap-4">
        <input type="text" name="name" placeholder="Your Name" required
               class="px-4 py-2.5 text-sm border border-slate-200 rounded-md bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
        <input type="email" name="email" placeholder="Your Email" required
               class="px-4 py-2.5 text-sm border border-slate-200 rounded-md bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
        <input type="text" name="subject" placeholder="Subject" required
               class="px-4 py-2.5 text-sm border border-slate-200 rounded-md bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
        <textarea name="message" rows="5" placeholder="Tell me about your project..." required
                  class="px-4 py-2.5 text-sm border border-slate-200 rounded-md bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"></textarea>
        <!-- Honeypot for spam -->
        <input type="text" name="_gotcha" class="hidden" />
        <button type="submit"
                class="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors self-start">
          Send Message
        </button>
      </form>
    </div>
  </div>
</section>
```

**ACTION REQUIRED:** The `YOUR_FORM_ID` placeholder must be replaced before deployment. Create a form at https://formspree.io and insert the real form ID. Do NOT deploy with the placeholder — the form will not work.

- [ ] **Step 2: Replace Formspree placeholder with real form ID**

The user must create a form at https://formspree.io/forms and replace `YOUR_FORM_ID` in `Contact.astro` with the actual ID (e.g., `xyzabcde`). If the user does not yet have a Formspree account, they should sign up and create a form linked to `ntg2208@gmail.com`.

- [ ] **Step 3: Add Contact to index.astro**

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.astro src/pages/index.astro
git commit -m "feat: add Contact section with Formspree form"
```

### Task 15: Footer component

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write Footer.astro**

```astro
---
const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/ntg2208' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ntg2208/' },
  { label: 'Email', href: 'mailto:ntg2208@gmail.com' },
];

const year = new Date().getFullYear();
---
<footer class="bg-slate-50 border-t border-slate-200">
  <div class="max-w-6xl mx-auto px-6 py-12 text-center">
    <a href="#home" class="text-xl font-bold text-slate-900">TGN</a>
    <p class="text-sm text-slate-500 mt-1 mb-6">AI Engineer & LLM Specialist</p>

    <div class="flex justify-center gap-6 mb-4">
      {quickLinks.map(link => (
        <a href={link.href} class="text-sm text-slate-500 hover:text-blue-600 transition-colors">{link.label}</a>
      ))}
    </div>

    <div class="flex justify-center gap-6 mb-8">
      {socialLinks.map(link => (
        <a href={link.href} target={link.href.startsWith('mailto') ? undefined : '_blank'}
           rel={link.href.startsWith('mailto') ? undefined : 'noopener'}
           class="text-sm text-slate-500 hover:text-blue-600 transition-colors">
          {link.label}
        </a>
      ))}
    </div>

    <p class="text-xs text-slate-400">&copy; {year} Truong Giang Nguyen. All rights reserved.</p>
  </div>

  <!-- Back to top -->
  <button id="back-to-top" aria-label="Back to top"
          class="fixed bottom-6 right-6 w-10 h-10 bg-white border border-slate-200 rounded-md text-slate-500 hover:text-blue-600 hover:border-blue-600 transition-colors hidden items-center justify-center">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
    </svg>
  </button>
</footer>

<script>
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn?.classList.remove('hidden');
      btn?.classList.add('flex');
    } else {
      btn?.classList.add('hidden');
      btn?.classList.remove('flex');
    }
  });
  btn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
</script>
```

- [ ] **Step 2: Add Footer to index.astro**

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add Footer with back-to-top button"
```

---

## Chunk 5: Final Assembly & Cleanup

### Task 16: Assemble complete index.astro

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write final index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Skills from '../components/Skills.astro';
import Experience from '../components/Experience.astro';
import Projects from '../components/Projects.astro';
import Education from '../components/Education.astro';
import Testimonials from '../components/Testimonials.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
---
<Layout>
  <Header />
  <main class="pt-16">
    <Hero />
    <About />
    <Skills />
    <Experience />
    <Projects />
    <Education />
    <Testimonials />
    <Contact />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 2: Run build to verify**

```bash
npm run build
```

Expected: Build succeeds, `dist/` directory created with `index.html`.

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```

Expected: Full site renders at localhost:4321 with all sections.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: assemble complete single-page portfolio"
```

### Task 17: Create 404 page

**Files:**
- Create: `src/pages/404.astro`

- [ ] **Step 1: Write 404.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Page Not Found | Truong Giang Nguyen">
  <div class="min-h-screen flex flex-col items-center justify-center px-6 text-center">
    <h1 class="text-6xl font-bold text-slate-900 mb-4">404</h1>
    <p class="text-lg text-slate-500 mb-8">Page not found.</p>
    <a href="/" class="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
      Back to Home
    </a>
  </div>
</Layout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/404.astro
git commit -m "feat: add custom 404 page"
```

### Task 18: Add .nojekyll file

**Files:**
- Create: `public/.nojekyll`

- [ ] **Step 1: Create .nojekyll file**

This prevents GitHub Pages from processing the site with Jekyll.

```bash
touch public/.nojekyll
```

- [ ] **Step 2: Commit**

```bash
git add public/.nojekyll
git commit -m "chore: add .nojekyll for GitHub Pages"
```

### Task 19: Update .gitignore and clean up

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Update .gitignore for Astro**

Add to `.gitignore`:

```
# Astro
dist/
node_modules/
.astro/
```

- [ ] **Step 2: Verify build works end-to-end**

```bash
npm run build && npm run preview
```

Walk through all sections and verify:
- Header: fixed, nav links scroll, mobile menu works, resume button downloads PDF
- Hero: two-column, image loads, stats visible
- About: bio text, 4 expertise cards
- Skills: chip layout, 4 groups
- Experience: timeline, 6 companies, nested project cards
- Projects: search works, filter works, cards render with images
- Education: 2 cards
- Testimonials: 3 cards
- Contact: info list, form present
- Footer: links, social, copyright, back-to-top button

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: update .gitignore for Astro build output"
```

### Task 20: Remove old Jekyll files (after verification)

**Files:**
- Delete: `_config.yml`, `Gemfile`, `style.css`, `index.html`, `index-backup.html`
- Delete: `assets/css/`, `assets/js/`, `assets/icons/`, `assets/img/` (if exists)
- Keep: `assets/images/` (already copied to `public/images/`, but keep until deployment is verified)

- [ ] **Step 1: Confirm new site builds and serves correctly**

```bash
npm run build && npm run preview
```

- [ ] **Step 2: Remove old Jekyll files**

```bash
git rm _config.yml Gemfile style.css index.html index-backup.html
git rm -r assets/css/ assets/js/ assets/icons/
git rm -r assets/img/ 2>/dev/null || true
git rm work_experience.csv work_experience_rewritten.md projects_rewritten.md
```

- [ ] **Step 3: Remove duplicate assets/images (already in public/images/)**

```bash
git rm -r assets/images/
```

- [ ] **Step 4: Remove .env if present**

```bash
git rm --cached .env 2>/dev/null || true
```

- [ ] **Step 5: Run final build**

```bash
npm run build
```

Expected: Clean build with no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove old Jekyll files after Astro migration"
```
