import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Get()
  async checkHealth() {
    return this.health.check([]);
  }
}
