import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  private readonly jwtSecret = process.env.JWT_SECRET || 'wyvernforge-dev-secret-change-me';

  async register(email: string, username: string, password: string, displayName?: string) {
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existing) {
      throw new ConflictException(
        existing.email === email ? 'Email already in use' : 'Username already taken',
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await this.prisma.user.create({
      data: {
        email,
        username,
        passwordHash,
        displayName: displayName || username,
      },
      select: {
        id: true,
        email: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        status: true,
        createdAt: true,
      },
    });

    const token = this.signToken(user.id);

    return { user, token };
  }

  async login(emailOrUsername: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.signToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        status: user.status,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  async validateToken(token: string) {
    try {
      const payload = jwt.verify(token, this.jwtSecret) as { sub: string };
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          email: true,
          username: true,
          displayName: true,
          avatarUrl: true,
          bannerUrl: true,
          bio: true,
          status: true,
          createdAt: true,
        },
      });
      if (!user) throw new UnauthorizedException();
      return user;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private signToken(userId: string) {
    return jwt.sign({ sub: userId }, this.jwtSecret, { expiresIn: '7d' });
  }
}
