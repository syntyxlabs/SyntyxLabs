# Syntyx Labs Landing Page — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a premium, interactive landing page for Syntyx Labs with dark aesthetic, constellation background, animated code editor, 3D card effects, and scroll-driven animations.

**Architecture:** Next.js 14 App Router with Tailwind CSS for styling, Framer Motion for animations, and tsparticles for the interactive constellation background. Single-page static export with 6 sections: Navbar, Hero, About, Services, Portfolio, Contact+Footer. All components are client-side React — no backend.

**Tech Stack:** Next.js 14, Tailwind CSS, Framer Motion, @tsparticles/react + @tsparticles/slim, TypeScript

**Design Doc:** `docs/plans/2026-02-26-landing-page-design.md`

**Agent Workflow:** Each task is implemented by a coder agent using the `frontend-design` skill for UI components, then reviewed by a code-reviewer agent before moving to the next task.

---

## Task 1: Project Scaffolding

**Goal:** Initialize Next.js project with all dependencies and configuration.

**Step 1: Create Next.js project**

Run:
```bash
cd C:/_Projects/SyntyxLabs
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Select: No to Turbopack when prompted.

**Step 2: Install dependencies**

Run:
```bash
npm install framer-motion @tsparticles/react @tsparticles/slim
```

**Step 3: Verify project runs**

Run:
```bash
npm run dev
```

Expected: Dev server starts on localhost:3000 without errors.

**Step 4: Commit**

```bash
git add .
git commit -m "chore: scaffold Next.js project with dependencies"
```

---

## Task 2: Tailwind Theme & Global Styles

**Goal:** Configure Tailwind with the Syntyx Labs color palette, fonts, and global CSS.

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: Update Tailwind config**

In `tailwind.config.ts`, extend the theme with:
- Colors: `gold: "#F9DB9A"`, `orange-accent: "#F67300"`, `purple-accent: "#AB59D7"`, `dark: "#100900"`, `dark-light: "#1a1008"`
- Font family: `sans: ["Inter", "sans-serif"]`

**Step 2: Update global CSS**

In `src/app/globals.css`:
- Import Inter from Google Fonts via `@import`
- Set `body` background to `#100900`, text to white
- Add utility classes for glass-morphism effect (`.glass { background: rgba(255,255,255,0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); }`)
- Add warm radial gradient utility (`.glow-gradient`)
- Hide default cursor globally (`cursor: none` on body) and style scrollbar

**Step 3: Update root layout**

In `src/app/layout.tsx`:
- Set metadata: title "Syntyx Labs — Engineering the Future of Software", description, etc.
- Apply Inter font via Google Fonts next/font
- Set `<html>` to `scroll-behavior: smooth`

**Step 4: Clear default page content**

In `src/app/page.tsx`:
- Remove all default Next.js content
- Replace with a simple `<main>` placeholder

**Step 5: Verify**

Run `npm run dev` — page should show dark background, white text, Inter font loaded.

**Step 6: Commit**

```bash
git add tailwind.config.ts src/app/globals.css src/app/layout.tsx src/app/page.tsx
git commit -m "feat: configure Tailwind theme, colors, fonts, and global styles"
```

---

## Task 3: Custom Cursor Component

**Goal:** Glowing dot cursor that follows the mouse with a trailing effect.

**Files:**
- Create: `src/components/CustomCursor.tsx`
- Modify: `src/app/layout.tsx` (add CustomCursor)

**Step 1: Build CustomCursor component**

- `"use client"` component
- Track mouse position with `mousemove` event listener
- Render two divs: main dot (8px, gold) + trailing glow (32px, gold with opacity)
- Use Framer Motion `animate` to smooth the trailing glow with `spring` transition
- Position fixed, pointer-events none, z-50
- Hide on mobile (check window width or use media query)

**Step 2: Add to layout**

Import and render `<CustomCursor />` in `layout.tsx` body.

**Step 3: Verify**

Cursor should be hidden, replaced by glowing gold dot with smooth trail.

**Step 4: Commit**

```bash
git add src/components/CustomCursor.tsx src/app/layout.tsx
git commit -m "feat: add custom glowing cursor with trail effect"
```

---

## Task 4: Constellation Particle Background

**Goal:** Interactive particle network that reacts to mouse proximity.

**Files:**
- Create: `src/components/ParticleBackground.tsx`
- Modify: `src/app/layout.tsx` (add ParticleBackground)

**Step 1: Build ParticleBackground component**

- `"use client"` component
- Use `@tsparticles/react` with `@tsparticles/slim` engine
- Configuration:
  - Particles: 80 count, white color, 1-2px size, 0.3 opacity
  - Links: enabled, white, 0.15 opacity, 150px distance
  - Movement: speed 0.5, random direction
  - Interactivity: `onHover` grab mode (200px distance, 0.4 link opacity), `onHover` repulse for subtle push
  - Background: transparent (background handled by CSS)
- Position fixed, full viewport, z-0

**Step 2: Add to layout**

Render `<ParticleBackground />` in layout body, behind all content.

**Step 3: Verify**

Constellation dots should appear, connect with lines, and react to mouse hover.

**Step 4: Commit**

```bash
git add src/components/ParticleBackground.tsx src/app/layout.tsx
git commit -m "feat: add interactive constellation particle background"
```

---

## Task 5: Shared Animation Components

**Goal:** Reusable animation wrappers for scroll reveals and card effects.

**Files:**
- Create: `src/components/ScrollReveal.tsx`
- Create: `src/components/TiltCard.tsx`
- Create: `src/components/GlowCard.tsx`
- Create: `src/components/SectionHeading.tsx`

**Step 1: Build ScrollReveal component**

- `"use client"` wrapper component using Framer Motion
- Props: `children`, `direction` (up/down/left/right), `delay`, `duration`
- Uses `useInView` hook with `once: true` and `margin: "-100px"`
- Animates from hidden (opacity 0, translated) to visible (opacity 1, position 0)

**Step 2: Build TiltCard component**

- `"use client"` component
- Tracks mouse position relative to card using `onMouseMove`
- Applies CSS `transform: perspective(1000px) rotateX() rotateY()` based on mouse position
- Smooth transition on mouse leave (reset to flat)
- Props: `children`, `className`, `tiltAmount` (default 10deg)

**Step 3: Build GlowCard component**

- `"use client"` component wrapping TiltCard
- Adds cursor-following border glow effect
- Tracks mouse position, renders a radial gradient glow on the border that follows the cursor
- Glass-morphism background (rgba white, backdrop blur)
- Props: `children`, `className`

**Step 4: Build SectionHeading component**

- Reusable section title component
- Props: `title`, `subtitle` (optional), `align`
- Wraps in ScrollReveal
- Consistent typography: title in bold white, subtitle in gray-400

**Step 5: Verify**

Import and test one component on the page to confirm animations work.

**Step 6: Commit**

```bash
git add src/components/ScrollReveal.tsx src/components/TiltCard.tsx src/components/GlowCard.tsx src/components/SectionHeading.tsx
git commit -m "feat: add shared animation components (scroll reveal, tilt card, glow card)"
```

---

## Task 6: Navbar

**Goal:** Sticky navbar with blur backdrop, wordmark, nav links, and CTA.

**Files:**
- Create: `src/components/Navbar.tsx`
- Modify: `src/app/page.tsx` (add Navbar)

**Step 1: Build Navbar component**

- `"use client"` component
- Sticky top-0, z-40, backdrop-blur-md, bg-dark/80
- Left: "Syntyx Labs" wordmark in bold white, font-semibold text-xl
- Center: nav links — Home, About, Services, Portfolio, Contact
  - Each link scrolls to corresponding section ID via `href="#section-id"`
  - Active link highlight (gold underline) based on scroll position using IntersectionObserver
- Right: "Get Started" button — gold outline border, hover fills gold with dark text
- Mobile: hamburger menu icon that opens a slide-down menu with Framer Motion
- Transition: navbar becomes more opaque on scroll (detect scroll > 50px)

**Step 2: Add to page**

Import and render `<Navbar />` at top of page.tsx.

**Step 3: Verify**

Navbar should be visible, sticky, links should smooth-scroll to sections (once they exist), mobile hamburger should work.

**Step 4: Commit**

```bash
git add src/components/Navbar.tsx src/app/page.tsx
git commit -m "feat: add sticky navbar with smooth scroll and mobile menu"
```

---

## Task 7: Hero Section

**Goal:** Hero with large headline, animated code editor, badge, CTAs, and golden glow.

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/CodeEditor.tsx`
- Modify: `src/app/page.tsx` (add Hero)

**Step 1: Build CodeEditor component**

- `"use client"` component
- macOS-style window frame: dark bg (#1a1208), rounded-xl, top bar with 3 colored dots (red #ff5f56, yellow #ffbd2e, green #27c93f) + decorative icons
- Code typing animation:
  - Store code string as constant (a realistic TypeScript/React snippet)
  - Use `useEffect` + `setInterval` to reveal characters one by one
  - Blinking cursor at end of current position
  - Basic syntax highlighting via span color classes:
    - Keywords (const, let, function, return, import) → purple-accent
    - Strings → gold
    - Methods/functions → orange-accent
    - Comments → gray-500
    - Rest → white
- Loop: after code fully typed, pause 2s, clear, restart

**Step 2: Build Hero section**

- `id="home"` for nav scroll
- Two-column layout (left: text, right: code editor) on desktop, stacked on mobile
- Left column:
  - Badge pill: rounded-full bg-white/10 border border-white/20 px-4 py-1, text "Empowering Businesses with Technology" with a rocket icon (use unicode or SVG)
  - Headline: `text-5xl md:text-7xl font-bold tracking-tight`
    - "ENGINEERING THE" — white
    - "FUTURE OF" — white
    - "{ SOFTWARE }" — #AB59D7 purple-accent
  - Subtitle: text-lg text-gray-400, max-w-lg
  - CTAs row:
    - "Get Started" → `bg-gold text-dark font-semibold px-6 py-3 rounded-full hover:shadow-[0_0_30px_rgba(249,219,154,0.3)]` with arrow icon
    - "Our Services" → `border border-white/30 text-white px-6 py-3 rounded-full hover:border-gold`
- Right column: `<CodeEditor />` with slight rotation/tilt for depth
- Background: warm radial gradient from center-right, gold with low opacity `radial-gradient(ellipse at 70% 50%, rgba(249,219,154,0.15) 0%, transparent 60%)`
- All text elements wrapped in `<ScrollReveal>` with staggered delays

**Step 3: Add to page**

Import and render `<Hero />` in page.tsx after Navbar.

**Step 4: Verify**

Hero should display with typing animation, headline, CTAs, golden glow. Responsive on mobile.

**Step 5: Commit**

```bash
git add src/components/sections/Hero.tsx src/components/CodeEditor.tsx src/app/page.tsx
git commit -m "feat: add hero section with animated code editor and golden glow"
```

---

## Task 8: About Section

**Goal:** Company intro with 3 highlight cards featuring 3D tilt and glow effects.

**Files:**
- Create: `src/components/sections/About.tsx`
- Modify: `src/app/page.tsx` (add About)

**Step 1: Build About section**

- `id="about"` for nav scroll
- `<SectionHeading title="About Us" />`
- Company narrative paragraph: "Syntyx Labs is a forward-thinking software development company specializing in AI-driven solutions and custom software. We partner with businesses to transform ideas into powerful, scalable technology that drives growth and innovation."
- 3 highlight cards in a responsive grid (3 cols desktop, 1 col mobile):
  - **AI-First Approach**: icon (brain/circuit), description about integrating AI into every solution
  - **End-to-End Development**: icon (code brackets), description about full lifecycle from concept to deployment
  - **Scalable Solutions**: icon (cloud/arrows-up), description about building for growth
- Each card uses `<GlowCard>` component (3D tilt + glow border)
- Cards stagger in with `<ScrollReveal delay={index * 0.15}>`
- Icons: use simple SVG icons inline (no icon library dependency)

**Step 2: Add to page**

Import and render `<About />` in page.tsx.

**Step 3: Verify**

Section should show heading, paragraph, 3 interactive cards with tilt and glow on hover.

**Step 4: Commit**

```bash
git add src/components/sections/About.tsx src/app/page.tsx
git commit -m "feat: add about section with interactive highlight cards"
```

---

## Task 9: Services Section

**Goal:** 6 service cards in a grid with tilt, glow, and staggered scroll animations.

**Files:**
- Create: `src/components/sections/Services.tsx`
- Modify: `src/app/page.tsx` (add Services)

**Step 1: Build Services section**

- `id="services"` for nav scroll
- `<SectionHeading title="What We Do" subtitle="Comprehensive software solutions tailored to your business needs" />`
- Services data array with 6 items, each: `{ icon: JSX, title: string, description: string }`
  1. Custom Software Development — "Bespoke software solutions designed to solve your unique business challenges"
  2. AI & Machine Learning — "Intelligent systems that learn, adapt, and drive smarter business decisions"
  3. Web Application Development — "High-performance web applications built with modern frameworks and best practices"
  4. Mobile App Development — "Native and cross-platform mobile apps that deliver seamless user experiences"
  5. Cloud & DevOps — "Scalable cloud infrastructure and automated deployment pipelines"
  6. API Development & Integration — "Robust APIs that connect your systems and enable seamless data flow"
- Grid layout: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Each card: `<GlowCard>` with icon (SVG, 40px, gold color), title (text-xl font-semibold), description (text-gray-400 text-sm)
- Staggered `<ScrollReveal>` on each card

**Step 2: Add to page**

Import and render `<Services />` in page.tsx.

**Step 3: Verify**

6 cards should display in grid, each with tilt/glow on hover, staggered appear on scroll.

**Step 4: Commit**

```bash
git add src/components/sections/Services.tsx src/app/page.tsx
git commit -m "feat: add services section with 6 interactive service cards"
```

---

## Task 10: Portfolio / Capabilities Showcase

**Goal:** 3 large capability cards with animated interactive mockups.

**Files:**
- Create: `src/components/sections/Portfolio.tsx`
- Create: `src/components/mockups/DashboardMockup.tsx`
- Create: `src/components/mockups/NeuralNetworkMockup.tsx`
- Create: `src/components/mockups/MobileAppMockup.tsx`
- Modify: `src/app/page.tsx` (add Portfolio)

**Step 1: Build DashboardMockup component**

- Animated mini-dashboard with:
  - Top bar with fake nav dots and title
  - 3 bar chart bars that animate height on loop using Framer Motion
  - A line chart drawn with SVG path that animates `pathLength` from 0 to 1
  - Fake stat numbers that count up
  - Dark card background with subtle grid lines
- All animations loop infinitely with staggered delays

**Step 2: Build NeuralNetworkMockup component**

- SVG-based neural network visualization:
  - 3 layers of nodes (3-4-3 or similar)
  - Lines connecting nodes between layers
  - Nodes pulse/glow with staggered Framer Motion animations
  - Connection lines animate opacity in sequence (data flow effect)
  - Colors: gold and purple-accent nodes

**Step 3: Build MobileAppMockup component**

- Phone frame (rounded rectangle, notch at top):
  - Inside: fake app UI that auto-scrolls vertically
  - Content: colored blocks representing app screens, cards, buttons
  - Smooth infinite scroll loop using CSS animation or Framer Motion

**Step 4: Build Portfolio section**

- `id="portfolio"` for nav scroll
- `<SectionHeading title="What We Build" subtitle="Showcasing our capabilities across platforms" />`
- 3 large cards in a grid (3 cols desktop, 1 col mobile):
  - **Web Applications**: `<DashboardMockup />` + title + "Full-stack web applications with rich dashboards, real-time data, and intuitive interfaces"
  - **AI Solutions**: `<NeuralNetworkMockup />` + title + "Machine learning models, intelligent automation, and data-driven insights"
  - **Mobile Apps**: `<MobileAppMockup />` + title + "Cross-platform mobile applications with native performance and elegant design"
- Each card uses `<GlowCard>` with `<ScrollReveal>`
- Mockup sits in top portion of card, text below

**Step 5: Add to page**

Import and render `<Portfolio />` in page.tsx.

**Step 6: Verify**

Cards should display with animated mockups looping, tilt/glow effects, scroll reveal.

**Step 7: Commit**

```bash
git add src/components/sections/Portfolio.tsx src/components/mockups/ src/app/page.tsx
git commit -m "feat: add portfolio section with animated capability mockups"
```

---

## Task 11: Contact Section & Footer

**Goal:** Contact form, email display, footer with copyright and social links, cookie banner.

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/CookieBanner.tsx`
- Modify: `src/app/page.tsx` (add Contact, Footer, CookieBanner)

**Step 1: Build Contact section**

- `id="contact"` for nav scroll
- `<SectionHeading title="Let's Build Something Together" />`
- Email prominently displayed: `<a href="mailto:info@syntyxlabs.com">info@syntyxlabs.com</a>` — text-2xl, gold color, hover underline
- Contact form in a `<GlowCard>`:
  - Name input, Email input, Message textarea
  - Inputs styled: bg-white/5, border border-white/10, rounded-lg, focus:border-gold
  - Submit button: bg-gold text-dark font-semibold rounded-full px-8 py-3
  - Form `onSubmit` just prevents default (no backend) — can show a toast "Thanks! We'll be in touch."
- Wrapped in `<ScrollReveal>`

**Step 2: Build Footer**

- Border-t border-white/10
- Grid: left "© 2026 Syntyx Labs. All rights reserved.", right social icon placeholders (Instagram, Facebook/LinkedIn, X/Twitter as SVGs)
- "Scroll to explore" element with down arrow at bottom-right (smooth scroll to next section or back to top)
- Text-gray-500, small text

**Step 3: Build CookieBanner**

- Fixed bottom-0, full width, z-50
- Glass-morphism background (backdrop-blur, bg-dark/90)
- Left: cookie icon + text "This website uses cookies to enhance your browsing experience, analyze traffic, and improve our services."
- Right: "Decline" button (ghost) + "Accept" button (gold fill)
- State: hidden after Accept/Decline clicked, persist choice in localStorage
- Animate in from bottom with Framer Motion

**Step 4: Add all to page**

Import and render `<Contact />`, `<Footer />`, `<CookieBanner />` in page.tsx.

**Step 5: Verify**

Contact form should render, footer should display, cookie banner should appear and dismiss on click.

**Step 6: Commit**

```bash
git add src/components/sections/Contact.tsx src/components/Footer.tsx src/components/CookieBanner.tsx src/app/page.tsx
git commit -m "feat: add contact section, footer, and cookie consent banner"
```

---

## Task 12: Final Assembly & Polish

**Goal:** Wire everything together, responsive testing, smooth scroll behavior, final adjustments.

**Files:**
- Modify: `src/app/page.tsx` (final assembly)
- Modify: various components as needed

**Step 1: Assemble page.tsx**

Ensure all sections are in order:
```tsx
<main>
  <Navbar />
  <Hero />
  <About />
  <Services />
  <Portfolio />
  <Contact />
  <Footer />
  <CookieBanner />
  <CustomCursor />
  <ParticleBackground />
</main>
```

**Step 2: Add section spacing**

Ensure each section has consistent vertical padding (`py-20 md:py-32`) and `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` container.

**Step 3: Responsive testing**

Run dev server, test at breakpoints:
- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1280px+
- Verify: hamburger menu, stacked layouts, font sizes, card grids

**Step 4: Performance check**

- Verify particle count isn't causing lag on mobile (reduce to 40 particles on mobile)
- Verify animations are smooth (60fps)
- Custom cursor hidden on touch devices

**Step 5: Build test**

Run:
```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 6: Commit**

```bash
git add .
git commit -m "feat: final assembly, responsive polish, and build verification"
```

---

## Summary

| Task | Description | Estimated Complexity |
|------|-------------|---------------------|
| 1 | Project scaffolding | Low |
| 2 | Tailwind theme & global styles | Low |
| 3 | Custom cursor | Low |
| 4 | Constellation particle background | Medium |
| 5 | Shared animation components | Medium |
| 6 | Navbar | Medium |
| 7 | Hero section + code editor | High |
| 8 | About section | Low |
| 9 | Services section | Low |
| 10 | Portfolio with animated mockups | High |
| 11 | Contact + Footer + Cookie banner | Medium |
| 12 | Final assembly & polish | Medium |
