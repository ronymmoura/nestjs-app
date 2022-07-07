import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    const token = await this.authService.login(
      req.body.email,
      req.body.password,
    );
    if (!token) throw new UnauthorizedException('E-mail ou senha incorretos');
    return token;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
