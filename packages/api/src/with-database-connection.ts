import { Connect, HttpRequest } from './types';

export const withDatabaseConnection = <T>(connect: Connect<T>, databaseUri: string) => async (input: HttpRequest) => {
  const connection = await connect(databaseUri);
  return { ...input, connection };
};
