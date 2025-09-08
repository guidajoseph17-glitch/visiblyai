import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VisiblyAI – AI SEO',
  description: 'VisiblyAI: Be seen in AI search.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <header className="border-b bg-white">
          <div className="container py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">VisiblyAI</h1>
            <nav className="text-sm flex gap-4 text-gray-600">
              <a href="/" className="hover:text-black">Dashboard</a>
              <a href="/content" className="hover:text-black">Content</a>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
      </body>
    </html>
  );
}
