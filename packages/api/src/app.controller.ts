import { Controller, Get, Req } from '@nestjs/common';
import { User } from '@supabase/supabase-js';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Req() request: Request): Promise<User> {
    return await this.appService.getHello(request);
  }
}
