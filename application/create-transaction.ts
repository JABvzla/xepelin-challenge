import { Transaction, TransactionRepository } from "domain/transaction"
import { Account, AccountRepository } from "../domain/account"
import { User, UserRepository } from "../domain/user"

export interface TransactionRequest {
  amount: Transaction["amount"]
  userId: User["id"]
  type: Transaction["type"]
}
export async function createTransaction(
  transactionRequest: TransactionRequest,
  userRepository: UserRepository,
  transactionRepository: TransactionRepository,
  accountRepository: AccountRepository
) {
  const user = await userRepository.find(transactionRequest.userId).catch(() => {})
  if (!user) {
    return "user doesn't exist"
  }
  if (!user?.accounts?.length) {
    return "user doesn't have account"
  }
  const accountId = user.accounts[0]
  const account = await accountRepository.find(accountId)
  if (!account) {
    return "account not found"
  }
  const operator = transactionRequest.type === "DEPOSIT" ? 1 : -1
  const balance = transactionRequest.amount * operator + account.balance
  if (balance < 0) {
    return "insufficient funds"
  }

  const newTransaction = await transactionRepository.create({
    account: accountId,
    amount: transactionRequest.amount,
    type: transactionRequest.type,
  })
  const newAccountData: Account = {
    ...account,
    balance,
    transactions: [newTransaction.id, ...account.transactions],
  }
  await accountRepository.update(accountId, newAccountData)

  return {
    userId: transactionRequest.userId,
    id: newTransaction.id,
    amount: newTransaction.amount,
    type: newTransaction.type,
    createdAt: newTransaction.createdAt,
  }
}
