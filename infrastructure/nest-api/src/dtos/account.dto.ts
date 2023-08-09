import { Account } from '../../../../domain/account';
import { USD } from '../../../../domain/generics';
import { User } from '../../../../domain/user';

type AccountId = Account['id'];
type UserId = User['id'];
export class AccountDTO {
  id?: AccountId;
  userId: UserId;
  name: string;
  number: string;
  balance: USD;
}
