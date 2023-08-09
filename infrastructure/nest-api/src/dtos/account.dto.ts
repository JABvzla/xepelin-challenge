import { Account } from '@xepelin/domain/account';
import { USD } from '@xepelin/domain/generics';
import { User } from '@xepelin/domain/user';

type AccountId = Account['id'];
type UserId = User['id'];
export class AccountDTO {
  id?: AccountId;
  userId: UserId;
  name: string;
  number: string;
  balance: USD;
}
