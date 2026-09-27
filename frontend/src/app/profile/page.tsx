'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { getMe, getToken, api } from '@/lib/api';

const statusLabels: Record<string, string> = {
  ONLINE: 'В сети',
  OFFLINE: 'Не в сети',
  IN_GAME: 'В игре',
  AWAY: 'Отошёл',
  DO_NOT_DISTURB: 'Не беспокоить',
};

const statusColors: Record<string, string> = {
  ONLINE: 'bg-emerald-500',
  IN_GAME: 'bg-sky-500',
  AWAY: 'bg-amber-500',
  DO_NOT_DISTURB: 'bg-rose-500',
  OFFLINE: 'bg-zinc-600',
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    displayName: '',
    bio: '',
    avatarUrl: '',
    bannerUrl: '',
    status: 'ONLINE',
  });

  useEffect(() => {
    if (!getToken()) {
      router.push('/login');
      return;
    }

    getMe()
      .then((u) => {
        setUser(u);
        setForm({
          displayName: u.displayName || '',
          bio: u.bio || '',
          avatarUrl: u.avatarUrl || '',
          bannerUrl: u.bannerUrl || '',
          status: u.status || 'ONLINE',
        });
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const updated = await api<any>('/users/me', {
        method: 'PATCH',
        body: JSON.stringify({
          displayName: form.displayName || undefined,
          bio: form.bio || undefined,
          avatarUrl: form.avatarUrl || undefined,
          bannerUrl: form.bannerUrl || undefined,
          status: form.status,
        }),
      });
      setUser(updated);
      setEditing(false);
    } catch (err: any) {
      setError(err.message || 'Не удалось сохранить');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-32 text-zinc-500">
          Загрузка профиля...
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Banner */}
        <div className="relative h-48 overflow-hidden rounded-2xl bg-gradient-to-br from-wyvern-900 via-forge-card to-forge-dark">
          {(editing ? form.bannerUrl : user.bannerUrl) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={editing ? form.bannerUrl : user.bannerUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* Avatar + info */}
        <div className="relative -mt-16 flex flex-col items-start gap-4 px-6 sm:flex-row sm:items-end">
          <div className="relative">
            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-forge-dark bg-zinc-800">
              {(editing ? form.avatarUrl : user.avatarUrl) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={editing ? form.avatarUrl : user.avatarUrl}
                  alt={user.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-zinc-500">
                  {(user.displayName || user.username)[0]?.toUpperCase()}
                </div>
              )}
            </div>
            <span
              className={`absolute bottom-2 right-2 h-5 w-5 rounded-full border-2 border-forge-dark ${
                statusColors[user.status] || statusColors.OFFLINE
              }`}
            />
          </div>

          <div className="flex-1 pb-2">
            <h1 className="text-2xl font-bold text-white">
              {user.displayName || user.username}
            </h1>
            <p className="text-zinc-400">@{user.username}</p>
            <p className="mt-1 text-sm text-zinc-500">
              {statusLabels[user.status] || user.status}
            </p>
          </div>

          <button
            onClick={() => setEditing(!editing)}
            className="rounded-lg border border-forge-border px-4 py-2 text-sm text-zinc-300 hover:bg-forge-border transition"
          >
            {editing ? 'Отмена' : 'Редактировать профиль'}
          </button>
        </div>

        {/* Edit form */}
        {editing && (
          <form onSubmit={handleSave} className="mt-8 rounded-xl border border-forge-border bg-forge-card p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white">Редактирование профиля</h2>

            <div>
              <label className="mb-1.5 block text-sm text-zinc-400">Отображаемое имя</label>
              <input
                type="text"
                value={form.displayName}
                onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                className="w-full rounded-lg border border-forge-border bg-forge-dark px-4 py-2.5 text-white focus:border-wyvern-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-zinc-400">О себе</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-forge-border bg-forge-dark px-4 py-2.5 text-white focus:border-wyvern-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-zinc-400">URL аватара</label>
              <input
                type="url"
                value={form.avatarUrl}
                onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
                placeholder="https://..."
                className="w-full rounded-lg border border-forge-border bg-forge-dark px-4 py-2.5 text-white focus:border-wyvern-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-zinc-400">URL баннера</label>
              <input
                type="url"
                value={form.bannerUrl}
                onChange={(e) => setForm({ ...form, bannerUrl: e.target.value })}
                placeholder="https://..."
                className="w-full rounded-lg border border-forge-border bg-forge-dark px-4 py-2.5 text-white focus:border-wyvern-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-zinc-400">Статус</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-lg border border-forge-border bg-forge-dark px-4 py-2.5 text-white focus:border-wyvern-500 focus:outline-none"
              >
                <option value="ONLINE">В сети</option>
                <option value="IN_GAME">В игре</option>
                <option value="AWAY">Отошёл</option>
                <option value="DO_NOT_DISTURB">Не беспокоить</option>
                <option value="OFFLINE">Не в сети</option>
              </select>
            </div>

            {error && <p className="text-sm text-rose-400">{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-wyvern-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-wyvern-500 disabled:opacity-50 transition"
            >
              {saving ? 'Сохраняем...' : 'Сохранить'}
            </button>
          </form>
        )}

        {/* Bio */}
        {!editing && (
          <div className="mt-8 rounded-xl border border-forge-border bg-forge-card p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              О себе
            </h2>
            <p className="text-zinc-300">
              {user.bio || 'Пока ничего не написано...'}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-forge-border bg-forge-card p-4 text-center">
            <p className="text-2xl font-bold text-white">—</p>
            <p className="text-xs text-zinc-500">Друзей</p>
          </div>
          <div className="rounded-xl border border-forge-border bg-forge-card p-4 text-center">
            <p className="text-2xl font-bold text-white">—</p>
            <p className="text-xs text-zinc-500">Игр в библиотеке</p>
          </div>
          <div className="rounded-xl border border-forge-border bg-forge-card p-4 text-center">
            <p className="text-2xl font-bold text-white">—</p>
            <p className="text-xs text-zinc-500">Часов в играх</p>
          </div>
        </div>
      </main>
    </div>
  );
}
