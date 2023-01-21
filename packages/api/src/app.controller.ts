import { Controller, Get, Param, Req } from '@nestjs/common';
import { User } from '@supabase/supabase-js';
import { Request } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getHello(@Req() request: Request): Promise<User> {
    return await this.appService.getHello(request);
  }

  @Get('signin')
  async signIn(
    @Param('access_token') token: string,
    @Param('refresh_token') ref_token: string,
  ) {
    return await this.authService.signIn(token, ref_token);
  }
}
