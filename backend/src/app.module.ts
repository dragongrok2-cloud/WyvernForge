import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { FriendsModule } from './friends/friends.module';
import { SocialModule } from './social/social.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    FriendsModule,
    SocialModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
