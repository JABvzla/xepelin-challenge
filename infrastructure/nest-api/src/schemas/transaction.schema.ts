import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transaction, TransactionType } from '../../../../domain/transaction';
import { Date, Id, USD } from '../../../../domain/generics';
import { Account } from '../../../../domain/account';

type AccountId = Account['id'];

@Schema({ collection: 'transactions', timestamps: true })
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
