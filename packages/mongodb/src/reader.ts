import { Model as MongooseModel } from 'mongoose';
import { fetchAndThrowIfNotFound } from './utils';

export const reader = <T>(Model: MongooseModel<T>) => ({
  getById: async (id: string) => {
    const dbModel = await fetchAndThrowIfNotFound(Model.findById(id), `Document with id ${id} not found`);
    return dbModel.toJSON();
  },
  getOne: async (filters: Record<string, any>) => {
    const dbModel = await fetchAndThrowIfNotFound(Model.findOne(filters), `No document satisfies the query ${JSON.stringify(filters)}`);
    return dbModel.toJSON();
  },
  getAll: async (filters: Record<string, any>) => {
    try {
      const dbModels = await Model.find(filters);
      return dbModels.map(model => model.toJSON());
    } catch (error) {
      console.error('An error occurred while fetching documents', error);
      throw error;
    }
  },
});

export type MongoDBReader<T> = ReturnType<typeof reader>;
