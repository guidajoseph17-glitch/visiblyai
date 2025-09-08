import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { topic } = await req.json();
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    return NextResponse.json({
      title: `Winning the Answer: ${topic}`,
      articleMd: `# ${topic}\n\nThis is a demo article. Add OPENROUTER_API_KEY to generate real content.\n\n## FAQ\n- **Q:** How to show up in AI answers?\n- **A:** Publish high-authority, well-cited content and participate in credible communities.`,
      jsonLd: { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [] }
    });
  }
  // (Optional: real OpenRouter call later)
  return NextResponse.json({ title: `Generated: ${topic}`, articleMd: `# ${topic}`, jsonLd: {} });
}
