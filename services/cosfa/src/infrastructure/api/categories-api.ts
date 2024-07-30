import { config } from '@packages/shared';
import { createMongoDBClient } from '@packages/mongodb';
import { api, HttpRequest, withDatabaseConnection } from '@packages/api';
import { CategoryModel } from '../schemas/category.schema';
import { categoryRepository } from '../repositories/category.repository';
import { Category } from '../../domain/entities/category.entity';

const { databaseUri } = config();

const client = createMongoDBClient(CategoryModel);
const repository = categoryRepository(client);

const categoriesApi = api();

categoriesApi.register(
  'POST',
  '/categories',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => {
    const category = Category.create({
      ...request.body,
    }) as Category;
    try {
      return repository.createCategory(category);
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
      return repository.getById(request.pathParameters?.id as string);
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
      return repository.getCategories({});
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
      return repository.updateCategory(request.pathParameters?.id as string, {
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
      await repository.deleteCategory(request.pathParameters?.id as string);
    } catch (error) {
      throw error;
    }
  }
);

export const handler = async (input: HttpRequest) => categoriesApi.execute(input);
