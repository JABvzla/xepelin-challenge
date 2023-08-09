import { AccountRepository } from "../domain/account"
import { Id } from "../domain/generics"
import { TransactionRepository } from "../domain/transaction"
import { UserRepository } from "../domain/user"

export async function getUserDetail(
  userRequest: Id,
  userRepository: UserRepository,
  accountRepository: AccountRepository,
  transactionRepository: TransactionRepository
) {
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
    ...user,
    accounts: accountsWithTransactions,
  }
}
