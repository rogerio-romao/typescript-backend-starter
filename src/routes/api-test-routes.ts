import { Hono } from 'hono';

import testValidatorSchema from '@/schemas/test-validator-schema';

const apiTestRoutes = new Hono();

apiTestRoutes.post('/test-validator', testValidatorSchema());

export default apiTestRoutes;
