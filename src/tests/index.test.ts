import tchef from 'tchef';
import { describe, expect, test, vi } from 'vitest';

import { app } from '@/index';

vi.mock('tchef');

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
        const json = await res.json();

        expect(res.status).toBe(500);
        expect(json).toEqual({ error: 'Internal Server Error' });
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
        const json = await res.json();

        expect(res.status).toBe(404);
        expect(json).toEqual({ error: 'This route does not exist' });
    });

    test('POST request body exceeding 4MB returns 413', async () => {
        const res = await app.request('/api/v1/test-routes/test-validator', {
            body: 'x'.repeat(4 * 1024 * 1024 + 1),
            headers: {
                'Content-Length': String(4 * 1024 * 1024 + 1),
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
        const json = await res.json();

        expect(res.status).toBe(413);
        expect(json).toEqual({ error: 'Request body is too large' });
    });

    test('returns 429 after exceeding rate limit', async () => {
        const uniqueIp = `10.0.0.${Date.now() % 256}`;
        const headers = { 'x-forwarded-for': uniqueIp };

        for (let i = 0; i < 100; i++) {
            await app.request('/health', { headers });
        }

        const res = await app.request('/health', { headers });
        expect(res.status).toBe(429);
    });

    describe('GET /test-fetching', () => {
        test('returns fetched data on success', async () => {
            vi.mocked(tchef).mockResolvedValueOnce({
                data: {
                    body: 'Test body',
                    id: 1,
                    title: 'Test Title',
                    userId: 1,
                },
                ok: true,
            } satisfies Awaited<ReturnType<typeof tchef>>);

            const res = await app.request('/test-fetching');
            const json = await res.json();

            expect(res.status).toBe(200);
            expect(json).toEqual({
                body: 'Test body',
                id: 1,
                title: 'Test Title',
                userId: 1,
            });
        });

        test('returns 502 when upstream fetch fails', async () => {
            vi.mocked(tchef).mockResolvedValueOnce({
                error: 'network error',
                ok: false,
                statusCode: 503,
            } satisfies Awaited<ReturnType<typeof tchef>>);

            const res = await app.request('/test-fetching');
            const json = await res.json();

            expect(res.status).toBe(502);
            expect(json).toEqual({
                error: 'Failed to fetch data from external API',
            });
        });
    });
});
