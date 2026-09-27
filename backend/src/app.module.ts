import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FriendsModule } from './friends/friends.module';
import { SocialModule } from './social/social.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    FriendsModule,
    SocialModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
