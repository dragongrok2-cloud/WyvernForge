import { Header } from '@/components/Header';
import { RecommendedPlayers } from '@/features/social/RecommendedPlayers';
import { RecentlyPlayedTogether } from '@/features/social/RecentlyPlayedTogether';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Сообщество</h1>
          <p className="text-zinc-400">
            Находи друзей, собирай команды и играй вместе
          </p>
        </div>

        <RecommendedPlayers />
        <RecentlyPlayedTogether />

        <section className="rounded-xl border border-forge-border bg-forge-card p-8 text-center">
          <p className="text-zinc-500">Лента постов и сторис появится совсем скоро...</p>
        </section>
      </main>
    </div>
  );
}
