import { Id, Repository } from "../domain/generics"

const MODEL_NOT_FOUND = (id) => `Id ${id} Not Found`

type Model<T> = T & { id: Id }
export function memoryRepositoryFactory<T>(initialData: Model<T>[] = []): Repository<T> {
  const data = initialData
  const newId = (): Id => Math.floor(Math.random() * Date.now()).toString(36);
  const findIndex = (id: Id) => {
    const indx = data.findIndex((model) => model.id === id)
    if (indx === -1) throw MODEL_NOT_FOUND(id)
    return indx
  }
  return {
    async create(model: T) {
      const newModel = { ...model, id: newId() }
      data.push(newModel)
      return newModel
    },
    async update(id, newData) {
      const indx = findIndex(id)
      data[indx] = { id, ...newData }
      return data[indx]
    },
    async delete(id: Id) {
      data.splice(findIndex(id), 1)
    },
    async find(id: Id) {
      return data[findIndex(id)]
    },
    async getAll() {
      return data
    },
  }
}
