import env from '@/config/parsedEnv';
import consola from '@/lib/consola';

export default function sum(a: number, b: number): number {
    return a + b;
}

consola.info('Typescript Backend Starter!');
consola.info(`Environment: ${env.NODE_ENV}`);
consola.info(`Port: ${env.PORT}`);
