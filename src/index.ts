import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import env from '@/config/parsedEnv';
import consola from '@/lib/consola';

const app = new Hono();

app.get('/', (c) => c.text('Hello, World!'));
app.get('/health', (c) => c.json({ status: 'ok' }));

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
    consola.success(`Server is running at http://localhost:${info.port}`);
});

consola.info('Typescript Backend Starter!');
