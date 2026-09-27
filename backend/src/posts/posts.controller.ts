import { Controller, Get, Post, Delete, Body, Param, Query, Headers, UnauthorizedException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthService } from '../auth/auth.service';

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private authService: AuthService,
  ) {}

  private async getUserId(authHeader?: string) {
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token');
    }
    const user = await this.authService.validateToken(authHeader.slice(7));
    return user.id;
  }

  @Get('feed')
  getFeed(@Query('limit') limit?: string, @Query('cursor') cursor?: string) {
    return this.postsService.getFeed(limit ? parseInt(limit, 10) : 20, cursor);
  }

  @Get('user/:userId')
  getByUser(@Param('userId') userId: string, @Query('limit') limit?: string) {
    return this.postsService.getByUser(userId, limit ? parseInt(limit, 10) : 20);
  }

  @Post()
  async create(
    @Headers('authorization') authHeader: string,
    @Body() body: { content?: string; imageUrl?: string },
  ) {
    const userId = await this.getUserId(authHeader);
    return this.postsService.create(userId, body.content, body.imageUrl);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Headers('authorization') authHeader: string,
  ) {
    const userId = await this.getUserId(authHeader);
    return this.postsService.delete(id, userId);
  }
}
