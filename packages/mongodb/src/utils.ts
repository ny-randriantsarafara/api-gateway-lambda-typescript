import { Query } from 'mongoose';

export const fetchAndThrowIfNotFound = async (operation: Promise<Query<any, any> | null>, message: string) => {
  const result = await operation;
  if (!result) {
    throw new Error(message);
  }
  return result;
};