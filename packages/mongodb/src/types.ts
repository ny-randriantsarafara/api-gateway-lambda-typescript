import { MongoDBWriter } from './writer';
import { MongoDBReader } from './reader';

export type MongoDBClient = MongoDBReader & MongoDBWriter & {
  connect: (databaseUri: string) => any
};
