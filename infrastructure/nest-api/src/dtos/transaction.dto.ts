import { Id, USD } from '../../../../domain/generics';
import { TransactionType } from '../../../../domain/transaction';
import { User } from '../../../../domain/user';

type UserId = User['id'];
export class TransactionDTO {
  id?: Id;
  userId?: UserId;
  amount: USD;
  type: TransactionType;
  createdAt?: Date;
}
