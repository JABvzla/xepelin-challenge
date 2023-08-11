import { describe, expect, test } from "@jest/globals"
import { Account } from "../domain/account"
import { Transaction } from "../domain/transaction"
import { User } from "../domain/user"
import { memoryRepositoryFactory } from "../infrastructure/memory-repository"
import { getUserDetail } from "./get-user-detail"

const accountR = (data) => memoryRepositoryFactory<Account>(data)
const transactionR = (data) => memoryRepositoryFactory<Transaction>(data)
const userR = (data) => memoryRepositoryFactory<User>(data)

describe("[Application] getUserDetail", () => {
  test("get user without account", async () => {
    // Arrange
    const accountRepository = accountR([])
    const transactionRepository = transactionR([])
    const userToSearch = { id: "1", name: "Jose Bonito", auth: [], accounts: [] }
    const userRepository = userR([userToSearch])
    const userRequest = userToSearch.id
    const expectResult = { name: "Jose Bonito", account: undefined }
    // Action
    const result = await getUserDetail(userRequest, userRepository, accountRepository, transactionRepository)
    // Assert
    expect(result).toEqual(expectResult)
  })

  test("get user with accounts but no transactions", async () => {
    // Arrange
    const userWithAccounts = { id: "2", name: "Jane Doe", auth: [], accounts: ["account-1", "account-2"] }
    const userToSearch = { id: "1", name: "Jose Bonito", auth: [], accounts: [] }
    const accounts = [
      { id: "account-1", name: "Savings", balance: 5413, number: "123456", transactions: [] },
      { id: "account-2", name: "Checking", balance: 3123, number: "789012", transactions: [] },
    ]
    const userRepository = userR([userToSearch, userWithAccounts])
    const accountRepository = accountR(accounts)
    const transactionRepository = transactionR([])
    const userRequest = userWithAccounts.id
    const expectedResult = { name: "Jane Doe", account: accounts[0] }

    // Action
    const result = await getUserDetail(userRequest, userRepository, accountRepository, transactionRepository)

    // Assert
    expect(result).toEqual(expectedResult)
  })

  test("get user with accounts and transactions", async () => {
    // Arrange
    const userWithAccountsAndTransactions = {
      id: "3",
      name: "Alice Wonderland",
      auth: [],
      accounts: ["account-3"],
    }
    const userRepository = userR([userWithAccountsAndTransactions])
    const accountRepository = accountR([
      {
        id: "account-3",
        name: "Investment",
        number: "345678",
        transactions: ["transaction-1", "transaction-2"],
      },
    ])
    const transactionRepository = transactionR([
      { id: "transaction-1", type: "deposit", amount: 100 },
      { id: "transaction-2", type: "withdrawal", amount: -50 },
    ])
    const userRequest = userWithAccountsAndTransactions.id
    const expectedResult = {
      name: "Alice Wonderland",
      account: {
        id: "account-3",
        name: "Investment",
        number: "345678",
        transactions: [
          { id: "transaction-1", type: "deposit", amount: 100 },
          { id: "transaction-2", type: "withdrawal", amount: -50 },
        ],
      },
    }

    // Action
    const result = await getUserDetail(userRequest, userRepository, accountRepository, transactionRepository)

    // Assert
    expect(result).toEqual(expectedResult)
  })

  test("get non-existent user", async () => {
    // Arrange
    const existingUser = { id: "1", name: "Jose Bonito", auth: [], accounts: [] }
    const userRepository = userR([existingUser])
    const accountRepository = accountR([])
    const transactionRepository = transactionR([])
    const nonExistentUserId = "999" // Assuming this user_not_found
    const expectedResult = "Id 999 Not Found"
    try {
      // Action
      await getUserDetail(nonExistentUserId, userRepository, accountRepository, transactionRepository)
    } catch (e) {
      // Assert
      expect(e).toMatch(expectedResult)
    }
  })

  test("get user with non-existent account and transactions", async () => {
    // Arrange
    const existingUser = {
      id: "1",
      name: "Jose Bonito",
      auth: [],
      accounts: ["existing-account"],
    }
    const userRepository = userR([existingUser])
    const existingAccount = {
      id: "existing-account",
      name: "Savings",
      number: "123456",
      transactions: ["non-existing-transaction"],
    }
    const accountRepository = accountR([existingAccount])
    const transactionRepository = transactionR([])
    const expectedResult = "Id non-existing-transaction Not Found"

    try {
      // Action
      await getUserDetail(existingUser.id, userRepository, accountRepository, transactionRepository)
    } catch (e) {
      // Assert
      expect(e).toMatch(expectedResult)
    }
  })
})
