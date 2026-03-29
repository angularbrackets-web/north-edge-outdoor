import type { APIRoute } from 'astro';
import { clearAuthCookies } from '@/lib/server/auth';
import { siteConfig } from '@/config/site';

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  if (!siteConfig.features.enableAdmin) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  clearAuthCookies(cookies);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
