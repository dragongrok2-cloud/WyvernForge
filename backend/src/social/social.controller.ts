import { Controller, Get, Param, Query } from '@nestjs/common';
import { SocialService } from './social.service';

@Controller('social')
export class SocialController {
  constructor(private socialService: SocialService) {}

  /**
   * Рекомендуемые игроки
   * GET /social/:userId/recommended
   */
  @Get(':userId/recommended')
  getRecommended(
    @Param('userId') userId: string,
    @Query('limit') limit?: string,
  ) {
    return this.socialService.getRecommendedPlayers(
      userId,
      limit ? parseInt(limit, 10) : 12,
    );
  }

  /**
   * Играли вместе недавно
   * GET /social/:userId/played-together
   */
  @Get(':userId/played-together')
  getPlayedTogether(
    @Param('userId') userId: string,
    @Query('limit') limit?: string,
  ) {
    return this.socialService.getRecentlyPlayedTogether(
      userId,
      limit ? parseInt(limit, 10) : 15,
    );
  }
}
