# Syntyx Labs Landing Page — Design Document

**Date**: 2026-02-26
**Status**: Approved

## Overview

Landing page for Syntyx Labs (syntyxlabs.com), a software development and AI solutions company. Single-page, static landing page with premium dark aesthetic, interactive effects, and strong visual identity.

**Contact**: info@syntyxlabs.com

## Tech Stack

- **Next.js 14** (App Router) + **Tailwind CSS**
- **Framer Motion** — scroll animations, micro-interactions, staggered reveals
- **tsparticles** — constellation network background
- Static export, no backend, fully responsive (mobile-first)

## Color Palette

| Color   | Hex       | Usage                        |
|---------|-----------|------------------------------|
| Gold    | #F9DB9A   | Primary accent, CTAs         |
| Orange  | #F67300   | Secondary accent, highlights |
| Purple  | #AB59D7   | Feature accent, hero text    |
| Dark    | #100900   | Background                   |
| White   | #FFFFFF   | Text, borders                |

## Typography

- **Font**: Inter (Google Font — geometric, clean alternative to PP Neue Montreal)
- Weights: Regular (400), Medium (500), Semibold (600), Bold (700)

## Global Effects

- **Constellation network background** — interactive particles + connecting lines, react to mouse proximity (tsparticles)
- **Custom cursor** — small glowing dot with trailing glow effect
- **Scroll journey** — all sections animate in with staggered fade/slide/scale via Framer Motion
- **Glass-morphism** — frosted glass borders on cards with backdrop blur

## Sections

### 1. Navbar (sticky, blur backdrop)

- "Syntyx Labs" text wordmark (left)
- Nav links: Home | About | Services | Portfolio | Contact (center, smooth scroll)
- "Get Started" CTA button (right, gold outline with glow)

### 2. Hero

- Badge pill: "Empowering Businesses with Technology"
- Headline: **"ENGINEERING THE FUTURE OF { SOFTWARE }"** — large bold type, "{ SOFTWARE }" in #AB59D7 purple
- Subtitle: "We craft AI-driven software solutions that help businesses scale and innovate"
- Two CTAs: "Get Started" (gold fill) + "Our Services" (ghost/outline)
- **Animated code editor** — macOS-style window with traffic light dots, typing animation with blinking cursor, syntax-highlighted code appearing in real-time
- Warm radial golden glow behind hero area

### 3. About

- Section heading with fade-in animation
- Short company narrative paragraph
- 3 highlight cards:
  - "AI-First Approach"
  - "End-to-End Development"
  - "Scalable Solutions"
- Cards have **3D tilt effect** + **cursor-following border glow**

### 4. Services

- "What We Do" heading
- 6 service cards in a grid (3x2 desktop, 1 column mobile):
  1. Custom Software Development
  2. AI & Machine Learning Solutions
  3. Web Application Development
  4. Mobile App Development
  5. Cloud & DevOps
  6. API Development & Integration
- Each card: icon, title, short description
- **3D tilt + glow trail border** on hover
- Staggered reveal animation on scroll

### 5. Portfolio / Capabilities Showcase

- "What We Build" heading
- 3 large capability cards with interactive mockups:
  - **Web Applications** — animated mini-dashboard with moving charts/bars
  - **AI Solutions** — animated neural network nodes connecting/pulsing
  - **Mobile Apps** — phone frame with scrolling app screen animation
- Cards animate in with scale + fade on scroll

### 6. Contact + Footer

- "Let's Build Something Together" heading
- info@syntyxlabs.com displayed prominently
- Contact form: name, email, message + submit button (front-end only, no backend wiring)
- Footer: copyright 2026 Syntyx Labs, social link placeholders
- Cookie consent banner (Accept/Decline)

## Out of Scope

- No login/authentication
- No backend/API
- No blog
- No pricing page
- No internationalization
- No database
