import type { APIRoute } from 'astro';
import { getSessionUser } from '@/lib/server/auth';
import { getSupabaseAdmin } from '@/lib/server/supabase';
import { siteConfig } from '@/config/site';

export const prerender = false;

export const GET: APIRoute = async ({ cookies, url }) => {
  if (!siteConfig.features.enableAdmin) return json({ error: 'Not found' }, 404);
  const user = await getSessionUser(cookies);
  if (!user) return json({ error: 'Unauthorized' }, 401);

  const supabase = getSupabaseAdmin();

  // Optional status filter
  const status = url.searchParams.get('status');

  let query = supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Fetch submissions error:', error);
    return json({ error: 'Failed to fetch submissions' }, 500);
  }

  return json({ submissions: data });
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
