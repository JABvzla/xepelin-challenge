import { describe, expect, test } from "@jest/globals"
import { Account } from "../domain/account"
import { User } from "../domain/user"
import { memoryRepositoryFactory } from "../infrastructure/memory-repository"
import { createAccount } from "./create-account"

const accountR = (data) => memoryRepositoryFactory<Account>(data)
const userR = (data) => memoryRepositoryFactory<User>(data)

describe("[Application] createAccount", () => {
  test("create account for user with no existing account", async () => {
    // Arrange
    const user = { id: "1", name: "John Doe", auth: [], accounts: [] }
    const userRepository = userR([user])
    const accountRepository = accountR([])
    const createdAccount = {
      name: "Investment",
      balance: 10000,
      number: "987654",
    }
    const accountRequest = {
      userId: user.id,
      name: createdAccount.name,
      balance: createdAccount.balance,
      number: createdAccount.number,
    }
    const expectedResult = {
      userId: user.id,
      name: createdAccount.name,
      balance: createdAccount.balance,
      number: createdAccount.number,
    }
    // Action
    const result = await createAccount(accountRequest, userRepository, accountRepository)
    const userResult = await userRepository.find(user.id)
    // Assert
    if (typeof result === "string") return expect(result).toBe(-1)
    expect(result.id).not.toBeNull()
    expect(userResult.accounts).toEqual([result.id])
  })
  test("create account for user with an existing account", async () => {
    // Arrange
    const existingAccount = {
      id: "account-1",
      name: "Savings",
      balance: 5000,
      number: "123456",
      transactions: [],
    }
    const user = { id: "1", name: "Jane Smith", auth: [], accounts: [existingAccount.id] }
    const userRepository = userR([user])
    const accountRepository = accountR([existingAccount])
    const createdAccount = {
      name: "Checking",
      balance: 2000,
      number: "789012",
    }
    const accountRequest = {
      userId: user.id,
      name: createdAccount.name,
      balance: createdAccount.balance,
      number: createdAccount.number,
    }

    // Action
    const result = await createAccount(accountRequest, userRepository, accountRepository)

    // Assert
    expect(result).toBe("user already has an account created")
  })
  test("create account for non-existent user", async () => {
    // Arrange
    const userRepository = userR([])
    const accountRepository = accountR([])
    const createdAccount = {
      name: "Savings",
      balance: 3000,
      number: "135792",
    }
    const accountRequest = {
      userId: "nonexistent-user",
      name: createdAccount.name,
      balance: createdAccount.balance,
      number: createdAccount.number,
    }
    const expectedResult = "user doesn't exist"
    // Action
    const result = await createAccount(accountRequest, userRepository, accountRepository)
    // Assert
    expect(result).toBe(expectedResult)
  })
})
