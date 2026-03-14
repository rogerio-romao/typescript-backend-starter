import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import tchef from 'tchef';

import env from '@/config/parsedEnv';
import consola from '@/lib/consola';
import { setupMiddleware } from '@/middleware/setup';
import api from '@/routes/api';
import apiTestRoutes from '@/routes/api-test-routes';

export const app = new Hono();

setupMiddleware(app);

// App Routes
app.get('/', (c) => c.text('Typescript Backend Starter!'));
app.get('/health', (c) => c.json({ status: 'ok' }));
app.get('/test-error', () => {
    throw new Error('This is a test error');
});
app.get('/test-fetching', async (c) => {
    const response = await tchef<{
        body: string;
        id: number;
        title: string;
        userId: number;
    }>('https://jsonplaceholder.typicode.com/posts/1');
    if (!response.ok) {
        throw new HTTPException(502, {
            cause: response.error,
            message: 'Failed to fetch data from external API',
        });
    }

    return c.json(response.data);
});

// API Routes
app.route('/api/v1', api);
app.route('/api/v1/test-routes', apiTestRoutes);

// 404 and Error Handling
app.notFound((c) => c.json({ error: 'This route does not exist' }, 404));
app.onError((err, c) => {
    if (err instanceof HTTPException) {
        return c.json({ error: err.message }, err.status);
    }
    consola.error(err.message);
    return c.json({ error: 'Internal Server Error' }, 500);
});

// Start the server
const server = serve({ fetch: app.fetch, port: env.PORT }, (info) => {
    consola.success(`Server is running at http://localhost:${info.port}`);
});

// Graceful shutdown
const shutdown = (signal: string) => {
    consola.info(`${signal} received, shutting down gracefully...`);
    server.close(() => {
        consola.info('Server closed');
    });
};
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

consola.info('Typescript Backend Starter!');
