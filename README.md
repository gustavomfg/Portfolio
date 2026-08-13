> **Documentation for Nocturne Portfolio**

# 🌙 Nocturne Portfolio

> **A modern developer portfolio designed to present projects, experience and the Nocturne ecosystem.**

Nocturne Portfolio is my personal portfolio website built with **Next.js**, focused on performance, accessibility and user experience.

Beyond presenting my work, it serves as the public entry point to the **Nocturne ecosystem**, showcasing projects, technical skills and my approach to software engineering.

---

# Features

- 🎬 Cinematic introduction
- 📱 Fully responsive layout
- ♿ Accessibility-first experience
- ⚡ Optimized performance
- 🎨 Custom design system
- 🌙 Nocturne visual identity
- 🧩 Modular component architecture
- 🔍 SEO optimized
- 🗺️ Automatic sitemap
- 🤖 Open Graph & Twitter Cards
- 🧪 Automated testing
- 🚀 Production-ready deployment

---

# Technology Stack

## Frontend

- Next.js 16
- React
- TypeScript

## Styling

- Modular CSS
- Design Tokens
- JetBrains Mono

## Tooling

- pnpm
- ESLint
- Playwright
- GitHub Actions

---

# Getting Started

## Requirements

- Node.js 24+
- pnpm 11+

## Installation

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

The application will be available at:

```text
http://localhost:3000
```

---

# Available Commands

| Command | Description |
|----------|-------------|
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript validation |
| `pnpm test` | Unit & component tests |
| `pnpm test:e2e` | End-to-end tests |

---

# Architecture

```
app/
  styles/
components/
hooks/
data/
lib/
e2e/
public/
test/
types/
```

Design principles:

- Server-first rendering
- Client hydration only where necessary
- Typed content source
- Modular architecture
- Accessibility by design
- Performance-oriented implementation

---

# Quality

Every change is validated through:

- ESLint
- TypeScript
- Unit Tests
- Component Tests
- End-to-End Tests
- Accessibility Tests (axe)
- Production Build
- Dependency Audit

Recommended before every commit:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
pnpm audit --audit-level high
```

---

# Deployment

Configure:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

`NEXT_PUBLIC_SITE_URL` is required for every production build, regardless of the hosting provider. It must be an absolute HTTPS URL for the public domain. The `http://localhost:3000` fallback is available only during development; a production build without a public URL fails immediately.

Then build normally:

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

For the production URL smoke tests, use the same public URL when starting the test environment:

```bash
NODE_ENV=production NEXT_PUBLIC_SITE_URL=https://your-domain.com pnpm test:e2e
```

The portfolio automatically generates:

- robots.txt
- sitemap.xml
- Open Graph images
- Twitter Cards
- Canonical URLs

---

# Professional Identity

The project uses **IDENTITY.md** as the canonical source describing my professional profile.

Portfolio content should always remain consistent with this document.

---
