import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        coverage: {
            exclude: ['esbuild.config.js', 'eslint.config.js', 'vitest.config.ts'],
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            thresholds: {
                lines: 90,
                functions: 65,
                branches: 85,
            },
        },
        env: {
            NODE_ENV: 'test',
            PORT: '3000',
            ALLOWED_ORIGINS: 'http://localhost:5173',
        },
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
});
