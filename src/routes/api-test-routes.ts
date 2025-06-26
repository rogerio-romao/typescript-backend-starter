import { Hono } from 'hono';

import testValidatorValidator from '@/validators/test-validator-validator';

const apiTestRoutes = new Hono();

apiTestRoutes.post('/test-validator', testValidatorValidator());

export default apiTestRoutes;
