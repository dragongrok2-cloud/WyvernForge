import type { Metadata } from 'next';

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
      <body>{children}</body>
    </html>
  );
}
