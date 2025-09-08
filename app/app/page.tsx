'use client';
import { useState } from 'react';

export default function Page() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Share of Answer','Mentions (This Week)','New Opportunities'].map((l)=>(
          <div key={l} className="card"><div className="text-2xl font-semibold">—</div><div className="text-gray-500">{l}</div></div>
        ))}
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold mb-2">Welcome to VisiblyAI</h2>
        <p className="text-sm text-gray-600">See where your business appears in AI-generated answers, find gaps, and generate targeted content to win those prompts.</p>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold mb-4">Quick Check</h2>
        <QuickCheck />
      </section>
    </div>
  );
}

function QuickCheck() {
  const [prompt, setPrompt] = useState('Best CRM for startups');
  const [brand, setBrand] = useState('YourBrand');
  const [answer, setAnswer] = useState<string>('');
  const [citations, setCitations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const run = async () => {
    setLoading(true); setError(''); setAnswer(''); setCitations([]);
    try {
      const res = await fetch('/api/check', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, brand })
      });
      const data = await res.json();
      setAnswer(data.answer || '');
      setCitations(data.citations || []);
    } catch (e:any) { setError(e?.message || 'Something went wrong.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <input className="border rounded-xl px-3 py-2" value={prompt} onChange={e=>setPrompt(e.target.value)} />
        <input className="border rounded-xl px-3 py-2" value={brand} onChange={e=>setBrand(e.target.value)} placeholder="Brand to detect"/>
      </div>
      <button onClick={run} disabled={loading} className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90">{loading?'Checking…':'Run visibility check'}</button>
      {error && <div className="text-red-600">{error}</div>}
      {answer && (<div className="mt-3 border rounded-2xl p-4 bg-white">
        <div className="font-semibold mb-2">Simulated Answer</div>
        <p className="whitespace-pre-wrap text-sm">{answer}</p>
        {citations.length>0 && (<div className="mt-3 text-sm"><div className="font-medium">Citations</div>
          <ul className="list-disc ml-6">{citations.map((c,i)=>(<li key={i}><a className="text-blue-600 underline" href={c} target="_blank">{c}</a></li>))}</ul>
        </div>)}
      </div>)}
    </div>
  );
}
