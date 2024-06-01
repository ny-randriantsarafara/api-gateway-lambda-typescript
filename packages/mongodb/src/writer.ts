import { Model as MongooseModel, UpdateQuery } from 'mongoose';
import { fetchAndThrowIfNotFound } from './utils';

export const writer = <T>(Model: MongooseModel<T>) => ({
  create: async (data: T) => {
    try {
      const dbModel = new Model(data);
      const result = await dbModel.save();
      return result.toJSON();
    } catch (error) {
      console.error('An error occurred while creating document', error);
      throw error;
    }
  },
  update: async (id: string, data: UpdateQuery<T>) => {
    const dbModel = await fetchAndThrowIfNotFound(Model.findById(id), `Document with id ${id} not found`);
    for (const key in data) {
      dbModel[key] = data[key];
    }
    return dbModel.save();

  },
  delete: async (id: string) => {
    const dbModel = await fetchAndThrowIfNotFound(Model.findById(id), `Document with id ${id} not found`);
    await Model.deleteOne({ _id: dbModel._id });
  },
});

export type MongoDBWriter<T> = ReturnType<typeof writer>;
