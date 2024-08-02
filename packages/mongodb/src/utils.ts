import { Query } from 'mongoose';

import { Criteria, Operator, OperatorHandler } from './types';

export const fetchAndThrowIfNotFound = async (operation: Promise<Query<any, any> | null>, message: string) => {
  const result = await operation;
  if (!result) {
    throw new Error(message);
  }
  return result;
};

export const executeQuery = async <T>(query: any, errorMessage: string) => {
  try {
    const result = await query;
    console.log(result);
    if (!result) {
      throw new Error(errorMessage);
    }
    return Array.isArray(result) ? result.map(model => model.toJSON()) : result.toJSON();
  } catch (error) {
    console.error(errorMessage, error);
    throw error;
  }
};

export const mapDBModel = <T extends { _id: string }>(entity: T) => ({
  ...entity,
  id: entity._id,
});

const OPERATOR_MAP: Record<Operator, OperatorHandler> = {
  eq: (field: string, value: any) => ({ [`$eq`]: value }),
  ne: (field: string, value: any) => ({ [`$ne`]: value }),
  gt: (field: string, value: any) => ({ [`$gt`]: value }),
  gte: (field: string, value: any) => ({ [`$gte`]: value }),
  lt: (field: string, value: any) => ({ [`$lt`]: value }),
  lte: (field: string, value: any) => ({ [`$lte`]: value }),
  exists: (field: string, value: any) => ({ [`$exists`]: value }),
  search: (field: string, value: any) => ({
    $regex: new RegExp(value, 'i'),
  }),
};

export const buildCriteria = <T>(rawFilters: Record<string, any>): Criteria<T> => {
  const initialCriteria: Criteria<T> = { filters: {}, sort: {} };

  return Object.entries(rawFilters).reduce((acc, [key, value]) => {
    const [field, operator] = key.split('.') as [keyof T, Operator];

    if (typeof field === 'undefined') {
      console.warn(`Invalid filter key: ${key}`);
      return acc;
    }

    if (operator === 'sort') {
      // Handle sort criteria
      return { ...acc, sort: { ...acc.sort, [field]: value } };
    }

    // Handle filter criteria
    const existingFilter = (acc.filters[field] as Record<string, any>) || {};
    const filterOperator = typeof operator !== 'undefined' ? OPERATOR_MAP[operator] : undefined;
    const updatedFilter =
      typeof filterOperator !== 'undefined'
        ? { ...existingFilter, ...(filterOperator as OperatorHandler)(field.toString(), value) }
        : value;

    return {
      ...acc,
      filters: {
        ...acc.filters,
        [field]: updatedFilter,
      },
    };
  }, initialCriteria);
};
