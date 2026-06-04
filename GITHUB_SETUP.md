# GitHub Setup

## 1. Repository creation

From the Lovable editor:
**Plus (+) menu → GitHub → Connect project → Create Repository.**

Or import this codebase manually:
```bash
gh repo create ceptrex-lovable --private --source . --remote origin --push
```

## 2. Branch strategy

| Branch       | Purpose                              |
|--------------|--------------------------------------|
| `main`       | Always deployable. Protected.        |
| `develop`    | Optional integration branch.         |
| `feat/*`     | New features                         |
| `fix/*`      | Bug fixes                            |
| `chore/*`    | Tooling / docs                       |

Recommended protections on `main`:
- Require PR + 1 approval
- Require status checks: `lint`, `build`
- Block force pushes & deletions

## 3. Commit convention

Use [Conventional Commits](https://www.conventionalcommits.org/) — see [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## 4. GitHub Actions

Create `.github/workflows/ci.yml`:

```yaml
name: CI
on:
  push: { branches: [main] }
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with: { bun-version: latest }
      - run: bun install --frozen-lockfile
      - run: bun run lint
      - run: bun run build
```

## 5. Required GitHub Secrets

Set under **Settings → Secrets and variables → Actions**:

| Secret                       | Used by                          |
|------------------------------|----------------------------------|
| `CLOUDFLARE_API_TOKEN`       | `wrangler deploy` (optional CD)  |
| `CLOUDFLARE_ACCOUNT_ID`      | `wrangler deploy`                |
| `VERCEL_TOKEN`               | Vercel deploy action (optional)  |
| `SUPABASE_SERVICE_ROLE_KEY`  | If you run migrations in CI      |

## 6. Optional deploy workflow (Cloudflare)

```yaml
name: Deploy
on: { push: { branches: [main] } }
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bun run build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

## 7. Issue & PR templates

Place under `.github/`:
- `ISSUE_TEMPLATE/bug_report.md`
- `ISSUE_TEMPLATE/feature_request.md`
- `pull_request_template.md`

## 8. Two-way Lovable ↔ GitHub sync

Lovable pushes & pulls automatically once GitHub is connected. Local commits sync into Lovable in real time, and Lovable edits land in `main` as commits authored by the Lovable bot.
