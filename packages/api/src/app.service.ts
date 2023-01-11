import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '@supabase/supabase-js';
import { Request } from 'express';
import { Supabase } from './common/supabase';

@Injectable()
export class AppService {
  constructor(private readonly supabase: Supabase) {}

  async getHello(request: Request): Promise<User> {
    const client = this.supabase.getClient();

    const { data, error } = await client.auth.getUser(
      request.headers.authentification as string,
    );
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data.user;
  }
}
