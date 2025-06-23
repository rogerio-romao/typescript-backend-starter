// packages
import { consola } from 'consola';

// config
import env from './config/env';

export default function sum(a: number, b: number): number {
    return a + b;
}

consola.info('Typescript Backend Starter!');
consola.info(`Environment: ${env.NODE_ENV}`);
consola.info(`Port: ${env.PORT}`);
