import { describe, expect, test } from 'vitest';

import api from '@/routes/api';
import arrangeValidatorTests from '@/tests/utils/arrange-validator-tests';

describe('API Routes', () => {
    describe('main API routes', () => {
        test('GET /', async () => {
            const response = await api.request('/');
            const json = await response.json();

            expect(response.status).toBe(200);
            expect(json).toEqual({ message: 'Hello, World!' });
        });
    });

    describe('validator test API routes', () => {
        test('POST /testValidator valid body', async () => {
            const { json, response } = await arrangeValidatorTests(
                25,
                'John Doe'
            );

            expect(response.status).toBe(201);
            expect(json).toEqual({
                age: 25,
                message: 'Hello, John Doe!',
            });
        });

        test('POST /testValidator missing optional', async () => {
            // Test with only the name provided, age is optional
            const { json, response } = await arrangeValidatorTests(
                undefined,
                'John Doe'
            );

            expect(response.status).toBe(201);
            expect(json).toEqual({
                message: 'Hello, John Doe!',
            });
        });

        test('POST /testValidator invalid params', async () => {
            // Test with invalid age and name
            const { json, response } = await arrangeValidatorTests(-5, 'A');

            expect(response.status).toBe(400);
            expect(json).toEqual({
                errors: {
                    age: ['Number must be greater than or equal to 0'],
                    name: ['String must contain at least 2 character(s)'],
                },
                message: 'Invalid request body',
            });
        });

        test('POST /testValidator missing params', async () => {
            // Test with missing params
            const { json, response } = await arrangeValidatorTests();

            expect(response.status).toBe(400);
            expect(json).toEqual({
                errors: {
                    name: ['Required'],
                },
                message: 'Invalid request body',
            });
        });
    });
});
