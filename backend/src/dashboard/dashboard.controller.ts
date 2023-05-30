import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Get()
  findAll(@Query() query: { where?: string }) {
    console.clear();
    console.log(query);

    return this.dashboardService.findAll(query);
  }
  @Get('/history')
  getDashboardHistory(@Query() query: { where?: string }) {
    console.clear();
    console.log(query);

    return this.dashboardService.getDashboardHistory(query);
  }
}
