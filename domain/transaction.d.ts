import { Id, Date, USD, Repository } from "./generics"
import { Account } from "./account"

export type TransactionType = "DEPOSIT" | "WITHDRAW"
export interface Transaction {
  id: Id
  account: Account["id"]
  amount: USD
  type: TransactionType
  createdAt: Date
}
export interface TransactionRepository extends Repository<Transaction> {}
