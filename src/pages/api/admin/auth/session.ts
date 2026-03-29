import type { APIRoute } from 'astro';
import { getSessionUser } from '@/lib/server/auth';
import { siteConfig } from '@/config/site';

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  if (!siteConfig.features.enableAdmin) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  const user = await getSessionUser(cookies);

  if (!user) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({
      authenticated: true,
      user: { id: user.id, email: user.email },
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  );
};
