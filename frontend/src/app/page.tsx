import { Header } from '@/components/Header';
import { RecommendedPlayers } from '@/features/social/RecommendedPlayers';
import { RecentlyPlayedTogether } from '@/features/social/RecentlyPlayedTogether';
import { Feed } from '@/features/social/Feed';

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

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left: Feed */}
          <div className="lg:col-span-2">
            <Feed />
          </div>

          {/* Right: Social sidebars */}
          <div className="space-y-8">
            <RecommendedPlayers />
            <RecentlyPlayedTogether />
          </div>
        </div>
      </main>
    </div>
  );
}
