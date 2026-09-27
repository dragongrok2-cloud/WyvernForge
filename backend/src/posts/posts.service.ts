import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: string, content?: string, imageUrl?: string) {
    if (!content && !imageUrl) {
      throw new ForbiddenException('Post must have content or image');
    }

    return this.prisma.post.create({
      data: {
        authorId,
        content,
        imageUrl,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  async getFeed(limit = 20, cursor?: string) {
    return this.prisma.post.findMany({
      take: limit,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
            status: true,
          },
        },
      },
    });
  }

  async getByUser(userId: string, limit = 20) {
    return this.prisma.post.findMany({
      where: { authorId: userId },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  async delete(postId: string, userId: string) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post not found');
    if (post.authorId !== userId) throw new ForbiddenException('Not your post');

    return this.prisma.post.delete({ where: { id: postId } });
  }
}
