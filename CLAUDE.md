# CLAUDE.md

## Commands

```bash
pnpm dev          # build + run + typecheck in parallel (watch mode)
pnpm test:ci      # run tests once (non-interactive)
pnpm lint         # eslint
pnpm typecheck    # tsc --noEmit
pnpm build        # esbuild → dist/index.js
pnpm knip         # dead code / unused dependency check
```

Pre-commit hook runs: `lint-staged → typecheck → build → test:ci → knip`

## Conventions

- Path alias `@/` maps to `src/` — relative imports are banned by ESLint
- Schemas in `src/schemas/`, validators in `src/validators/` — keep them separate
- `zValidator` callbacks handle errors only; business logic belongs in route handlers
- All error responses use `{ error: string }` JSON shape, except for `test-validator.validator.ts` which returns `{ errors: Record<string, string[]>, message: string }` for validation failures.
- Env vars are validated at startup via Zod in `src/config/parsedEnv.ts` — add new vars there, not in `index.ts`
- Demo routes live in `src/routes/api-test-routes.ts` — these exist to demonstrate patterns, not as real endpoints
