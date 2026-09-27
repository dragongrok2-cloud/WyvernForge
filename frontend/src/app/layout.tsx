import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WyvernForge',
  description: 'Аналог Steam с мощной социальной сетью для геймеров',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-forge-dark text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
