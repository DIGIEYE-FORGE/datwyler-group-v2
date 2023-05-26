import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Get()
  findAll(@Query() query: { where?: string }) {
    return this.dashboardService.findAll(query);
  }
}
