import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { title, content } = await req.json();
  const base = process.env.WORDPRESS_BASE_URL;
  const user = process.env.WORDPRESS_USERNAME;
  const pass = process.env.WORDPRESS_APP_PASSWORD;
  if (!base || !user || !pass) {
    return NextResponse.json({ ok: false, error: 'Configure WordPress env vars in Vercel.' }, { status: 400 });
  }
  const auth = Buffer.from(`${user}:${pass}`).toString('base64');
  const res = await fetch(`${base}/wp-json/wp/v2/posts`, {
    method: 'POST',
    headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, status: 'publish' })
  });
  const data = await res.json();
  if (!res.ok) return NextResponse.json({ ok: false, error: data?.message || 'Failed to publish' }, { status: 500 });
  return NextResponse.json({ ok: true, url: data?.link, id: data?.id });
}
