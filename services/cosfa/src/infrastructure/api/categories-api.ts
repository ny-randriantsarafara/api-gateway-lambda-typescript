import { config } from '@packages/shared';
import { createMongoDBClient } from '@packages/mongodb';
import { api, HttpRequest, withDatabaseConnection } from '@packages/api';
import { CategoryModel } from '../schemas/category.schema';
import { categoryRepositoryBuilder } from '../repositories/category.repository';

const { databaseUri } = config();

const client = createMongoDBClient(CategoryModel);
const categoryRepository = categoryRepositoryBuilder(client);

const categoriesApi = api();

categoriesApi.register(
  'POST',
  '/categories',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => {
    try {
      return categoryRepository.createCategory(request.body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

categoriesApi.register(
  'GET',
  '/categories/{id}',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => {
    try {
      return categoryRepository.getById(request.pathParameters?.id as string);
    } catch (error) {
      throw error;
    }
  }
);

categoriesApi.register(
  'GET',
  '/categories',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => {
    try {
      void request;
      return categoryRepository.getCategories({});
    } catch (error) {
      throw error;
    }
  }
);

categoriesApi.register(
  'PUT',
  '/categories/{id}',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => {
    try {
      return categoryRepository.updateCategory(request.pathParameters?.id as string, {
        ...request.body,
      });
    } catch (error) {
      throw error;
    }
  }
);

categoriesApi.register(
  'DELETE',
  '/categories/{id}',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => {
    try {
      await categoryRepository.deleteCategory(request.pathParameters?.id as string);
    } catch (error) {
      throw error;
    }
  }
);

export const handler = async (input: HttpRequest) => categoriesApi.execute(input);
