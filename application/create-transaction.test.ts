import { describe, expect, test } from "@jest/globals"
import { memoryRepositoryFactory } from "../infrastructure/memory-repository" 
import { Account } from "../domain/account"
import { Transaction } from "../domain/transaction"
import { User } from "../domain/user"
import { TransactionRequest, createTransaction } from "./create-transaction"

const accountR = (data) => memoryRepositoryFactory<Account>(data)
const transactionR = (data) => memoryRepositoryFactory<Transaction>(data)
const userR = (data) => memoryRepositoryFactory<User>(data)

describe("[Application] createTransaction", () => {
  test("create deposit transaction for an existing user and account", async () => {
    // Arrange
    const user = { id: "1", name: "John Doe", auth: [], accounts: ["account-1"] }
    const account = {
      id: "account-1",
      name: "Savings",
      balance: 5000,
      number: "123456",
      transactions: [],
    }
    const userRepository = userR([user])
    const accountRepository = accountR([account])
    const createdTransaction = {
      id: "transaction-1",
      amount: 1000,
      type: "DEPOSIT",
    }
    const transactionRepository = transactionR([])
    const transactionRequest: TransactionRequest = {
      userId: user.id,
      amount: createdTransaction.amount,
      type: "DEPOSIT",
    }
    const expectedResult = {
      amount: createdTransaction.amount,
      type: createdTransaction.type,
    }
    // Action
    const result = await createTransaction(transactionRequest, userRepository, transactionRepository, accountRepository)
    const accountResult = await accountRepository.find(account.id);
    // Assert
    if(typeof result === 'string') return expect(result).toBe(-1);
    expect(result).toEqual(expect.objectContaining(expectedResult));
    expect(accountResult.transactions).toContain(result.id);
  })

  test("create transaction for non-existent user", async () => {
    // Arrange
    const userRepository = userR([])
    const accountRepository = accountR([])
    const transactionRepository = transactionR([])
    const transactionRequest: TransactionRequest = {
      userId: "nonexistent-user",
      amount: 500,
      type: "WITHDRAWAL",
    }
    // Action
    const result = await createTransaction(transactionRequest, userRepository, transactionRepository, accountRepository)
    // Assert
    expect(result).toBe("user doesn't exist")
  })

  test("create withdrawal transaction for an existing user and account", async () => {
    // Arrange
    const initialBalance = 5000;
    const withdrawalAmount = 1500;
    
    const user = { id: "1", name: "John Doe", auth: [], accounts: ["account-1"] };
    const account = {
      id: "account-1",
      name: "Savings",
      balance: initialBalance,
      number: "123456",
      transactions: [],
    };
    
    const userRepository = userR([user]);
    const accountRepository = accountR([account]);
    const createdTransaction = {
      id: "transaction-1",
      amount: withdrawalAmount,
      type: "WITHDRAWAL",
    };
    const transactionRepository = transactionR([]);
    
    const transactionRequest: TransactionRequest = {
      userId: user.id,
      amount: createdTransaction.amount,
      type: "WITHDRAWAL",
    };
    
    const expectedResult = {
      amount: createdTransaction.amount,
      type: createdTransaction.type,
    };
    
    // Action
    const result = await createTransaction(transactionRequest, userRepository, transactionRepository, accountRepository);
    const accountResult = await accountRepository.find(account.id);
    
    // Assert
    if (typeof result === "string") return expect(result).toBe(-1);
    expect(result).toEqual(expect.objectContaining(expectedResult));
    expect(accountResult.transactions).toContain(result.id);
    expect(accountResult.balance).toBe(initialBalance - withdrawalAmount);
  });


  test("attempt withdrawal transaction exceeding available balance", async () => {
    // Arrange
    const initialBalance = 1000;
    const withdrawalAmount = 1500;
    
    const user = { id: "1", name: "Jane Smith", auth: [], accounts: ["account-1"] };
    const account = {
      id: "account-1",
      name: "Checking",
      balance: initialBalance,
      number: "789012",
      transactions: [],
    };
    
    const userRepository = userR([user]);
    const accountRepository = accountR([account]);
    const transactionRepository = transactionR([]);
    
    const transactionRequest: TransactionRequest = {
      userId: user.id,
      amount: withdrawalAmount,
      type: "WITHDRAWAL",
    };
    
    // Action
    const result = await createTransaction(transactionRequest, userRepository, transactionRepository, accountRepository);
    
    // Assert
    expect(result).toBe("insufficient funds");
  });
})
