import { Account, AccountRepository } from "../domain/account"
import { Id } from "../domain/generics"
import { Transaction, TransactionRepository } from "../domain/transaction"
import { User, UserRepository } from "../domain/user"

export interface UserDetail {
  name: User["name"]
  account: {
    name: Account["name"]
    number: Account["number"]
    balance: Account["balance"]
    transactions: Transaction[]
  }
}
export async function getUserDetail(
  userRequest: Id,
  userRepository: UserRepository,
  accountRepository: AccountRepository,
  transactionRepository: TransactionRepository
): Promise<UserDetail | string> {
  const user = await userRepository.find(userRequest)
  if (!user) {
    return "USER NOT FOUND"
  }
  const accounts = await Promise.all(user.accounts.map((accountId) => accountRepository.find(accountId)))
  const accountsWithTransactions = await Promise.all(
    accounts.map(async (account) => ({
      ...account,
      transactions: await Promise.all(
        account.transactions.map((transactionId) => {
          return transactionRepository.find(transactionId)
        })
      ),
    }))
  )
  return {
    name: user.name,
    account: accountsWithTransactions[0],
  }
}
