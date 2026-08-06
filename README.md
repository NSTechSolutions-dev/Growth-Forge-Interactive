# My Lead Foundry

Performance marketing agency site built with TanStack Start, React, and Tailwind CSS.

## Scripts

- `bun run dev` — start the development server (http://localhost:8080)
- `bun run build` — production static SPA build (outputs to `dist/client` for GitHub/GitLab Pages)
- `bun run preview` — preview the production build locally
- `bun run lint` — run ESLint
- `bun run format` — format with Prettier

## Deployment

### GitHub Pages

Pushes to `main` deploy automatically via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

1. In the repo: **Settings → Pages → Build and deployment → Source** → **GitHub Actions**
2. Push to `main` (or run the workflow manually from the Actions tab)

The site is published at [https://myleadfoundry.com](https://myleadfoundry.com). For a GitHub Pages project URL instead, set `VITE_BASE_PATH=/Growth-Forge-Interactive/` in the workflow before building.

### GitLab Pages

Pushes to the default branch deploy via [.gitlab-ci.yml](.gitlab-ci.yml) using the same static SPA build output.

## Stack

- [TanStack Start](https://tanstack.com/start) — full-stack React framework with SSR
- [TanStack Router](https://tanstack.com/router) — type-safe routing
- [Tailwind CSS v4](https://tailwindcss.com/) — styling
- [Nitro](https://v3.nitro.build/) — server build and deployment
