import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthClass, AuthSchema } from './schemas/auth.schema';
import { UserClass, UserSchema } from './schemas/user.schema';
import { AccountClass, AccountSchema } from './schemas/account.schema';
import {
  TransactionClass,
  TransactionSchema,
} from './schemas/transaction.schema';
import { JwtModule } from '@nestjs/jwt';
import { BigDepositLogger } from './midleware/big-deposit-logger.middleware';

const mongoosePw = 'BSFR8mPSRm6VevRA';
const MongooseConnection = `mongodb+srv://rootuser:${mongoosePw}@cluster0.tdtjdsx.mongodb.net/`;
const jwtSecret = 'SFR8mPSRm6VevRA';
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forRoot(MongooseConnection),
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
      .apply(BigDepositLogger)
      .forRoutes({ path: '/transaction', method: RequestMethod.POST });
  }
}
// rootuser
// BSFR8mPSRm6VevRA

// `mongodb+srv://rootuser:BSFR8mPSRm6VevRA@cluster0.tdtjdsx.mongodb.net/`
