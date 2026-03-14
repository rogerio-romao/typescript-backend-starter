import { zValidator } from '@hono/zod-validator';

import testValidatorSchema from '@/schemas/test-validator.schema';

const testValidatorValidator = zValidator(
    'json',
    testValidatorSchema,
    (result, c) => {
        if (result.success) {
            return;
        }

        return c.json(
            {
                errors: result.error.flatten().fieldErrors,
                message: 'Invalid request body',
            },
            400
        );
    }
);

export default testValidatorValidator;
