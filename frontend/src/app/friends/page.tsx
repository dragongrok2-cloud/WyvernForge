'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { PlayerCard } from '@/components/PlayerCard';
import { getMe, getToken, api } from '@/lib/api';
import { RecommendedPlayers } from '@/features/social/RecommendedPlayers';
import { RecentlyPlayedTogether } from '@/features/social/RecentlyPlayedTogether';

export default function FriendsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [friends, setFriends] = useState<any[]>([]);
  const [pending, setPending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'friends' | 'pending' | 'recommended'>('friends');

  useEffect(() => {
    if (!getToken()) {
      router.push('/login');
      return;
    }

    async function load() {
      try {
        const me = await getMe();
        setUser(me);

        // Загружаем друзей и заявки
        const [friendsData, pendingData] = await Promise.all([
          api<any[]>(`/friends/${me.id}`).catch(() => []),
          api<any[]>(`/friends/${me.id}/pending`).catch(() => []),
        ]);

        setFriends(friendsData);
        setPending(pendingData);
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-32 text-zinc-500">
          Загрузка...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Друзья</h1>
          <p className="text-zinc-400">
            Управляй друзьями и находи новых игроков
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-forge-border">
          {[
            { id: 'friends' as const, label: `Друзья (${friends.length})` },
            { id: 'pending' as const, label: `Заявки (${pending.length})` },
            { id: 'recommended' as const, label: 'Рекомендации' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 text-sm font-medium transition border-b-2 -mb-px ${
                tab === t.id
                  ? 'border-wyvern-500 text-white'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Friends list */}
        {tab === 'friends' && (
          <div>
            {friends.length === 0 ? (
              <div className="rounded-xl border border-forge-border bg-forge-card p-12 text-center">
                <p className="text-zinc-500 mb-4">У тебя пока нет друзей</p>
                <button
                  onClick={() => setTab('recommended')}
                  className="rounded-lg bg-wyvern-600 px-4 py-2 text-sm text-white hover:bg-wyvern-500 transition"
                >
                  Найти игроков
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {friends.map((friend) => (
                  <PlayerCard
                    key={friend.id}
                    id={friend.id}
                    username={friend.username}
                    displayName={friend.displayName}
                    avatarUrl={friend.avatarUrl}
                    status={friend.status}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pending requests */}
        {tab === 'pending' && (
          <div>
            {pending.length === 0 ? (
              <div className="rounded-xl border border-forge-border bg-forge-card p-12 text-center text-zinc-500">
                Нет входящих заявок
              </div>
            ) : (
              <div className="space-y-3">
                {pending.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between rounded-xl border border-forge-border bg-forge-card p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-full bg-zinc-800 flex items-center justify-center text-lg font-bold text-zinc-500">
                        {(req.requester?.displayName || req.requester?.username)?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {req.requester?.displayName || req.requester?.username}
                        </p>
                        <p className="text-sm text-zinc-500">@{req.requester?.username}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-lg bg-wyvern-600 px-4 py-1.5 text-sm text-white hover:bg-wyvern-500 transition">
                        Принять
                      </button>
                      <button className="rounded-lg border border-forge-border px-4 py-1.5 text-sm text-zinc-400 hover:bg-forge-border transition">
                        Отклонить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Recommended */}
        {tab === 'recommended' && (
          <div className="space-y-10">
            <RecommendedPlayers />
            <RecentlyPlayedTogether />
          </div>
        )}
      </main>
    </div>
  );
}
