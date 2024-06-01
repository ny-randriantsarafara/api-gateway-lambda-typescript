import { Connect, HttpRequest } from './types';

export const withDatabaseConnection = (connect: Connect, databaseUri: string) => async (input: HttpRequest) => {
  const connection = await connect(databaseUri);
  return { ...input, connection };
};
