import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Central, validated access to environment variables.
 * Import `env` from here instead of reading `process.env` directly.
 */
export const env = createEnv({
  server: {
    SUPABASE_SECRET_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_MAPTILER_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_MAPTILER_KEY: process.env.NEXT_PUBLIC_MAPTILER_KEY,
  },
  // When SKIP_ENV_VALIDATION is set (e.g. in CI), don't require real env values.
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
