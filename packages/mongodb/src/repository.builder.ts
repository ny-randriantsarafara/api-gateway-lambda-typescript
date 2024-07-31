import { MongoDBClient } from '@packages/mongodb';

const map = <T extends { _id: string }>(entity: T) => ({
  ...entity,
  id: entity._id,
});

export const repositoryBuilder = <T>(client: MongoDBClient) => ({
  create: async (entity: Partial<T>) => {
    const created = await client.create(entity);
    return map(created);
  },
  get: async () => {
    const entities = await client.getAll({});
    return entities.map((item: T & { _id: string }) => map(item));
  },
  getById: async (id: string) => {
    const entity = await client.getById(id);
    return map(entity);
  },
  update: async (id: string, entity: any) => {
    const updated = await client.update(id, entity);
    return map(updated);
  },
  delete: async (id: string) => {
    const entity = await client.getById(id);
    await client.delete(id);
    return entity;
  },
});
