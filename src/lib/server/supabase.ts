import { createClient } from '@supabase/supabase-js';
import { siteConfig } from '@/config/site';

/**
 * Public Supabase client (uses anon key, respects RLS).
 * Safe for use in public-facing API routes.
 */
export function getSupabaseClient() {
  if (!siteConfig.features.enableSupabase) {
    throw new Error('Supabase is disabled — set features.enableSupabase to true in site config');
  }
  return createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  );
}

/**
 * Admin Supabase client (uses service role key, bypasses RLS).
 * Only use in authenticated admin API routes.
 */
export function getSupabaseAdmin() {
  if (!siteConfig.features.enableSupabase) {
    throw new Error('Supabase is disabled — set features.enableSupabase to true in site config');
  }
  return createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
