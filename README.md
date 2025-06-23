# typescript-backend-starter

A minimal, opinionated starter template for building Node.js backends in
TypeScript, with:

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

The pre-commit hook automatically runs on staged files:

-   **ESLint**: Fixes linting issues automatically with `--fix` on staged files
-   **Tests**: Runs the full test suite with `pnpm test:ci`

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
