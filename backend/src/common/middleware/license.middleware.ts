import { Inject, Injectable, Module, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LicenseService } from 'src/license/license.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private licenseService: LicenseService) { }
	async use(req: Request, res: Response, next: NextFunction) {

	}
}
