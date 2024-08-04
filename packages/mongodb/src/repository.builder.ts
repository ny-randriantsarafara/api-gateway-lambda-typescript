import { MongoDBClient } from '@packages/mongodb';
import { mapDBModel } from './utils';

export const repositoryBuilder = <T>(client: MongoDBClient) => ({
  create: async (entity: Partial<T>) => {
    const created = await client.create(entity);
    return mapDBModel(created);
  },
  get: async (criteria: Record<string, any>) => {
    console.log({ criteria, });
    const entities = await client.getAll<T>(criteria);
    const count = await client.getCount(criteria);
    const mappedEntities = entities.map((item: T & { _id: string }) => mapDBModel(item));
    return { data: mappedEntities, count };
  },
  getFiltersValues: async (filterFields: string[]) => {
    return await client.getFiltersValues(filterFields);
  },
  getById: async (id: string) => {
    const entity = await client.getById(id);
    return mapDBModel(entity);
  },
  update: async (id: string, entity: any) => {
    const updated = await client.update(id, entity);
    return mapDBModel(updated);
  },
  delete: async (id: string) => {
    const entity = await client.getById(id);
    await client.delete(id);
    return entity;
  },
});
