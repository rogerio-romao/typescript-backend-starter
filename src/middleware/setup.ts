import { getConnInfo } from '@hono/node-server/conninfo';
import { serveStatic } from '@hono/node-server/serve-static';
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

import env from '@/config/parsedEnv';
import consola from '@/lib/consola';

import type { Hono } from 'hono';

export function setupMiddleware(app: Hono): void {
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
            origin: env.ALLOWED_ORIGINS,
        })
    );

    // CSRF protection
    app.use(csrf({ origin: env.ALLOWED_ORIGINS }));

    // Body parsing and size limit
    app.use(
        bodyLimit({
            // Limit request body to 4MB
            maxSize: 4 * 1024 * 1024,
            onError(c) {
                return c.json({ error: 'Request body is too large' }, 413);
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
                    const xff = c.req.header('x-forwarded-for');
                    return xff === undefined
                        ? (getConnInfo(c).remote.address ?? '')
                        : (xff.split(',').at(0)?.trim() ?? '');
                } catch {
                    return c.req.header('x-forwarded-for') ?? '';
                }
            },
            limit: 100, // Limit each client to 100 requests per window
            windowMs: 60_000, // 1 minute window
        })
    );
}
