# typescript-backend-starter v2.0.0

A minimal, opinionated starter template for building Node.js backends in
TypeScript, with:

-   Hono as the backend framework
-   Zero-config TypeScript setup
-   Comprehensive ESLint configuration (very strict, custom config)
-   Built-in Vitest support for unit testing

---

## 📦 Prerequisites

-   Node.js ≥20.0.0
-   pnpm ≥6

---

## 🚀 Getting Started

1. Clone the repo

2. Install dependencies

3. Run in development

-   **Build & watch** with esbuild + node watcher

```sh
pnpm run dev
```

-   **Type-check only** in watch mode

```sh
pnpm run dev:tsc
```

4. Lint

```sh
pnpm run lint # or pnpm run lint:fix
```

5. Test

```sh
pnpm run test # watch mode
pnpm run test:ci # single mode
```

6. Build for production

```sh
pnpm run build
```

7. Start the compiled output

```sh
pnpm run start
```

---

## 📦 Features

-   Automated changelog generation and release notes using
    [changelogen](https://github.com/unjs/changelogen).
-   Zero-config TypeScript setup
-   Strict, extensible ESLint configuration
-   Pre-configured Vitest for unit testing
-   Prettier for code formatting
-   Husky & lint-staged for pre-commit quality checks
-   Environment variable validation with Zod
-   GitHub Actions for CI/CD
-   **Hono** as the backend framework for fast, modern routing and middleware
-   Built-in support for serving static files and favicon

---

## ⚡ Hono Backend

This project uses [Hono](https://hono.dev/) as the backend framework, providing
a lightweight, modern, and fast routing layer for Node.js.

**Current endpoints and middleware:**

-   `GET /` — Returns `Hello, World!`
-   `GET /health` — Health check endpoint, returns `{ status: 'ok' }`
-   `GET /testError` — Simulates an error, returns a 500 response
-   `GET /favicon.ico` — Serves a static favicon
-   `GET /static/*` — Serves static files from the public directory
-   404 handler — Returns `This route does not exist` for unknown routes

**Middleware:**

-   Error handling middleware for clean error responses
-   Static file serving middleware
-   Favicon middleware

**Testing:**

-   Basic tests are included for all main endpoints and error cases, ensuring
    reliability and quick feedback during development.

---

## 🛠️ TypeScript Configuration

All compiler options live in [tsconfig.json](tsconfig.json):

-   `esModuleInterop`, `module`: preserve ESM imports/exports
-   `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` for
    maximum type safety
-   `isolatedModules` + `noEmit` for compatibility with bundlers (we use
    esbuild)
-   `rootDir: "./src"` → `outDir: "./dist"`
-   JSON module resolution, `.ts` extension imports & source maps enabled

---

## 🔍 ESLint Configuration

ESLint setup is in [eslint.config.js](eslint.config.js), powered by
`typescript-eslint`:

-   **Plugins**:
    -   `@typescript-eslint`
    -   `unicorn`, `sonarjs`, `promise`, `import`, `perfectionist`,
        `error-cause`, `eslint-comments` & JSON plugins
-   **Rules**:
    -   Strict TypeScript rules (`no-unsafe-*`, `strict-boolean-expressions`,
        `no-misused-promises`, etc.)
    -   Code style & best practices (unicorn, sonarjs, promise)
    -   Sorting & formatting (perfectionist, import/order)
-   Ignores: `node_modules`, `dist`, `.eslintcache`, `pnpm-lock.yaml`, etc.

Lint scripts are defined in [package.json](package.json#L26):

```jsonc
"scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint --fix .",
  /* ... */
}
```

## ✅ Testing with Vitest

Using Vitest for unit tests. A sample test lives under /tests

```sh
"test": "vitest",
"test:ci": "vitest --run"
```

## 🪝 Git Hooks

This project uses [Husky](https://typicode.github.io/husky/) and
[lint-staged](https://github.com/okonet/lint-staged) to ensure code quality
before commits:

### Pre-commit Hook

The pre-commit hook automatically runs the following checks:

-   **ESLint**: Fixes linting issues automatically with `--fix` on staged files
-   **Type Check**: Runs TypeScript compiler to verify types with
    `pnpm typecheck`
-   **Build**: Ensures the project builds successfully with `pnpm build`
-   **Tests**: Runs the full test suite with `pnpm test:ci`
-   **Knip**: Finds and fixes unused dependencies, exports and files.

The pre-commit hook runs commands in the following order:

1. **lint-staged** - ESLint fixes on staged files
2. **typecheck** - TypeScript type checking
3. **build** - Project compilation
4. **test:ci** - Full test suite
5. **knip** - Unused dependencies cleanup

If any step fails, the commit is blocked.

Configuration is in `package.json`:

```jsonc
"lint-staged": {
  "*.{js,ts,json}": [
    "eslint --fix"
  ]
}
```

### Setup

Husky hooks are automatically installed when you run `pnpm install` (via the
`prepare` script). The hooks are stored in the `.husky/` directory.

## 🎨 Prettier Configuration

Using Prettier to enforce a consistent code style. All options live in
[`.prettierrc.json`](.prettierrc.json):

Key settings:

-   singleQuote: use single quotes for strings
-   semi: use semicolons
-   arrowParens: always include parentheses around arrow function arguments
-   trailingComma: add trailing commas where valid in ES5
-   printWidth, tabWidth, useTabs: control line length and indentation

## 🌱 Environment Variable Validation

This project uses [Zod](https://zod.dev/) to validate environment variables at
startup, ensuring your app only runs with the required configuration.

### How it works

-   The schema for required environment variables is defined in
    [`src/config/env.ts`](src/config/env.ts) using Zod.
-   On startup, the app parses and validates `process.env` against this schema.
-   If any variable is missing or invalid (e.g., `PORT` is not a number or out
    of range), the app logs a clear error and exits immediately.
-   This prevents runtime errors due to misconfiguration.

Example schema:

```typescript
const envSchema = z.object({
    NODE_ENV: z.string(),
    PORT: z.coerce.number().min(1024).max(65_535),
});
```

### Error reporting

If validation fails, a detailed message is printed to the console, listing all
issues with the environment variables. This helps you quickly identify and fix
configuration problems.

### Usage

-   Set your environment variables (e.g., in a `.env` file or via your process
    manager).
-   The app will not start unless all required variables are present and valid.

**Tip:** `NODE_ENV` is not set by default by Node.js. Make sure to set it
explicitly (e.g., `NODE_ENV=development`) in your environment.

See [`src/config/env.ts`](src/config/env.ts) for the full

## 🔄 Continuous Integration

This project uses GitHub Actions for CI/CD automation. The workflows are defined
in the `.github/workflows` directory:

### Main Workflow

The main workflow runs on push to main branch and pull requests:

-   **ESLint**: Enforces code quality and style standards
-   **Unit Tests**: Runs the test suite with Vitest

The CI process helps catch issues early by validating each change against our
quality standards before merging.

### Dependency Updates

A scheduled workflow runs periodically to:

-   Check for outdated dependencies using Dependabot
-   Automatically create PRs for security fixes and minor updates
-   Run tests to verify compatibility with updated packages

## 📄 License

ISC © Rogerio Romao
