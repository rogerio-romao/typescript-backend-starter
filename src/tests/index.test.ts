import { describe, expect, test } from 'vitest';

import { app } from '@/index';

describe('Hono App Tests', () => {
    test('GET / should return Typescript Backend Starter!', async () => {
        const res = await app.request('/');
        const text = await res.text();

        expect(res.status).toBe(200);
        expect(text).toBe('Typescript Backend Starter!');
    });

    test('GET /health should return status ok', async () => {
        const res = await app.request('/health');
        const json = await res.json();

        expect(res.status).toBe(200);
        expect(json).toEqual({ status: 'ok' });
    });

    test('GET /test-error should throw an error', async () => {
        const res = await app.request('/test-error');
        const text = await res.text();

        expect(res.status).toBe(500);
        expect(text).toBe('Internal Server Error');
    });

    test('GET /favicon.ico should return favicon', async () => {
        const res = await app.request('/favicon.ico');

        expect(res.status).toBe(200);
    });

    test('GET /static/* should serve static files', async () => {
        const res = await app.request('/static/testfile.txt');

        expect(res.status).toBe(200);
    });

    test('Non-existent route should return 404', async () => {
        const res = await app.request('/non-existent-route');
        const text = await res.text();

        expect(res.status).toBe(404);
        expect(text).toBe('This route does not exist');
    });
});
