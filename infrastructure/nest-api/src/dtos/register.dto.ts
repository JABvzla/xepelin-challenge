import { Auth } from '@xepelin/domain/auth';
import { User } from '@xepelin/domain/user';

export class RegisterDTO {
  id?: User['id'];
  name: User['name'];
  username: Auth['username'];
  password: Auth['password'];
}
