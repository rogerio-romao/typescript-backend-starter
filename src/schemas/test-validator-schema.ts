import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

import type { MiddlewareHandler } from 'hono';

export default function testValidatorSchema(): MiddlewareHandler {
    return zValidator(
        'json',
        z.object({
            age: z.number().min(0).optional(),
            name: z.string().min(2).max(100),
        }),
        (result, c) => {
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
        }
    );
}
