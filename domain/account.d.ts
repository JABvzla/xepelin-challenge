import { Id, Repository, USD } from "./generics"
import { Transaction } from "./transaction"

export interface Account {
  id: Id
  name: string
  number: string
  balance: USD
  transactions: Transaction['id'][]
}
export interface AccountRepository extends Repository<Account> {}
