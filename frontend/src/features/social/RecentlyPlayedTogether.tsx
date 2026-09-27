'use client';

import { PlayerCard } from '@/components/PlayerCard';

// Временные моковые данные
const mockRecent = [
  {
    id: '10',
    username: 'dragonrider',
    displayName: 'Dragon Rider',
    avatarUrl: null,
    status: 'ONLINE',
    reason: 'Играли вместе 3 раза · Elden Ring',
  },
  {
    id: '11',
    username: 'moonhowl',
    displayName: 'Moonhowl',
    avatarUrl: null,
    status: 'IN_GAME',
    reason: 'Играли вместе в Counter-Strike 2',
  },
  {
    id: '12',
    username: 'stardust',
    displayName: 'Stardust',
    avatarUrl: null,
    status: 'ONLINE',
    reason: 'Играли вместе 2 раза · Baldur\'s Gate 3',
  },
  {
    id: '13',
    username: 'voidwalker',
    displayName: 'Void Walker',
    avatarUrl: null,
    status: 'AWAY',
    reason: 'Играли вместе в Valorant',
  },
  {
    id: '14',
    username: 'crystalwing',
    displayName: 'Crystal Wing',
    avatarUrl: null,
    status: 'OFFLINE',
    reason: 'Играли вместе 5 раз · Deep Rock Galactic',
  },
];

export function RecentlyPlayedTogether() {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Играли вместе недавно</h2>
        <button className="text-sm text-wyvern-400 hover:text-wyvern-300 transition">
          История →
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {mockRecent.map((player) => (
          <PlayerCard key={player.id} {...player} />
        ))}
      </div>
    </section>
  );
}
