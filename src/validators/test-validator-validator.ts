import { zValidator } from '@hono/zod-validator';

import testValidatorSchema from '@/schemas/test-validator-schema';

import type { MiddlewareHandler } from 'hono';

export default function testValidatorValidator(): MiddlewareHandler {
    return zValidator('json', testValidatorSchema, (result, c) => {
        if (!result.success) {
            return c.json(
                {
                    errors: result.error.flatten().fieldErrors,
                    message: 'Invalid request body',
                },
                400
            );
        }

        const { age, name } = result.data;
        return c.json(
            {
                ...(age != null && { age }),
                message: `Hello, ${name}!`,
            },
            201
        );
    });
}
