// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './../../.env' });
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BigDepositLogger } from './midleware/big-deposit-logger.middleware';
import { JwtAuthGuardMiddleware } from './midleware/jwt-auth.middleware';
import { AccountClass, AccountSchema } from './schemas/account.schema';
import { AuthClass, AuthSchema } from './schemas/auth.schema';
import {
  TransactionClass,
  TransactionSchema,
} from './schemas/transaction.schema';
import { UserClass, UserSchema } from './schemas/user.schema';

const MONGO_URL = `mongodb+srv://${process.env.MONGOOSE_USER}:${process.env.MONGOOSE_PASSWORD}@${process.env.MONGOOSE_CONNECTION}`;

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    MongooseModule.forRoot(MONGO_URL),
    MongooseModule.forFeature([
      { name: AuthClass.name, schema: AuthSchema },
      { name: UserClass.name, schema: UserSchema },
      { name: AccountClass.name, schema: AccountSchema },
      { name: TransactionClass.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthGuardMiddleware)
      .exclude(
        { path: '/login', method: RequestMethod.POST },
        { path: '/register', method: RequestMethod.POST },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(BigDepositLogger)
      .forRoutes({ path: '/transaction', method: RequestMethod.POST });
  }
}
