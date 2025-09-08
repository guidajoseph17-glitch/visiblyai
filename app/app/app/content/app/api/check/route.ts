import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { prompt, brand } = await req.json();
  const answer = `Demo answer for: ${prompt}. Add PERPLEXITY_API_KEY in Vercel to fetch real results.`;
  const citations = ["https://example.com/source-a", "https://example.com/source-b"];
  const present = (answer || '').toLowerCase().includes((brand || '').toLowerCase());
  return NextResponse.json({ answer, citations, present });
}
