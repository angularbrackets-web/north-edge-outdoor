import { siteConfig } from '@/config/site';

interface SubmissionData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message?: string;
}

const brandColor = siteConfig.colors.light.brand;
const businessName = siteConfig.business.name;
const phone = siteConfig.business.phone;
const phoneHref = `tel:+1${phone.replace(/-/g, '')}`;
const location = `${siteConfig.business.address.city} &amp; Area`;

export function customerConfirmationEmail(data: SubmissionData) {
  return {
    subject: `We received your request — ${businessName}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f5f5f5;">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px;">
    <div style="background:#ffffff;border-radius:8px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
      <div style="text-align:center;margin-bottom:32px;">
        <h1 style="color:${brandColor};font-size:22px;margin:0;">${escapeHtml(businessName)}</h1>
      </div>
      <p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 16px;">
        Hi ${escapeHtml(data.name)},
      </p>
      <p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 16px;">
        Thank you for reaching out! We've received your <strong>${escapeHtml(data.service)}</strong> inquiry
        and will get back to you within <strong>24 hours</strong> with a personalized quote.
      </p>
      <div style="background:#f8faf9;border-left:3px solid #3ECF8E;padding:16px 20px;margin:24px 0;border-radius:0 4px 4px 0;">
        <p style="color:#555;font-size:14px;line-height:1.5;margin:0;">
          <strong>What you submitted:</strong><br>
          Service: ${escapeHtml(data.service)}<br>
          ${data.message ? `Message: ${escapeHtml(data.message)}` : ''}
        </p>
      </div>
      <p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 8px;">
        In the meantime, feel free to call us:
      </p>
      <p style="text-align:center;margin:16px 0;">
        <a href="${phoneHref}" style="color:${brandColor};font-size:18px;font-weight:600;text-decoration:none;">
          ${escapeHtml(phone)}
        </a>
      </p>
      <hr style="border:none;border-top:1px solid #eee;margin:32px 0;">
      <p style="color:#999;font-size:12px;text-align:center;margin:0;">
        ${escapeHtml(businessName)} &middot; ${location}
      </p>
    </div>
  </div>
</body>
</html>`,
  };
}

export function adminNotificationEmail(data: SubmissionData, siteUrl: string) {
  return {
    subject: `New estimate request from ${data.name} — ${data.service}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f5f5f5;">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px;">
    <div style="background:#ffffff;border-radius:8px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
      <h2 style="color:${brandColor};font-size:20px;margin:0 0 24px;">New Estimate Request</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 12px;font-size:14px;color:#666;font-weight:600;width:100px;vertical-align:top;">Name</td>
          <td style="padding:8px 12px;font-size:14px;color:#333;">${escapeHtml(data.name)}</td>
        </tr>
        <tr style="background:#f8f8f8;">
          <td style="padding:8px 12px;font-size:14px;color:#666;font-weight:600;vertical-align:top;">Email</td>
          <td style="padding:8px 12px;font-size:14px;color:#333;">
            <a href="mailto:${escapeHtml(data.email)}" style="color:${brandColor};">${escapeHtml(data.email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-size:14px;color:#666;font-weight:600;vertical-align:top;">Phone</td>
          <td style="padding:8px 12px;font-size:14px;color:#333;">
            ${data.phone ? `<a href="tel:${escapeHtml(data.phone)}" style="color:${brandColor};">${escapeHtml(data.phone)}</a>` : '—'}
          </td>
        </tr>
        <tr style="background:#f8f8f8;">
          <td style="padding:8px 12px;font-size:14px;color:#666;font-weight:600;vertical-align:top;">Service</td>
          <td style="padding:8px 12px;font-size:14px;color:#333;">${escapeHtml(data.service)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-size:14px;color:#666;font-weight:600;vertical-align:top;">Message</td>
          <td style="padding:8px 12px;font-size:14px;color:#333;">${data.message ? escapeHtml(data.message) : '—'}</td>
        </tr>
      </table>
      <div style="margin-top:24px;text-align:center;">
        <a href="${siteUrl}/admin/submissions"
           style="display:inline-block;padding:12px 24px;background:${brandColor};color:#fff;text-decoration:none;border-radius:4px;font-size:14px;font-weight:500;">
          View in Dashboard
        </a>
      </div>
    </div>
  </div>
</body>
</html>`,
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
