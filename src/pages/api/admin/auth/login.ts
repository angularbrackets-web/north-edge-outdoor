import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { setAuthCookies } from '@/lib/server/auth';
import { siteConfig } from '@/config/site';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!siteConfig.features.enableAdmin) return json({ error: 'Not found' }, 404);
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return json({ error: 'Email and password are required' }, 400);
  }

  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  );

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    return json({ error: 'Invalid credentials' }, 401);
  }

  setAuthCookies(cookies, data.session.access_token, data.session.refresh_token);

  return json({ success: true });
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
