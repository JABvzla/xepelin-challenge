import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transaction, TransactionType } from '@xepelin/domain/transaction';
import { Date, Id, USD } from '@xepelin/domain/generics';
import { Account } from '@xepelin/domain/account';

type AccountId = Account['id'];

@Schema({ collection: 'transactions ' })
export class TransactionClass implements Transaction {
  id: Id;
  @Prop()
  account: AccountId;
  @Prop()
  amount: USD;
  @Prop()
  type: TransactionType;
  @Prop()
  createdAt: Date;
}

export type TransactionDocument = Transaction & Document;
export const TransactionSchema = SchemaFactory.createForClass(TransactionClass);
