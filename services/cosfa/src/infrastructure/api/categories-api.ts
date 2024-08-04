import { config } from '@packages/shared';
import { createMongoDBClient } from '@packages/mongodb';
import { api, HttpRequest, withDatabaseConnection } from '@packages/api';
import { CategoryModel } from '../schemas/category.schema';
import { categoryRepository } from '../repositories/category.repository';

const { databaseUri } = config();

const client = createMongoDBClient(CategoryModel);
const repository = categoryRepository(client);

const categoriesApi = api();

categoriesApi.register(
  'POST',
  '/categories',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => {
    try {
      return repository.create(request.body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);

categoriesApi.register(
  'GET',
  '/categories/{id}',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => {
    try {
      return repository.getById(request.pathParameters?.id as string);
    } catch (error) {
      throw error;
    }
  },
);

categoriesApi.register(
  'GET',
  '/categories',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => {
    try {
      return repository.get(request.queryStringParameters || {});
    } catch (error) {
      throw error;
    }
  },
);

categoriesApi.register(
  'GET',
  '/categories/filters-values',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) =>
    repository.getFiltersValues((request.queryStringParameters?.fields?.split(',') || []) as string[]),
);

categoriesApi.register(
  'PUT',
  '/categories/{id}',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => {
    try {
      return repository.update(request.pathParameters?.id as string, {
        ...request.body,
      });
    } catch (error) {
      throw error;
    }
  },
);

categoriesApi.register(
  'DELETE',
  '/categories/{id}',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => {
    try {
      await repository.delete(request.pathParameters?.id as string);
    } catch (error) {
      throw error;
    }
  },
);

export const handler = async (input: HttpRequest) => categoriesApi.execute(input);
