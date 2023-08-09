import { Auth } from '../../../../domain/auth';
import { User } from '../../../../domain/user';

export class RegisterDTO {
  id?: User['id'];
  name: User['name'];
  username: Auth['username'];
  password: Auth['password'];
}
