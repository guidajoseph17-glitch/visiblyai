'use client';
import { useState } from 'react';

export default function ContentPage() {
  const [topic, setTopic] = useState('Best CRM for startups');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const run = async () => {
    setLoading(true); setResult(null);
    const res = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ topic }) });
    const data = await res.json(); setResult(data); setLoading(false);
  };
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Targeted Content Generator</h2>
        <input className="border rounded-xl px-3 py-2 w-full" value={topic} onChange={e=>setTopic(e.target.value)} />
        <div className="mt-3 flex gap-2"><button onClick={run} disabled={loading} className="px-4 py-2 rounded-xl bg-black text-white">{loading?'Generating…':'Generate'}</button></div>
        {result && (<div className="mt-6 space-y-4">
          <div><div className="font-semibold">Title</div><div>{result.title}</div></div>
          <div><div className="font-semibold">Markdown Article</div><pre className="whitespace-pre-wrap text-sm">{result.articleMd}</pre></div>
          <div><div className="font-semibold">JSON-LD</div><pre className="text-xs bg-gray-50 p-3 rounded-xl border">{JSON.stringify(result.jsonLd, null, 2)}</pre></div>
        </div>)}
      </div>
    </div>
  );
}
