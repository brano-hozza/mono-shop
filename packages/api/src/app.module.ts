import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './common/supabase';

@Module({
  imports: [ConfigModule.forRoot(), SupabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
