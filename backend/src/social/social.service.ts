import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SocialService {
  constructor(private prisma: PrismaService) {}

  /**
   * Рекомендуемые игроки
   * Логика: игроки, с которыми часто играют, друзья друзей, общие игры
   */
  async getRecommendedPlayers(userId: string, limit = 12) {
    // 1. Сначала берём уже сохранённые рекомендации (если алгоритм уже посчитал)
    const stored = await this.prisma.recommendation.findMany({
      where: { fromUserId: userId },
      orderBy: { score: 'desc' },
      take: limit,
      include: {
        toUser: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
            status: true,
            bio: true,
          },
        },
      },
    });

    if (stored.length > 0) {
      return stored.map((r) => ({
        ...r.toUser,
        reason: r.reason,
        score: r.score,
      }));
    }

    // 2. Fallback: игроки, с которыми играли вместе недавно + друзья друзей
    const recentCoPlayers = await this.getRecentlyPlayedTogether(userId, 20);

    // Простой fallback — возвращаем тех, с кем играли
    return recentCoPlayers.slice(0, limit).map((p) => ({
      ...p.user,
      reason: p.reason,
      score: p.sessionsCount,
    }));
  }

  /**
   * Игроки, с которыми играли вместе недавно
   */
  async getRecentlyPlayedTogether(userId: string, limit = 15) {
    // Находим сессии, в которых участвовал пользователь за последние 30 дней
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const mySessions = await this.prisma.playSessionPlayer.findMany({
      where: {
        userId,
        joinedAt: { gte: thirtyDaysAgo },
      },
      select: { sessionId: true },
    });

    const sessionIds = mySessions.map((s) => s.sessionId);

    if (sessionIds.length === 0) {
      return [];
    }

    // Находим других игроков из этих же сессий
    const coPlayers = await this.prisma.playSessionPlayer.findMany({
      where: {
        sessionId: { in: sessionIds },
        userId: { not: userId },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
            status: true,
          },
        },
        session: {
          include: {
            game: {
              select: { id: true, title: true, coverUrl: true },
            },
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
    });

    // Группируем по пользователю и считаем количество совместных сессий
    const map = new Map<
      string,
      {
        user: any;
        sessionsCount: number;
        lastPlayedAt: Date;
        lastGame: any;
        reason: string;
      }
    >();

    for (const entry of coPlayers) {
      const existing = map.get(entry.userId);
      if (existing) {
        existing.sessionsCount += 1;
        if (entry.joinedAt > existing.lastPlayedAt) {
          existing.lastPlayedAt = entry.joinedAt;
          existing.lastGame = entry.session.game;
        }
      } else {
        map.set(entry.userId, {
          user: entry.user,
          sessionsCount: 1,
          lastPlayedAt: entry.joinedAt,
          lastGame: entry.session.game,
          reason: `Играли вместе в ${entry.session.game.title}`,
        });
      }
    }

    return Array.from(map.values())
      .sort((a, b) => b.sessionsCount - a.sessionsCount || b.lastPlayedAt.getTime() - a.lastPlayedAt.getTime())
      .slice(0, limit)
      .map((item) => ({
        ...item,
        reason:
          item.sessionsCount > 1
            ? `Играли вместе ${item.sessionsCount} раза · ${item.lastGame?.title}`
            : item.reason,
      }));
  }
}
