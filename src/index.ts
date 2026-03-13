import { serve } from '@hono/node-server';
import { getConnInfo } from '@hono/node-server/conninfo';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { bodyLimit } from 'hono/body-limit';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { etag } from 'hono/etag';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';
import { requestId } from 'hono/request-id';
import { secureHeaders } from 'hono/secure-headers';
import { timeout } from 'hono/timeout';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { rateLimiter } from 'hono-rate-limiter';
import tchef from 'tchef';

import env from '@/config/parsedEnv';
import consola from '@/lib/consola';
import api from '@/routes/api';
import apiTestRoutes from '@/routes/api-test-routes';

const allowedOrigins = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());

export const app = new Hono();

// Middlewares

// Serve static files (e.g., favicon, public assets)
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }));
app.use('/static/*', serveStatic({ root: './' }));

// CORS configuration
app.use(
    '*',
    cors({
        allowHeaders: [],
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
        exposeHeaders: [],
        maxAge: 3600 * 2,
        origin: allowedOrigins,
    })
);

// CSRF protection
app.use(csrf({ origin: allowedOrigins }));

// Body parsing and size limit
app.use(
    bodyLimit({
        // Limit request body to 4MB
        maxSize: 4 * 1024 * 1024,
        onError(c) {
            return c.text('Request body is too large', 413);
        },
    })
);

// ETag support for caching
app.use('*', etag());

// Built-in basic logger middleware
app.use(logger());
// Request ID middleware
app.use('*', requestId());
app.use('*', async (c, next) => {
    // Custom middleware to log the request ID
    consola.info(`${c.req.path} - Request ID: ${c.get('requestId')}`);
    return next();
});

// Security headers
app.use(secureHeaders());

// Set a timeout of 30 seconds for all requests
app.use(
    timeout(
        30_000,
        () =>
            new HTTPException(503, {
                message: 'Request timed out',
            })
    )
);

// Remove trailing slashes from URLs for consistency
app.use(trimTrailingSlash());

// Apply rate limiting middleware
app.use(
    rateLimiter({
        keyGenerator(c) {
            // Get IP from reverse proxy (e.g. Nginx, Cloudflare) OR direct connection in Node.js
            try {
                return (
                    c.req.header('x-forwarded-for') ??
                    getConnInfo(c).remote.address ??
                    ''
                );
            } catch {
                return c.req.header('x-forwarded-for') ?? '';
            }
        },
        limit: 100, // Limit each client to 100 requests per window
        windowMs: 60_000, // 1 minute window
    })
);

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
        throw new HTTPException(500, {
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
        return err.getResponse();
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
    server.close();
};
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

consola.info('Typescript Backend Starter!');
