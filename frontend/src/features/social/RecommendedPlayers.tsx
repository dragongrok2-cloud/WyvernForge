'use client';

import { PlayerCard } from '@/components/PlayerCard';

const mockRecommended = [
  {
    id: '1',
    username: 'nightwyvern',
    displayName: 'Night Wyvern',
    avatarUrl: null,
    status: 'ONLINE',
    reason: 'Общие игры: 8 · Друзья друзей',
    score: 0.92,
  },
  {
    id: '2',
    username: 'emberblade',
    displayName: 'Ember Blade',
    avatarUrl: null,
    status: 'IN_GAME',
    reason: 'Играли вместе 4 раза',
    score: 0.87,
  },
  {
    id: '3',
    username: 'frostquill',
    displayName: 'Frostquill',
    avatarUrl: null,
    status: 'ONLINE',
    reason: 'Похожие вкусы в RPG',
    score: 0.81,
  },
  {
    id: '4',
    username: 'shadowpine',
    displayName: 'Shadowpine',
    avatarUrl: null,
    status: 'AWAY',
    reason: 'Часто в одной игре',
    score: 0.76,
  },
  {
    id: '5',
    username: 'aurorafang',
    displayName: 'Aurora Fang',
    avatarUrl: null,
    status: 'ONLINE',
    reason: 'Рекомендован друзьями',
    score: 0.74,
  },
  {
    id: '6',
    username: 'ironscale',
    displayName: 'Iron Scale',
    avatarUrl: null,
    status: 'OFFLINE',
    reason: 'Общие достижения',
    score: 0.69,
  },
];

interface Props {
  currentUserId?: string;
}

export function RecommendedPlayers({ currentUserId }: Props) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Рекомендуемые игроки</h2>
        <button className="text-sm text-wyvern-400 hover:text-wyvern-300 transition">
          Смотреть всех →
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
        {mockRecommended.map((player) => (
          <PlayerCard
            key={player.id}
            {...player}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </section>
  );
}
