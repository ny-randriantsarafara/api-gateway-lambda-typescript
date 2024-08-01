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
    // Handle sort criteria
    if (key.startsWith('sort.')) {
      const sortKey = key.split('.')[1];
      if (typeof sortKey === 'undefined') {
        console.warn(`Invalid sort key: ${key}`);
        return acc;
      }
      acc.sort[sortKey] = value;
      return acc;
    }

    // Handle filter criteria
    const [field, operator] = key.split('.');
    if (typeof field === 'undefined' || typeof operator === 'undefined') {
      console.warn(`Invalid filter key: ${key}`);
      return acc;
    }

    if (!acc.filters[field]) {
      acc.filters[field] = {};
    }

    acc.filters[field][`${operator}`] = value;
    return acc;
  }, initialCriteria);
};
