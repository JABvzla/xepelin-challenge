export type Id = string
export type USD = number
export type Date = string

export interface Repository<T> {
  create: (data) => Promise<T>
  update: (id, data) => Promise<T>
  delete: (id) => Promise<void>
  getAll: () => Promise<T[]>
  find: (id) => Promise<T>
}
