import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Account } from '@xepelin/domain/account';
import { Id, USD } from '@xepelin/domain/generics';
import { Transaction } from '@xepelin/domain/transaction';
import { Document } from 'mongoose';

@Schema({ collection: 'accounts ' })
export class AccountClass implements Account {
  id: Id;
  @Prop()
  name: string;
  @Prop()
  number: string;
  @Prop()
  balance: USD;
  @Prop()
  transactions: Transaction['id'][];
}
export type AccountDocument = Account & Document;
export const AccountSchema = SchemaFactory.createForClass(AccountClass);