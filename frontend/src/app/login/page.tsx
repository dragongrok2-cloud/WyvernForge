'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(emailOrUsername, password);
      router.push('/friends');
    } catch (err: any) {
      setError(err.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-forge-border bg-forge-card p-8 shadow-xl">
        <div className="mb-8 text-center">
          <span className="text-4xl">🐉</span>
          <h1 className="mt-2 text-2xl font-bold text-white">Вход в WyvernForge</h1>
          <p className="mt-1 text-sm text-zinc-400">Добро пожаловать обратно</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-zinc-400">Email или никнейм</label>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
              className="w-full rounded-lg border border-forge-border bg-forge-dark px-4 py-2.5 text-white placeholder-zinc-600 focus:border-wyvern-500 focus:outline-none focus:ring-1 focus:ring-wyvern-500"
              placeholder="nightwyvern"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-zinc-400">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            {loading ? 'Входим...' : 'Войти'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Нет аккаунта?{' '}
          <Link href="/register" className="text-wyvern-400 hover:text-wyvern-300">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}
