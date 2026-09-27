// Shared TypeScript types for WyvernForge

export type UserStatus = 'ONLINE' | 'OFFLINE' | 'IN_GAME' | 'AWAY' | 'DO_NOT_DISTURB';

export interface User {
  id: string;
  email: string;
  username: string;
  displayName?: string | null;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  bio?: string | null;
  status: UserStatus;
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
