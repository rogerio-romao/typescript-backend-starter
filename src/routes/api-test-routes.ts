import { Hono } from 'hono';

import testValidatorValidator from '@/validators/test-validator.validator';

const apiTestRoutes = new Hono();

apiTestRoutes.post('/test-validator', testValidatorValidator, (c) => {
    const { age, name } = c.req.valid('json');
    return c.json(
        {
            ...(age !== undefined && { age }),
            message: `Hello, ${name}!`,
        },
        201
    );
});

export default apiTestRoutes;
