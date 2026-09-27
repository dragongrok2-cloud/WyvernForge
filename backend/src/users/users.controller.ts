import { Controller, Get, Param, Query, Patch, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('search')
  search(@Query('q') query: string) {
    return this.usersService.search(query || '');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get('username/:username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Patch('me')
  async updateMe(
    @Headers('authorization') authHeader: string,
    @Body()
    body: {
      displayName?: string;
      bio?: string;
      avatarUrl?: string;
      bannerUrl?: string;
      status?: 'ONLINE' | 'OFFLINE' | 'IN_GAME' | 'AWAY' | 'DO_NOT_DISTURB';
    },
  ) {
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token');
    }
    const user = await this.authService.validateToken(authHeader.slice(7));
    return this.usersService.updateProfile(user.id, body);
  }
}
