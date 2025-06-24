import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';

import env from '@/config/parsedEnv';
import consola from '@/lib/consola';

export const app = new Hono();

app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }));
app.use('/static/*', serveStatic({ root: './' }));

app.get('/', (c) => c.text('Hello, World!'));
app.get('/health', (c) => c.json({ status: 'ok' }));
app.get('/testError', () => {
    throw new Error('This is a test error');
});

app.notFound((c) => c.text('This route does not exist', 404));

app.onError((err, c) => {
    consola.error(err);
    return c.text('Internal Server Error', 500);
});

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
    consola.success(`Server is running at http://localhost:${info.port}`);
});

consola.info('Typescript Backend Starter!');
