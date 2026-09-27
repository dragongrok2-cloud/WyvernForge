import { RecommendedPlayers } from '@/features/social/RecommendedPlayers';
import { RecentlyPlayedTogether } from '@/features/social/RecentlyPlayedTogether';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-forge-border bg-forge-card/80 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐉</span>
            <span className="text-lg font-bold tracking-tight text-white">
              Wyvern<span className="text-wyvern-400">Forge</span>
            </span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
            <a href="#" className="hover:text-white transition">Магазин</a>
            <a href="#" className="hover:text-white transition">Библиотека</a>
            <a href="#" className="text-white font-medium">Сообщество</a>
            <a href="#" className="hover:text-white transition">Друзья</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="rounded-lg bg-wyvern-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-wyvern-500 transition">
              Войти
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Сообщество</h1>
          <p className="text-zinc-400">
            Находи друзей, собирай команды и играй вместе
          </p>
        </div>

        {/* Рекомендуемые игроки */}
        <RecommendedPlayers />

        {/* Играли вместе недавно */}
        <RecentlyPlayedTogether />

        {/* Placeholder for future feed */}
        <section className="rounded-xl border border-forge-border bg-forge-card p-8 text-center">
          <p className="text-zinc-500">Лента постов и сторис появится совсем скоро...</p>
        </section>
      </main>
    </div>
  );
}
