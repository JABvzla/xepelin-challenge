import { describe, beforeEach, expect, test } from "@jest/globals"
import { Repository } from "../domain/generics"
import { memoryRepositoryFactory } from "../infrastructure/memory-repository"

// Mocked data and models for testing
interface TestModel {
  id: string
  name: string
}


describe("memoryRepositoryFactory", () => {
  let repository: Repository<TestModel>
  const initialTestData: TestModel[] = [
    { id: "1", name: "Model 1" },
    { id: "2", name: "Model 2" },
  ]

  beforeEach(() => {
    repository = memoryRepositoryFactory<TestModel>(initialTestData)
  })

  test("create and find", async () => {
    // Arrange
    const newModel = { name: "New Model" }
    // Action
    const createdModel = await repository.create(newModel)
    const foundModel = await repository.find(createdModel.id)
    // Assert
    expect(createdModel).toEqual(expect.objectContaining(newModel))
    expect(foundModel).toEqual(createdModel)
  })

  test("update", async () => {
    // Arrange
    const modelToUpdate = initialTestData[0]
    const updatedModelData = { name: "Updated Model" }
    // Action
    const updatedModel = await repository.update(modelToUpdate.id, updatedModelData)
    const foundModel = await repository.find(modelToUpdate.id)
    // Assert
    expect(updatedModel).toEqual(expect.objectContaining(updatedModelData))
    expect(foundModel).toEqual(expect.objectContaining(updatedModelData))
    expect(foundModel.id).toEqual(modelToUpdate.id)
  })

  test("delete", async () => {
    // Arrange
    const modelToDelete = initialTestData[0]
    // Action
    await repository.delete(modelToDelete.id)
    try {
      await repository.find(modelToDelete.id)
    } catch (error) {
    // Assert
      expect(error).toMatch(`Id ${modelToDelete.id} Not Found`)
    }
  })

  test("getAll", async () => {
    // Arrange
    const repositoryFull = memoryRepositoryFactory<TestModel>(initialTestData)
    // Action
    const allModels = await repositoryFull.getAll()
    // Assert
    expect(allModels).toHaveLength(initialTestData.length)
  })
})
