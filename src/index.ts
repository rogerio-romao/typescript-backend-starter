import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { etag } from 'hono/etag';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';
import { requestId } from 'hono/request-id';
import { secureHeaders } from 'hono/secure-headers';
import { timeout } from 'hono/timeout';
import { trimTrailingSlash } from 'hono/trailing-slash';
import tchef from 'tchef';

import env from '@/config/parsedEnv';
import consola from '@/lib/consola';
import api from '@/routes/api';
import apiTestRoutes from '@/routes/api-test-routes';

export const app = new Hono();

// Middlewares
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }));
app.use('/static/*', serveStatic({ root: './' }));
app.use(
    '*',
    cors({
        allowHeaders: [], // Add any custom headers you want to allow
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true, // Allow credentials if needed
        exposeHeaders: [], // Add any custom headers you want to expose
        maxAge: 3600 * 2, // Cache preflight response for 2 hours
        origin: ['https://example.com'], // Replace with allowed origins
    })
);
app.use(csrf({ origin: ['https://example.com'] })); // Replace with your actual origin
app.use('*', etag()); // Enable ETag support for caching
app.use(logger());
app.use('*', requestId());
app.use('*', async (c, next) => {
    // Custom middleware to log the request ID
    consola.info(`${c.req.path} - Request ID: ${c.get('requestId')}`);
    return next();
});
app.use(secureHeaders());
app.use(timeout(30_000)); // Set a timeout of 30 seconds for all requests
app.use(trimTrailingSlash());

// App Routes
app.get('/', (c) => c.text('Typescript Backend Starter!'));
app.get('/health', (c) => c.json({ status: 'ok' }));
app.get('/test-error', () => {
    throw new Error('This is a test error');
});
app.get('/test-fetching', async (c) => {
    const response = await tchef<{
        userId: number;
        id: number;
        title: string;
        body: string;
    }>('https://jsonplaceholder.typicode.com/posts/1');
    if (!response.ok) {
        throw new HTTPException(500, {
            message: 'Failed to fetch data from external API',
            cause: response.error,
        });
    }

    return c.json(response.data);
});

// API Routes
app.route('/api/v1', api);
app.route('/api/v1/test-routes', apiTestRoutes);

// 404 and Error Handling
app.notFound((c) => c.text('This route does not exist', 404));
app.onError((err, c) => {
    if (err instanceof HTTPException) {
        return err.getResponse();
    }
    consola.error(err.message);
    return c.text('Internal Server Error', 500);
});

// Start the server
serve({ fetch: app.fetch, port: env.PORT }, (info) => {
    consola.success(`Server is running at http://localhost:${info.port}`);
});

consola.info('Typescript Backend Starter!');
