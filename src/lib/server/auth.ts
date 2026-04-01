import { createClient } from '@supabase/supabase-js';
import type { AstroCookies } from 'astro';

const TOKEN_COOKIE = 'sb-access-token';
const REFRESH_COOKIE = 'sb-refresh-token';

const COOKIE_OPTIONS = {
  path: '/',
  httpOnly: true,
  secure: import.meta.env.PROD,
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

function getAuthClient() {
  return createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  );
}

/** Verify the current session from cookies. Returns the user or null. */
export async function getSessionUser(cookies: AstroCookies) {
  const accessToken = cookies.get(TOKEN_COOKIE)?.value;
  const refreshToken = cookies.get(REFRESH_COOKIE)?.value;

  if (!accessToken) return null;

  const supabase = getAuthClient();

  // Set the session from stored tokens
  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken || '',
  });

  if (error || !data.session) {
    // Tokens expired / invalid — clear cookies
    clearAuthCookies(cookies);
    return null;
  }

  // If Supabase refreshed the tokens, update cookies
  if (data.session.access_token !== accessToken) {
    setAuthCookies(cookies, data.session.access_token, data.session.refresh_token);
  }

  return data.session.user;
}

/** Store auth tokens in HTTP-only cookies. */
export function setAuthCookies(cookies: AstroCookies, accessToken: string, refreshToken: string) {
  cookies.set(TOKEN_COOKIE, accessToken, COOKIE_OPTIONS);
  cookies.set(REFRESH_COOKIE, refreshToken, COOKIE_OPTIONS);
}

/** Clear auth cookies on logout. */
export function clearAuthCookies(cookies: AstroCookies) {
  cookies.delete(TOKEN_COOKIE, { path: '/' });
  cookies.delete(REFRESH_COOKIE, { path: '/' });
}

/** Require auth — returns user or redirects to login. For use in Astro page frontmatter. */
export async function requireAuth(cookies: AstroCookies) {
  const user = await getSessionUser(cookies);
  if (!user) return null;
  return user;
}
