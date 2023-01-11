import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({ scope: Scope.REQUEST })
export class Supabase {
  private readonly logger = new Logger(Supabase.name);
  private clientAdminInstance: SupabaseClient;
  private clientInstance: SupabaseClient;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly configService: ConfigService,
  ) {}

  getAdminClient() {
    this.logger.log('getting supabase admin client...');
    if (this.clientAdminInstance) {
      this.logger.log('client exists - returning for current Scope.REQUEST');
      return this.clientAdminInstance;
    }

    this.logger.log(
      'initialising new supabase admin client for new Scope.REQUEST',
    );

    this.clientAdminInstance = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
      {
        auth: {
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      },
    );
    return this.clientAdminInstance;
  }

  getClient() {
    this.logger.log('getting supabase client...');
    if (this.clientInstance) {
      this.logger.log('client exists - returning for current Scope.REQUEST');
      return this.clientInstance;
    }

    this.logger.log('initialising new supabase client for new Scope.REQUEST');

    this.clientInstance = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_PUB_KEY'),
      {
        auth: {
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      },
    );
    return this.clientInstance;
  }
}
