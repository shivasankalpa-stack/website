/**
 * Contact form delivery — POST /api/contact
 *
 * Receives the contact form payload, validates it server-side, drops obvious
 * spam via a hidden honeypot, applies a best-effort per-IP rate limit, and
 * delivers a clean email to `CONTACT_TO` (info@shivasankalpa.org) over SMTP.
 *
 * Mail relay: Hostinger SMTP (the trust's mailbox provider). Credentials are
 * read from environment variables — see `.env.example` for the contract and
 * `PLACEHOLDERS.md` for where to set them in the Vercel dashboard.
 *
 * Runtime: Node.js (required for `nodemailer`'s `net` socket connection).
 */

import { NextResponse, type NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  /** Honeypot — must be empty for a legitimate submission. */
  company?: unknown;
}

interface ValidatedInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const MAX_LENGTHS = {
  name: 120,
  email: 200,
  subject: 200,
  message: 5000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asTrimmedString(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > max) return null;
  return trimmed;
}

function validate(payload: ContactPayload): ValidatedInput | null {
  const name = asTrimmedString(payload.name, MAX_LENGTHS.name);
  const email = asTrimmedString(payload.email, MAX_LENGTHS.email);
  const subject = asTrimmedString(payload.subject, MAX_LENGTHS.subject);
  const message = asTrimmedString(payload.message, MAX_LENGTHS.message);
  if (!name || !email || !subject || !message) return null;
  if (!EMAIL_RE.test(email)) return null;
  return { name, email, subject, message };
}

/**
 * Strip CR/LF so user-provided strings cannot inject extra email headers
 * (header injection mitigation for fields that flow into Subject / Reply-To).
 */
function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

/**
 * In-memory rate limit: 3 sends per 10 minutes per IP.
 *
 * Best-effort only — serverless instances are recycled, so this won't survive
 * cold starts or scale-out. It's a cheap first line of defence; serious abuse
 * needs an upstream WAF (Cloudflare rate-limit rules are a good follow-up).
 */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 3;
const rateBuckets = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;
  const recent = (rateBuckets.get(ip) ?? []).filter((t) => t > cutoff);
  if (recent.length >= RATE_LIMIT) {
    rateBuckets.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateBuckets.set(ip, recent);
  return false;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0]!.trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmail(input: ValidatedInput, ip: string) {
  const subjectPrefix = process.env.CONTACT_SUBJECT_PREFIX ?? '[Website]';
  const subject = `${subjectPrefix} ${sanitizeHeader(input.subject)}`;

  const text = [
    `New message from the Shivasankalpa website contact form.`,
    ``,
    `Name:    ${input.name}`,
    `Email:   ${input.email}`,
    `Subject: ${input.subject}`,
    `IP:      ${ip}`,
    ``,
    `Message:`,
    input.message,
  ].join('\n');

  const html = `<!doctype html>
<html><body style="font-family: -apple-system, system-ui, sans-serif; color:#2a2a2a; line-height:1.55;">
  <h2 style="margin:0 0 12px;color:#2D2A6E;">New website contact</h2>
  <table style="border-collapse:collapse;font-size:14px;">
    <tr><td style="padding:4px 12px 4px 0;color:#616161;">Name</td><td><strong>${escapeHtml(input.name)}</strong></td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#616161;">Email</td><td><a href="mailto:${escapeHtml(input.email)}">${escapeHtml(input.email)}</a></td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#616161;">Subject</td><td>${escapeHtml(input.subject)}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#616161;">IP</td><td style="color:#9e9e9e;">${escapeHtml(ip)}</td></tr>
  </table>
  <hr style="margin:18px 0;border:none;border-top:1px solid #e0e0e0;">
  <pre style="white-space:pre-wrap;font-family:inherit;font-size:14px;margin:0;">${escapeHtml(input.message)}</pre>
</body></html>`;

  return { subject, text, html };
}

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST ?? 'smtp.hostinger.com';
  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === 'true'
    : port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error('SMTP credentials are not configured (SMTP_USER / SMTP_PASS)');
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
  return cachedTransporter;
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);

  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  // Honeypot: bots typically fill every field. A non-empty `company` value
  // is treated as spam — we return 200 so the bot thinks it succeeded.
  if (typeof body.company === 'string' && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const input = validate(body);
  if (!input) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const fromAddress = process.env.CONTACT_FROM ?? process.env.SMTP_USER!;
  const fromName = process.env.CONTACT_FROM_NAME ?? 'Shivasankalpa Website';
  const toAddress = process.env.CONTACT_TO ?? process.env.SMTP_USER!;

  const { subject, text, html } = buildEmail(input, ip);

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: { name: fromName, address: fromAddress },
      to: toAddress,
      replyTo: { name: input.name, address: input.email },
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error('[contact] SMTP send failed', err);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
