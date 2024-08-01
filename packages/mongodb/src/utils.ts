import { Query } from 'mongoose';
import { Criteria } from './reader';

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

export const buildCriteria = <T>(rawFilters: Record<string, any>): Criteria<T> => {
  const initialCriteria: Criteria<T> = { filters: {}, sort: {} };

  return Object.entries(rawFilters).reduce((acc, [key, value]) => {
    const [field, operator] = key.split('.') as [keyof T, string];

    if (!field) {
      console.warn(`Invalid filter key: ${key}`);
      return acc;
    }

    if (operator === 'sort') {
      // Handle sort criteria
      return { ...acc, sort: { ...acc.sort, [field]: value } };
    }

    // Handle filter criteria
    const existingFilter = (acc.filters[field] as Record<string, any>) || {};
    const filterOperator = operator ? `$${operator}` : undefined;
    const updatedFilter = filterOperator ? { ...existingFilter, [filterOperator]: value } : value;

    return {
      ...acc,
      filters: {
        ...acc.filters,
        [field]: updatedFilter,
      },
    };
  }, initialCriteria);
};
