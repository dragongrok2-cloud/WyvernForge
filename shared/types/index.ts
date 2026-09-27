// Shared TypeScript types for WyvernForge

export type UserStatus = 'ONLINE' | 'OFFLINE' | 'IN_GAME' | 'AWAY' | 'DO_NOT_DISTURB';

export type FriendshipStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'BLOCKED';

export interface User {
  id: string;
  email: string;
  username: string;
  displayName?: string | null;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  bio?: string | null;
  status: UserStatus;
  currentGameId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PublicProfile {
  id: string;
  username: string;
  displayName?: string | null;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  bio?: string | null;
  status: UserStatus;
}

export interface RecommendedPlayer extends PublicProfile {
  reason?: string;
  score?: number;
}

export interface PlayedTogetherPlayer extends PublicProfile {
  reason: string;
  sessionsCount?: number;
  lastPlayedAt?: string;
  lastGame?: {
    id: string;
    title: string;
    coverUrl?: string | null;
  };
}

export interface Friendship {
  id: string;
  requesterId: string;
  addresseeId: string;
  status: FriendshipStatus;
  createdAt: string;
}
