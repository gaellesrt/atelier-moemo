# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for moemo, a Domain-Driven Design consulting service. Deployed via GitHub Pages at `moemo.io`. No build system, package manager, or test suite — just HTML, CSS, and static assets.

## Development

No build step required. To preview locally, open `index.html` directly in a browser or use any static file server:

```bash
python3 -m http.server 8080
```

To deploy: push to the `main` branch — GitHub Pages serves the site automatically.

## Architecture

Single-page site with two source files:

- **`index.html`** — All content and structure. Sections: hero, problem statement, DDD approach, services (3 cards), about/founder, client logos, CTA, footer.
- **`style.css`** — All styles. Uses CSS custom properties for brand colors (pink, violet, cyan, yellow), responsive breakpoints at 900px, and a gradient animation for the hero orb.
- **`assets/`** — Logos and images (PNG/JPEG). Client logos: Pernod Ricard, Le Bon Coin, Innovation Makers Alliance.

The site is in French. Contact email: `hello@moemo.io`. Domain configured via `CNAME`.
