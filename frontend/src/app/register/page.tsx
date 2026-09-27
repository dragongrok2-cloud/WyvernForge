'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(email, username, password, displayName || undefined);
      router.push('/friends');
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-forge-border bg-forge-card p-8 shadow-xl">
        <div className="mb-8 text-center">
          <span className="text-4xl">🐉</span>
          <h1 className="mt-2 text-2xl font-bold text-white">Создать аккаунт</h1>
          <p className="mt-1 text-sm text-zinc-400">Присоединяйся к WyvernForge</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-zinc-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-forge-border bg-forge-dark px-4 py-2.5 text-white placeholder-zinc-600 focus:border-wyvern-500 focus:outline-none focus:ring-1 focus:ring-wyvern-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-zinc-400">Никнейм</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              className="w-full rounded-lg border border-forge-border bg-forge-dark px-4 py-2.5 text-white placeholder-zinc-600 focus:border-wyvern-500 focus:outline-none focus:ring-1 focus:ring-wyvern-500"
              placeholder="nightwyvern"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-zinc-400">Отображаемое имя (необязательно)</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-lg border border-forge-border bg-forge-dark px-4 py-2.5 text-white placeholder-zinc-600 focus:border-wyvern-500 focus:outline-none focus:ring-1 focus:ring-wyvern-500"
              placeholder="Night Wyvern"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-zinc-400">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-lg border border-forge-border bg-forge-dark px-4 py-2.5 text-white placeholder-zinc-600 focus:border-wyvern-500 focus:outline-none focus:ring-1 focus:ring-wyvern-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-wyvern-600 py-2.5 font-medium text-white transition hover:bg-wyvern-500 disabled:opacity-50"
          >
            {loading ? 'Создаём...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Уже есть аккаунт?{' '}
          <Link href="/login" className="text-wyvern-400 hover:text-wyvern-300">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
