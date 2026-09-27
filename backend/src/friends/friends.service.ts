import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FriendshipStatus } from '@prisma/client';

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaService) {}

  async sendRequest(requesterId: string, addresseeId: string) {
    if (requesterId === addresseeId) {
      throw new BadRequestException('Cannot send friend request to yourself');
    }

    // Check reverse request too
    const existing = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { requesterId, addresseeId },
          { requesterId: addresseeId, addresseeId: requesterId },
        ],
      },
    });

    if (existing) {
      if (existing.status === FriendshipStatus.ACCEPTED) {
        throw new BadRequestException('Already friends');
      }
      throw new BadRequestException('Friend request already exists');
    }

    return this.prisma.friendship.create({
      data: { requesterId, addresseeId, status: FriendshipStatus.PENDING },
      include: {
        addressee: {
          select: { id: true, username: true, displayName: true, avatarUrl: true },
        },
      },
    });
  }

  async acceptRequest(userId: string, friendshipId: string) {
    const friendship = await this.prisma.friendship.findUnique({
      where: { id: friendshipId },
    });

    if (!friendship || friendship.addresseeId !== userId) {
      throw new NotFoundException('Friend request not found');
    }

    if (friendship.status !== FriendshipStatus.PENDING) {
      throw new BadRequestException('Request is not pending');
    }

    return this.prisma.friendship.update({
      where: { id: friendshipId },
      data: { status: FriendshipStatus.ACCEPTED },
      include: {
        requester: {
          select: { id: true, username: true, displayName: true, avatarUrl: true, status: true },
        },
      },
    });
  }

  async rejectRequest(userId: string, friendshipId: string) {
    const friendship = await this.prisma.friendship.findUnique({
      where: { id: friendshipId },
    });

    if (!friendship || friendship.addresseeId !== userId) {
      throw new NotFoundException('Friend request not found');
    }

    return this.prisma.friendship.update({
      where: { id: friendshipId },
      data: { status: FriendshipStatus.REJECTED },
    });
  }

  async getFriends(userId: string) {
    const friendships = await this.prisma.friendship.findMany({
      where: {
        status: FriendshipStatus.ACCEPTED,
        OR: [{ requesterId: userId }, { addresseeId: userId }],
      },
      include: {
        requester: {
          select: { id: true, username: true, displayName: true, avatarUrl: true, status: true },
        },
        addressee: {
          select: { id: true, username: true, displayName: true, avatarUrl: true, status: true },
        },
      },
    });

    return friendships.map((f) =>
      f.requesterId === userId ? f.addressee : f.requester,
    );
  }

  async getPendingRequests(userId: string) {
    return this.prisma.friendship.findMany({
      where: {
        addresseeId: userId,
        status: FriendshipStatus.PENDING,
      },
      include: {
        requester: {
          select: { id: true, username: true, displayName: true, avatarUrl: true },
        },
      },
    });
  }
}
