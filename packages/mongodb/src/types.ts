import { MongoDBWriter } from './writer';
import { MongoDBReader } from './reader';

export type MongoDBClient = MongoDBReader &
  MongoDBWriter & {
    connect: (databaseUri: string) => any;
  };

export type QueryOptions = {
  hydrates?: string[];
};

type FilterOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'exists' | 'search';

type SortOperator = 'sort';

export type Operator = FilterOperator & SortOperator;

export type FilterCriteria<T> = {
  [K in keyof T]?: string | number | boolean | Array<any> | Record<Operator, string | number | boolean | Array<any>>;
};

export type SortCriteria<T> = {
  [key in keyof T]?: any;
};

export type PaginationCriteria = {
  limit?: number;
  page?: number;
};

export type Criteria<T> = { filters: FilterCriteria<T> } & { sort: SortCriteria<T> } & {
  pagination: PaginationCriteria;
};
export type OperatorHandler = (value: any) => any;
