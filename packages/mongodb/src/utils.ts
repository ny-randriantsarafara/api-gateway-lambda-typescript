import {PipelineStage, Query} from 'mongoose';

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

  const setNestedValue = (obj: any, key: string, value: any) => {
    obj[key] = value;
  };

  return Object.entries(rawFilters).reduce((acc, [key, value]) => {
    const keys = key.split('.');
    const operator = keys.pop() as Operator;
    const fieldPath = keys.join('.');

    if (fieldPath.length === 0) {
      console.warn(`Invalid filter key: ${key}`);
      return acc;
    }

    if (operator === 'sort') {
      setNestedValue(acc.sort, fieldPath, value);
      return { ...acc, sort: { ...acc.sort, [fieldPath]: value } };
    }

    const filterOperator = typeof operator !== 'undefined' ? OPERATOR_MAP[operator] : undefined;
    const updatedFilter =
      typeof filterOperator !== 'undefined'
        ? { [fieldPath]: { ...(filterOperator as OperatorHandler)(fieldPath, value) } }
        : value;

    return { ...acc, filters: { ...acc.filters, ...updatedFilter } };
  }, initialCriteria);
};

export const generatePipeline = (fields: string[]): PipelineStage[] => {
  const groupStage: Record<string, any> = { _id: null };
  const projectStage: Record<string, any> = { _id: 0 };

  fields.forEach(field => {
    const fieldParts = field.split('.');
    let currentGroup: Record<string, any> = groupStage;
    let currentProject: Record<string, any> = projectStage;

    fieldParts.forEach((part, index) => {
      if (index === fieldParts.length - 1) {
        if (fieldParts.length > 1) {
          currentGroup.$addToSet = currentGroup.$addToSet || {};
          currentGroup.$addToSet[part] = `$${field}`;
        } else {
          currentGroup[part] = { $addToSet: `$${field}` };
        }
        currentProject[part] = 1;
      } else {
        currentGroup[part] = currentGroup[part] || {};
        currentProject[part] = currentProject[part] || {};
        currentGroup = currentGroup[part];
        currentProject = currentProject[part];
      }
    });
  });

  return [{ $group: groupStage }, { $project: projectStage }];
};

export const parseNestedFields = (data: Record<string, any>) => {
  const parsedData: Record<string, any> = {};

  Object.keys(data).forEach(key => {
    if (Array.isArray(data[key]) && data[key].length > 0 && typeof data[key][0] === 'object') {
      const nestedFields: Record<string, Set<string>> = {};

      data[key].forEach(item => {
        Object.keys(item).forEach((nestedKey: string) => {
          if (!nestedFields[nestedKey]) {
            nestedFields[nestedKey] = new Set();
          }
          if (item[nestedKey]) {
            nestedFields[nestedKey].add(item[nestedKey]);
          }
        });
      });

      // Convert sets to arrays and assign to parsedData
      parsedData[key] = {};
      Object.keys(nestedFields).forEach(nestedKey => {
        parsedData[key][nestedKey] = Array.from(nestedFields[nestedKey]);
      });
    } else {
      parsedData[key] = data[key];
    }
  });

  return parsedData;
};
