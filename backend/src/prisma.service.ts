import {
  INestApplication,
  Injectable,
  OnModuleInit,
  Param,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

async function hashPassword(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    // prisma middleware
    this.$use(async (params, next) => {
      // if (process.env.NODE_ENV === 'development')
      //   console.log('prisma middleware', params);
      const { action, args } = params;
      if (action == 'create' || action == 'update') {
        // prervent sending  empty Object in create and update
        if (Object.keys(params.args.data).length === 0)
          throw new Error('No data provided');
        // hash password
        if (args.data && args.data.password)
          // args.data.password = await bcrypt.hash(args.data.password, bcrypt.genSaltSync(10));
          args.data.password = await hashPassword(args.data.password);
      }

      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
