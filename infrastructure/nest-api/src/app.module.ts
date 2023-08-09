import { Module } from '@nestjs/common';
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

const mongoosePw = 'BSFR8mPSRm6VevRA';
const MongooseConnection = `mongodb+srv://rootuser:${mongoosePw}@cluster0.tdtjdsx.mongodb.net/`;
@Module({
  imports: [
    ConfigModule.forRoot(),
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
export class AppModule {}

// rootuser
// BSFR8mPSRm6VevRA

// `mongodb+srv://rootuser:BSFR8mPSRm6VevRA@cluster0.tdtjdsx.mongodb.net/`
