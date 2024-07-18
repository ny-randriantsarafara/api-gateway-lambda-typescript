import { MongoDBWriter } from './writer';
import { MongoDBReader } from './reader';

export type MongoDBClient<T> = MongoDBReader<T> & MongoDBWriter<T> & {
  connect: (databaseUri: string) => any
};
