import { Inject, Injectable, Module, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) { }
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers['authorization']) {
        const data = await this.authService
          .checkToken({
            accessToken: req.headers['authorization'].split(' ')[1],
          })
          .toPromise();
        if (req.method === 'GET') {
          req.body.email_auth = data.email;
          req.body.id_auth = data.id;
        }
        next();
      } else {
        res.status(401).send({ message: 'Unauthorized' });
      }
    } catch (e) {
      res.status(401).send({ message: 'Unauthorized' });
    }
  }
}
