import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * In this file we manage environment variables using [t3-env](https://env.t3.gg/docs/introduction).
 * This is basically the same as just importing them like `process.env.VARIABLE` but:
 * - It provides a strongly typed `ENV` object so typos will result in TypeScript errors
 * - If a required environment variable is missing, it will throw an error at build time instead of runtime
 * - Plus other useful features like Zod validation and transformations, defaults, server vs client checks....
 **/
export const ENV = createEnv({
  /*
   * Server-side Environment variables, not available on the client.
   * Will throw error if you access these variables on the client.
   *
   * Some default values are defined here to provide users with a "git-clone-and-it-just-works" experience when trying the demo,
   * with other protections in place to prevent abuse. This only makes sense in an education demo project like this one.
   * DO NOT expose your server-side secrets in your source code!
   */
  server: {
    CUSTOM_PROXY_SECRET: z.string(),
    CUSTOM_PROXY_SECRET_STAGING: z.string(),
    CUSTOM_PROXY_SECRET_DEV: z.string(),
  },
  /*
   * Environment variables available on the client (and server).
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {},
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    CUSTOM_PROXY_SECRET: process.env.CUSTOM_PROXY_SECRET,
    CUSTOM_PROXY_SECRET_STAGING: process.env.CUSTOM_PROXY_SECRET_STAGING,
    CUSTOM_PROXY_SECRET_DEV: process.env.CUSTOM_PROXY_SECRET_DEV,
  },
  // Comprehensive server check
  // https://github.com/t3-oss/t3-env/issues/154
  isServer: Boolean(
    typeof window === 'undefined' ||
      'Deno' in window ||
      process.env['NODE_ENV'] === 'test' ||
      process.env['JEST_WORKER_ID'] ||
      process.env['VITEST_WORKER_ID'],
  ),
});
