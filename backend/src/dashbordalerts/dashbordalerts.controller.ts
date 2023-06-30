import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { DashbordAlertsService } from './dashbordalerts.service';
import {
  DashbordAlerts,
  CreateDashbordAlertsDto,
  UpdateDashbordAlertsDto,
} from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('dashbordalerts')
@Controller('dashbordalerts')
export class DashbordAlertsController {
  constructor(private readonly dashbordalertsService: DashbordAlertsService) {}

  @ApiOkResponse({ type: [DashbordAlerts] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.dashbordalertsService.findAll(query);
  }

  @ApiOkResponse({ type: DashbordAlerts })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.dashbordalertsService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: DashbordAlerts })
  @Post()
  create(@Body() data: CreateDashbordAlertsDto) {
    return this.dashbordalertsService.create(data);
  }

  @ApiOkResponse({ type: DashbordAlerts })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDashbordAlertsDto,
  ) {
    return this.dashbordalertsService.update(id, data);
  }

  @ApiOkResponse({ type: DashbordAlerts })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dashbordalertsService.remove(id);
  }

  @Get('test/test1')
  getAcountTypesAlerts(
    @Query()
    query: {
      where: {
        userId: number;
        tenantId: number;
      };
    },
  ) {
    return this.dashbordalertsService.GetAccountDashbordeAlerts(query.where);
  }
}
