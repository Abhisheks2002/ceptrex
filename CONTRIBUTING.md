# Contributing

Thanks for helping improve **Ceptrex**.

## Workflow
1. Fork & branch: `git checkout -b feat/<short-name>`
2. Install: `bun install`
3. Develop: `bun run dev`
4. Lint & format before pushing:
   ```bash
   bun run lint
   bun run format
   ```
5. Open a PR against `main` with a clear description and screenshots for UI changes.

## Branch naming
- `feat/<scope>` — new features
- `fix/<scope>` — bug fixes
- `chore/<scope>` — tooling / docs
- `refactor/<scope>` — internal changes, no behavior shift

## Commit convention
Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
feat(hero): add animated logo lockup
fix(contact): validate email length
docs(readme): document Cloudflare deploy
```

## Code style
- TypeScript strict mode is on — no `any` unless justified.
- Use semantic Tailwind tokens from `src/styles.css`. Never hard-code colors in components.
- Prefer **server functions** (`src/lib/*.functions.ts`) for any logic that hits secrets or a database.
- Keep components < 200 LOC; extract presentational subcomponents.
- Run `bun run lint` — zero warnings policy on `main`.

## Adding routes
Files in `src/routes/` are auto-registered. Do **not** edit `src/routeTree.gen.ts`.

## Adding shadcn components
```bash
bunx shadcn@latest add <component>
```

## PR checklist
- [ ] Builds locally (`bun run build`)
- [ ] Lints clean
- [ ] Screenshots for visual changes
- [ ] Docs updated when behavior or env vars change
- [ ] No secrets in code or commits
