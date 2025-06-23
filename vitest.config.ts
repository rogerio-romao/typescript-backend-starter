import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        env: {
            NODE_ENV: 'test',
            PORT: '3000',
        },
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
});
