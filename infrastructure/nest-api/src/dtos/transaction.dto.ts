import { Id, USD } from '@xepelin/domain/generics';
import { TransactionType } from '@xepelin/domain/transaction';
import { User } from '@xepelin/domain/user';

type UserId = User['id'];
export class TransactionDTO {
  id?: Id;
  userId?: UserId;
  amount: USD;
  type: TransactionType;
  createdAt?: Date;
}
