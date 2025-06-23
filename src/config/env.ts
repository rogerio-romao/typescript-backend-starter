import { consola } from 'consola';
import { type ZodObject, type ZodRawShape, z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.string(),
    PORT: z.coerce.number().min(1024).max(65_535),
});

function parseEnv<T extends ZodRawShape>(
    EnvSchema: ZodObject<T>,
    buildEnv: Record<string, string | undefined> = process.env
) {
    const result = EnvSchema.safeParse(buildEnv);

    if (!result.success) {
        const message = result.error.issues
            .map((issue) => `${issue.path.join('.')} - ${issue.message}`)
            .join('\n');
        consola.error('Environment variables validation failed:', message);
        const e = new Error('Invalid environment variables');
        e.stack = '';
        throw e;
    }
}

// export type Env = z.infer<typeof envSchema>;

parseEnv(envSchema);

export default envSchema.parse(process.env);

// this file based on a video by CJ on the Syntax YouTube channel: https://www.youtube.com/watch?v=DK93dqmJJYg&t=3914s
