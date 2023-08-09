import { Repository } from '../../../../domain/generics';
import { Document, Model } from 'mongoose';

export function mongooseRepository<T>(model: Model<Document>): Repository<T> {
  const setId = (model) => ({
    ...model._doc,
    id: model._doc._id.toString(),
    _id: undefined,
  });
  return {
    async create(data: T): Promise<T> {
      const createdDocument = await model.create(data);
      return setId(createdDocument) as T;
    },
    async update(id: string, data: Partial<T>): Promise<T | null> {
      const updatedDocument = await model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return setId(updatedDocument) as T | null;
    },
    async delete(id: string): Promise<void> {
      await model.findByIdAndDelete(id);
    },
    async getAll(): Promise<T[]> {
      const documents = await model.find();
      return documents.map((model) => setId(model)) as T[];
    },
    async find(id: string): Promise<T | null> {
      const document = await model.findById(id);
      return setId(document) as T | null;
    },
  };
}
