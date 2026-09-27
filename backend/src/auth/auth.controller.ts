import { Controller, Post, Body, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(
    @Body() body: { email: string; username: string; password: string; displayName?: string },
  ) {
    return this.authService.register(
      body.email,
      body.username,
      body.password,
      body.displayName,
    );
  }

  @Post('login')
  login(@Body() body: { emailOrUsername: string; password: string }) {
    return this.authService.login(body.emailOrUsername, body.password);
  }

  @Get('me')
  async me(@Headers('authorization') authHeader?: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }
    const token = authHeader.slice(7);
    return this.authService.validateToken(token);
  }
}
