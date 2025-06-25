import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

import env from '@/config/parsedEnv';
import consola from '@/lib/consola';
import api from '@/routes/api';
import apiTestRoutes from '@/routes/api-test-routes';

export const app = new Hono();

// Middlewares
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }));
app.use('/static/*', serveStatic({ root: './' }));

// App Routes
app.get('/', (c) => c.text('Hello, World!'));
app.get('/health', (c) => c.json({ status: 'ok' }));
app.get('/test-error', () => {
    throw new Error('This is a test error');
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
