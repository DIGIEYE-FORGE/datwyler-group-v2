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
  constructor(private multitenancyService: MultitenancyService) { }
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body.id_auth) {
      const res = await this.multitenancyService
        .MultiTenancy({
          userId: req.body.id_auth,
          tenantId: +req.headers['tenant-id'] || undefined,
        })
        .toPromise();
      if (res) {
        req.body.tenantIds = res.tenantIds;
      }
    }
    next();
  }
}
