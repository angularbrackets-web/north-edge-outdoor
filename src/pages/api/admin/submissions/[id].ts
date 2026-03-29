import type { APIRoute } from 'astro';
import { getSessionUser } from '@/lib/server/auth';
import { getSupabaseAdmin } from '@/lib/server/supabase';
import { siteConfig } from '@/config/site';

export const prerender = false;

export const GET: APIRoute = async ({ params, cookies }) => {
  if (!siteConfig.features.enableAdmin) return json({ error: 'Not found' }, 404);
  const user = await getSessionUser(cookies);
  if (!user) return json({ error: 'Unauthorized' }, 401);

  const { id } = params;
  if (!id) return json({ error: 'Missing submission ID' }, 400);

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return json({ error: 'Submission not found' }, 404);
  }

  return json({ submission: data });
};

export const PATCH: APIRoute = async ({ params, request, cookies }) => {
  const user = await getSessionUser(cookies);
  if (!user) return json({ error: 'Unauthorized' }, 401);

  const { id } = params;
  if (!id) return json({ error: 'Missing submission ID' }, 400);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  // Only allow updating status and notes
  const allowedFields = ['status', 'notes'];
  const updates: Record<string, unknown> = {};
  for (const field of allowedFields) {
    if (field in body) {
      updates[field] = body[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    return json({ error: 'No valid fields to update' }, 400);
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('submissions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Update submission error:', error);
    return json({ error: 'Failed to update submission' }, 500);
  }

  return json({ submission: data });
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
