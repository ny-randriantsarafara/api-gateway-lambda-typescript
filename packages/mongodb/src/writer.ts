import { Model as MongooseModel, UpdateQuery } from 'mongoose';
import { executeQuery, fetchAndThrowIfNotFound } from './utils';

import { QueryOptions } from './types';

export const writer = (Model: MongooseModel<any>): MongoDBWriter => ({
  create: async (data: any, options?: QueryOptions) => {
    try {
      const dbModel = new Model(data);
      const result = await dbModel.save();
      let query = Model.findById(result._id);
      if (options?.hydrates) {
        query = query.populate(options.hydrates);
      }
      return executeQuery(query, 'Document not found after creation');
    } catch (error) {
      console.error('An error occurred while creating document', error);
      throw error;
    }
  },
  createMany: async (data: any[], options?: QueryOptions) => {
    try {
      const result = await Model.insertMany(data);
      let query = Model.find({ _id: { $in: result.map(doc => doc._id) } });
      if (options?.hydrates) {
        query = query.populate(options.hydrates);
      }
      return executeQuery(query, 'Documents not found after creation');
    } catch (error) {
      console.error('An error occurred while creating documents', error);
      throw error;
    }
  },
  update: async (id: string, data: UpdateQuery<any>, options?: QueryOptions) => {
    let dbModel = await fetchAndThrowIfNotFound(Model.findById(id), `Document with id ${id} not found`);
    for (const key in data) {
      dbModel[key] = data[key];
    }
    await dbModel.save();
    let query = Model.findById(id);
    if (options?.hydrates) {
      query = query.populate(options.hydrates);
    }
    return executeQuery(query, `Document with id ${id} not found after update`);
  },
  delete: async (id: string) => {
    const dbModel = await fetchAndThrowIfNotFound(Model.findById(id), `Document with id ${id} not found`);
    await Model.deleteOne({ _id: dbModel._id });
  },
});

export type MongoDBWriter = {
  create: (data: any, options?: QueryOptions) => Promise<any>;
  createMany: (data: any[], options?: QueryOptions) => Promise<any[]>;
  update: (id: string, data: UpdateQuery<any>, options?: QueryOptions) => Promise<any>;
  delete: (id: string) => Promise<void>;
};
