interface PlayerCardProps {
  id: string;
  username: string;
  displayName?: string | null;
  avatarUrl?: string | null;
  status?: string;
  reason?: string;
  score?: number;
}

const statusColors: Record<string, string> = {
  ONLINE: 'bg-emerald-500',
  IN_GAME: 'bg-sky-500',
  AWAY: 'bg-amber-500',
  DO_NOT_DISTURB: 'bg-rose-500',
  OFFLINE: 'bg-zinc-600',
};

export function PlayerCard({
  username,
  displayName,
  avatarUrl,
  status = 'OFFLINE',
  reason,
}: PlayerCardProps) {
  return (
    <div className="group relative flex flex-col items-center rounded-xl bg-forge-card border border-forge-border p-4 transition hover:border-wyvern-500/50 hover:shadow-lg hover:shadow-wyvern-500/10">
      <div className="relative mb-3">
        <div className="h-16 w-16 overflow-hidden rounded-full bg-zinc-800 ring-2 ring-forge-border group-hover:ring-wyvern-500/40">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt={username} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-zinc-500">
              {username[0]?.toUpperCase()}
            </div>
          )}
        </div>
        <span
          className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-forge-card ${statusColors[status] || statusColors.OFFLINE}`}
          title={status}
        />
      </div>

      <p className="text-sm font-semibold text-white truncate max-w-full">
        {displayName || username}
      </p>
      <p className="text-xs text-zinc-500">@{username}</p>

      {reason && (
        <p className="mt-2 text-center text-[11px] leading-tight text-zinc-400 line-clamp-2">
          {reason}
        </p>
      )}

      <button className="mt-3 w-full rounded-lg bg-wyvern-600/20 px-3 py-1.5 text-xs font-medium text-wyvern-300 transition hover:bg-wyvern-600 hover:text-white">
        Добавить в друзья
      </button>
    </div>
  );
}
