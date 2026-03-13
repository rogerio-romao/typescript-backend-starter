import * as esbuild from 'esbuild';

await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    packages: 'external',
    outfile: 'dist/index.js',
    format: 'esm',
    target: 'es2022',
    minify: true,
    sourcemap: true,
});
