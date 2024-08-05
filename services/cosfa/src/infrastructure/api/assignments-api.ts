import { config } from '@packages/shared';
import { createMongoDBClient } from '@packages/mongodb';
import { api, HttpRequest, withDatabaseConnection } from '@packages/api';
import { AssignmentModel } from '../schemas/assignment.schema';
import { assignmentRepository } from '../repositories/assignment.repository';

const { databaseUri } = config();

const client = createMongoDBClient(AssignmentModel);
const repository = assignmentRepository(client);

const assignmentsApi = api();

assignmentsApi.register(
  'POST',
  '/assignments',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => {
    const data = {
      ...request.body,
      startDate: new Date(request.body.startDate),
      endDate: new Date(request.body.endDate),
    };
    try {
      return repository.create(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

assignmentsApi.register(
  'POST',
  '/assignments/bulk',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => {
    try {
      return repository.createMany(request.body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

assignmentsApi.register(
  'GET',
  '/assignments/{id}',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => {
    try {
      return repository.getById(request.pathParameters?.id as string);
    } catch (error) {
      throw error;
    }
  }
);

assignmentsApi.register(
  'GET',
  '/assignments',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => {
    try {
      console.log(request.queryStringParameters);
      return repository.get(request.queryStringParameters || {});
    } catch (error) {
      throw error;
    }
  }
);

assignmentsApi.register(
  'PUT',
  '/assignments/{id}',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => {
    try {
      return repository.update(request.pathParameters?.id as string, {
        ...request.body,
        startDate: new Date(request.body.startDate),
        endDate: new Date(request.body.endDate),
      });
    } catch (error) {
      throw error;
    }
  }
);

assignmentsApi.register(
  'DELETE',
  '/assignments/{id}',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => {
    try {
      await repository.delete(request.pathParameters?.id as string);
    } catch (error) {
      throw error;
    }
  }
);

export const handler = async (input: HttpRequest) => assignmentsApi.execute(input);
