import { Id, Repository } from "./generics"

export interface Auth {
  id: Id
  username: string
  password: string
}
export interface AuthRepository extends Repository<Auth> {}

