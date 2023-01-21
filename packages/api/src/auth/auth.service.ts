import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { User } from '@supabase/supabase-js';
import { Supabase } from '../common/supabase';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly supabase: Supabase) {}

  async signIn(access_token: string, refresh_token: string): Promise<User> {
    this.logger.debug({ access_token, refresh_token });
    const client = this.supabase.getClient();
    client.auth.setSession({ access_token, refresh_token });
    const { data, error } = await client.auth.getUser();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data.user;
  }
}
