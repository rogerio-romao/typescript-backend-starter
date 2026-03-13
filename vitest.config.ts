import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
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
