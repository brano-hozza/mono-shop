import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { User } from '@supabase/supabase-js';
import { Request } from 'express';
import { Supabase } from './common/supabase';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly supabase: Supabase) {}

  async getHello(request: Request): Promise<User> {
    const client = this.supabase.getClient();
    this.logger.debug(request.query);
    const { data, error } = await client.auth.getUser();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data.user;
  }
}
