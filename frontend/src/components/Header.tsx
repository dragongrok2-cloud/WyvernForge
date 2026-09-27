'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clearToken, getToken } from '@/lib/api';
import { useEffect, useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, [pathname]);

  function handleLogout() {
    clearToken();
    setIsLoggedIn(false);
    router.push('/login');
  }

  const navItems = [
    { href: '/', label: 'Сообщество' },
    { href: '/friends', label: 'Друзья' },
    { href: '/profile', label: 'Профиль' },
  ];

  return (
    <header className="border-b border-forge-border bg-forge-card/80 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🐉</span>
          <span className="text-lg font-bold tracking-tight text-white">
            Wyvern<span className="text-wyvern-400">Forge</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition ${
                pathname === item.href
                  ? 'text-white font-medium'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded-lg border border-forge-border px-4 py-1.5 text-sm text-zinc-300 hover:bg-forge-border transition"
            >
              Выйти
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-zinc-400 hover:text-white transition"
              >
                Войти
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-wyvern-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-wyvern-500 transition"
              >
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
