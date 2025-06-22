# typescript-backend-starter

A minimal, opinionated starter template for building Node.js backends in
TypeScript, with:

-   Zero-config TypeScript setup
-   Comprehensive ESLint configuration (very strict, custom config)
-   Built-in Vitest support for unit testing

[![Build Status](https://app.travis-ci.com/rogerio-romao/typescript-backend-starter.svg?token=q1y9rjFCNJpSjtuz4pWy&branch=main)](https://app.travis-ci.com/rogerio-romao/typescript-backend-starter)

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

## 🎨 Prettier Configuration

Using Prettier to enforce a consistent code style. All options live in
[`.prettierrc.json`](.prettierrc.json):

Key settings:

-   singleQuote: use single quotes for strings
-   semi: use semicolons
-   arrowParens: always include parentheses around arrow function arguments
-   trailingComma: add trailing commas where valid in ES5
-   printWidth, tabWidth, useTabs: control line length and indentation

## 📄 License

ISC © Rogerio Romao
