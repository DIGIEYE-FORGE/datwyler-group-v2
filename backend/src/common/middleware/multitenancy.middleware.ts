import {
  Body,
  Inject,
  Injectable,
  Module,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MultitenancyService } from 'src/multitenancy/multitanancy.service';

@Injectable()
export class MultitenancyMiddleware implements NestMiddleware {
  constructor(private multitenancyService: MultitenancyService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const tenant = +req?.headers['Tenant-Id'];
    if (
      req?.headers['id-auth'] &&
      +req?.headers['Tenant-Id'] > 0 &&
      req.method === 'GET'
    ) {
      const res = await this.multitenancyService
        .MultiTenancy({
          userId: +req.headers['id-auth'] || undefined,
          tenantId: tenant || undefined,
        })
        .toPromise();
      req.params.where = JSON.stringify({
        ...JSON.parse(req.params.where),
        tenantId: {
          in: res.tenantIds,
        },
      });
    }
    if (tenant > 0 && req.method == 'POST' && !req.body.tenantId) {
      req.body.tenantId = tenant;
    }
    next();
  }
}
