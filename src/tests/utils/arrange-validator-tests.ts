import apiTestRoutes from '@/routes/api-test-routes';

export default async function arrangeValidatorTests(
    age: number | undefined = undefined,
    name: string | undefined = undefined
): Promise<{
    json: unknown;
    response: Response;
}> {
    const response = await apiTestRoutes.request('/test-validator', {
        body: JSON.stringify({
            age,
            name,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });
    const json = await response.json();
    return { json, response };
}
