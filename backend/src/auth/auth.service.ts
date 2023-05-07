import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { microservicesOption } from './grpc.options';
import { AutchResponse, AuthInterface } from './auth.interface';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  @Client(microservicesOption)
  private client: ClientGrpc;
  private authService: AuthInterface;

  onModuleInit() {
    this.authService = this.client.getService<AuthInterface>('Auth');
  }

  checkToken(data: { accessToken: string }): Observable<AutchResponse> {
    return this.authService.Verify(data);
  }
}
