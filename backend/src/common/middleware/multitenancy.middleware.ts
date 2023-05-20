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
    const tenant = +req?.headers['tenant-id'];
    if (req?.headers['id-auth'] && tenant > 0 && req.method === 'GET') {
      const res = await this.multitenancyService
        .MultiTenancy({
          userId: +req.headers['id-auth'] || undefined,
          tenantId: tenant || undefined,
        })
        .toPromise();
      req.query.where = JSON.stringify({
        ...JSON.parse((req?.query?.where || '{}') as string),
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
