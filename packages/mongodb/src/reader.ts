import { Model as MongooseModel } from 'mongoose';
import { buildCriteria, executeQuery } from './utils';
import { Criteria, QueryOptions } from './types';

export const reader = (Model: MongooseModel<any>): MongoDBReader => ({
  getById: async (id: string, options?: QueryOptions) => {
    let query = Model.findById(id);
    if (options?.hydrates) {
      query = query.populate(options.hydrates);
    }
    return executeQuery(query, `Document with id ${id} not found`);
  },
  getOne: async (filters: Record<string, any>, options?: QueryOptions) => {
    let query = Model.findOne(filters);
    if (options?.hydrates) {
      query = query.populate(options.hydrates);
    }
    return executeQuery(query, `No document satisfies the query ${JSON.stringify(filters)}`);
  },
  getAll: async <T>(criteria: Criteria<T>, options?: QueryOptions) => {
    const { filters, sort } = buildCriteria(criteria);
    console.log({ filters: JSON.stringify(filters), sort: JSON.stringify(sort) });
    let query = Model.find({});
    if (typeof filters !== 'undefined' && Object.keys(filters).length > 0) {
      query = Model.find(filters);
    }
    if (typeof sort !== 'undefined' && Object.keys(sort).length > 0) {
      query = query.sort(sort);
    }
    if (options?.hydrates) {
      query = query.populate(options.hydrates);
    }
    return executeQuery(query, 'An error occurred while fetching documents');
  },
});

export type MongoDBReader = {
  getById: (id: string, options?: QueryOptions) => Promise<any>;
  getOne: (filters: Record<string, any>, options?: QueryOptions) => Promise<any>;
  getAll: <T>(filters: Criteria<T>, options?: QueryOptions) => Promise<any[]>;
};
