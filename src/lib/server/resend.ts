import { Resend } from 'resend';

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(import.meta.env.RESEND_API_KEY);
  }
  return _resend;
}
