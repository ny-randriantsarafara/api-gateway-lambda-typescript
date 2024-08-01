import { Model as MongooseModel } from 'mongoose';
import { executeQuery } from './utils';

export type QueryOptions = {
  hydrates?: string[];
};

export type Operator =
  | 'equals'
  | 'startsWith'
  | 'endsWith'
  | 'contains'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEquals'
  | 'lessThanOrEquals';

export type FilterCriteria<T> = {
  [K in keyof T as `${string & K}.${Operator}`]?: string;
};

export type SortCriteria<T> = {
  'sort.field'?: keyof T;
  'sort.direction'?: 'asc' | 'desc';
};

export type Criteria<T> = { filters: FilterCriteria<T> } & { sort: SortCriteria<T> };

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
  getAll: async <T>(filters: Criteria<T>, options?: QueryOptions) => {
    let query = Model.find(filters);
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
