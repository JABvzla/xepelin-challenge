import { Account, AccountRepository } from "../domain/account"
import { User, UserRepository } from "../domain/user"

interface AccountRequest {
  userId: User["id"]
  name: Account["name"]
  number: Account["number"]
  balance: Account["balance"]
}
export async function createAccount(
  accountRequest: AccountRequest,
  userRepository: UserRepository,
  accountRepository: AccountRepository
) {
  const user = await userRepository.find(accountRequest.userId).catch(() => {})
  if (!user) {
    return "user_not_found"
  }
  if (user?.accounts?.length) {
    return "user_already_has_an_account_created"
  }

  const newAccount = await accountRepository.create({
    name: accountRequest.name,
    number: accountRequest.number,
    balance: accountRequest.balance,
  })
  const newUserData = {
    ...user,
    accounts: [newAccount.id],
  }
  await userRepository.update(user.id, newUserData)
  return {
    userId: user.id,
    id: newAccount.id,
    name: newAccount.name,
    balance: newAccount.balance,
    number: newAccount.number,
  }
}
