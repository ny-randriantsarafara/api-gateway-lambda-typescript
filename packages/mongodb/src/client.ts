import { reader } from './reader';
import { connect, Model } from 'mongoose';
import { MongoDBClient } from './types';
import { writer } from './writer';

export const createMongoDBClient = <T>(model: Model<T>): MongoDBClient => ({
  ...reader(model),
  ...writer(model),
  connect: async (databaseUri: string) => connect(databaseUri),
});
