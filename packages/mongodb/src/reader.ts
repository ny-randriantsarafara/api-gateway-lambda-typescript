import { Model as MongooseModel } from 'mongoose';
import { buildCriteria, executeQuery, generatePipeline, parseNestedFields } from './utils';
import { QueryOptions } from './types';

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
  getAll: (criteria: Record<string, any>, options?: QueryOptions) => {
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
  getFiltersValues: async (fields: string[]): Promise<Record<string, any>> => {
    const pipeline = generatePipeline(fields);
    const [filterValues] = await Model.aggregate(pipeline).exec();
    return parseNestedFields(filterValues);
  },
  getCount: async <T>(criteria: Record<string, any>): Promise<number> => {
    const { filters } = buildCriteria(criteria);
    return Model.countDocuments(filters).exec();
  },
});

export type MongoDBReader = {
  getById: (id: string, options?: QueryOptions) => Promise<any>;
  getOne: (filters: Record<string, any>, options?: QueryOptions) => Promise<any>;
  getAll: <T>(criteria: Record<string, any>, options?: QueryOptions) => Promise<any[]>;
  getFiltersValues: (fields: string[]) => Promise<Record<string, any>>;
  getCount: <T>(criteria: Record<string, any>) => Promise<number>;
};
