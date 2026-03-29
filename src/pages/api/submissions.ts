import type { APIRoute } from 'astro';
import { getSupabaseClient } from '@/lib/server/supabase';
import { getResend } from '@/lib/server/resend';
import { customerConfirmationEmail, adminNotificationEmail } from '@/lib/server/emails';
import { siteConfig } from '@/config/site';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!siteConfig.features.enableSupabase) {
    return json({ error: 'Submissions are not enabled for this site' }, 503);
  }
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const { name, email, phone, service, message, _hp } = body as {
    name?: string;
    email?: string;
    phone?: string;
    service?: string;
    message?: string;
    _hp?: string; // honeypot
  };

  // Honeypot: if filled, silently succeed (bots fill hidden fields)
  if (_hp) {
    return json({ success: true });
  }

  // Validate required fields
  if (!name || !email || !service) {
    return json({ error: 'Name, email, and service are required' }, 400);
  }

  if (!isValidEmail(email)) {
    return json({ error: 'Invalid email address' }, 400);
  }

  // Truncate to prevent abuse
  const sanitized = {
    name: name.slice(0, 200),
    email: email.slice(0, 320),
    phone: phone?.slice(0, 30) || null,
    service: service.slice(0, 100),
    message: message?.slice(0, 2000) || null,
  };

  const supabase = getSupabaseClient();

  // Check for duplicate submission (same email + service within 5 minutes)
  const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
  const { data: existing } = await supabase
    .from('submissions')
    .select('id')
    .eq('email', sanitized.email)
    .eq('service', sanitized.service)
    .gte('created_at', fiveMinAgo)
    .limit(1);

  if (existing && existing.length > 0) {
    return json({ success: true }); // silently succeed to not leak info
  }

  // Insert into database
  const { error: dbError } = await supabase
    .from('submissions')
    .insert(sanitized);

  if (dbError) {
    console.error('Supabase insert error:', dbError);
    return json({ error: 'Failed to save submission' }, 500);
  }

  // Send emails (don't block on failure — the submission is already saved)
  const resend = getResend();
  const siteUrl = import.meta.env.SITE_URL || 'https://northedgeoutdoor.ca';
  const adminEmail = import.meta.env.ADMIN_NOTIFICATION_EMAIL || 'info@northedgeoutdoor.ca';
  const fromAddress = `${siteConfig.business.name} <onboarding@resend.dev>`; // Switch to verified domain email after setup

  try {
    const confirmation = customerConfirmationEmail(sanitized);
    const notification = adminNotificationEmail(sanitized, siteUrl);

    await Promise.allSettled([
      resend.emails.send({
        from: fromAddress,
        to: sanitized.email,
        subject: confirmation.subject,
        html: confirmation.html,
      }),
      resend.emails.send({
        from: fromAddress,
        to: adminEmail,
        subject: notification.subject,
        html: notification.html,
      }),
    ]);
  } catch (emailError) {
    console.error('Email send error:', emailError);
    // Don't fail the request — submission is already saved
  }

  return json({ success: true });
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
