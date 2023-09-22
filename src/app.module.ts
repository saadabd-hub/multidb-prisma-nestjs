import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './services/health/health.module';
import { PtnModule } from './services/ptn/ptn.module';

@Module({
  imports: [HttpModule, PrismaModule, HealthModule, PtnModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
