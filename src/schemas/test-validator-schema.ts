import { z } from 'zod';

const testValidatorSchema = z.object({
    age: z.number().min(0).optional(),
    name: z.string().min(2).max(100),
});

export default testValidatorSchema;
