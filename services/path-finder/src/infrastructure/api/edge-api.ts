import { api, HttpRequest, HttpResponse, withDatabaseConnection } from '@packages/api';
import { config } from '@packages/shared';
import { createMongoDBClient } from '@packages/mongodb';
import { EdgeModel } from '../schemas/edge.schema';
import { edgeRepository } from '../repositories/edge.repository';
import { createEdgeUseCase } from '../../application/use-cases/edge/create-edge.use-case';
import { deleteEdgeUseCase } from '../../application/use-cases/edge/delete-edge.use-case';
import { updateEdgeUseCase } from '../../application/use-cases/edge/update-edge.use-case';
import { getEdgesUseCase } from '../../application/use-cases/edge/get-edges.use-case';
import { getEdgeByIdUseCase } from '../../application/use-cases/edge/get-edge-by-id.use-case';

const edgeApi = api();

const { databaseUri } = config();
const dbClient = createMongoDBClient(EdgeModel);

const repository = edgeRepository(dbClient);

edgeApi.register('POST', '/edges', withDatabaseConnection(dbClient.connect, databaseUri), async request => {
  return createEdgeUseCase(repository.createEdge)(request.body);
});

edgeApi.register('PUT', '/edges/{id}', withDatabaseConnection(dbClient.connect, databaseUri), async request => {
  console.log({ pathParameters: request.pathParameters, body: request.body });
  return updateEdgeUseCase(repository.updateEdge)(request.pathParameters?.id as string, request.body);
});

edgeApi.register('GET', '/edges', withDatabaseConnection(dbClient.connect, databaseUri), async request => {
  return getEdgesUseCase(repository.getEdges)();
});

edgeApi.register('GET', '/edges/{id}', withDatabaseConnection(dbClient.connect, databaseUri), async request => {
  return getEdgeByIdUseCase(repository.getById)(request.pathParameters?.id as string);
});

edgeApi.register('DELETE', '/edges/{id}', withDatabaseConnection(dbClient.connect, databaseUri), async request => {
  return deleteEdgeUseCase(repository.deleteEdge)(request.pathParameters?.id as string);
});

export const handler = async (event: HttpRequest): Promise<HttpResponse> => edgeApi.execute(event);
