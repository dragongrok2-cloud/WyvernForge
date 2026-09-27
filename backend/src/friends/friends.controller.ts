import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Get(':userId')
  getFriends(@Param('userId') userId: string) {
    return this.friendsService.getFriends(userId);
  }

  @Get(':userId/pending')
  getPending(@Param('userId') userId: string) {
    return this.friendsService.getPendingRequests(userId);
  }

  @Post('request')
  sendRequest(@Body() body: { requesterId: string; addresseeId: string }) {
    return this.friendsService.sendRequest(body.requesterId, body.addresseeId);
  }

  @Post(':friendshipId/accept')
  accept(@Param('friendshipId') friendshipId: string, @Body() body: { userId: string }) {
    return this.friendsService.acceptRequest(body.userId, friendshipId);
  }

  @Post(':friendshipId/reject')
  reject(@Param('friendshipId') friendshipId: string, @Body() body: { userId: string }) {
    return this.friendsService.rejectRequest(body.userId, friendshipId);
  }
}
