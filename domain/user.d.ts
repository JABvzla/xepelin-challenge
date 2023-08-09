import { Account } from "./account"
import { Auth } from "./auth"
import { Id, Repository } from "./generics"

export interface User {
  id: Id
  name: string
  auth: Auth[]
  accounts: Account["id"][]
}
export interface UserRepository extends Repository<User> {}
