import { api, HttpRequest, HttpResponse, withDatabaseConnection } from '@packages/api';
import { config } from '@packages/shared';
import { createMongoDBClient } from '@packages/mongodb';
import { builder as httpClientBuilder } from '@packages/http-client';
import { EdgeModel } from '../schemas/edge.schema';
import { GraphNodeModel } from '../schemas/graph-node.schema';
import { edgeRepositoryBuilder } from '../repositories/edge.repository';
import { createEdgeUseCase } from '../../application/use-cases/edge/create-edge.use-case';
import { deleteEdgeUseCase } from '../../application/use-cases/edge/delete-edge.use-case';
import { updateEdgeUseCase } from '../../application/use-cases/edge/update-edge.use-case';
import { getEdgesUseCase } from '../../application/use-cases/edge/get-edges.use-case';
import { getEdgeByIdUseCase } from '../../application/use-cases/edge/get-edge-by-id.use-case';
import { osrmRepositoryBuilder } from '../repositories/osrm.repository';
import { graphNodeRepositoryBuilder } from '../repositories/graph-node.repository';
import { computeCostUseCase } from '../../application/use-cases/edge/compute-cost.use-case';
import { RouteResponse } from '../../application/use-cases/edge/compute-cost.use-case.types';

const edgeApi = api();

const { databaseUri, osrmBaseUrl } = config();

const dbClient = createMongoDBClient(EdgeModel);
const edgeRepository = edgeRepositoryBuilder(dbClient);

const graphNodeRepository = graphNodeRepositoryBuilder(createMongoDBClient(GraphNodeModel));

const httpClient = httpClientBuilder(osrmBaseUrl);
const routeRepository = osrmRepositoryBuilder<RouteResponse>(
  httpClient,
  {
    service: 'table',
    version: 'v1',
    profile: 'driving',
  },
  { sources: 0, destinations: 1, annotations: 'distance,duration' }
);

edgeApi.register('POST', '/edges', withDatabaseConnection(dbClient.connect, databaseUri), async request => {
  console.log('Payload = ', request.body);

  const cost = await computeCostUseCase(graphNodeRepository.getById, routeRepository.getRoute)(
    request.body.from,
    request.body.target
  );

  return createEdgeUseCase(edgeRepository.createEdge)({ ...request.body, cost });
});

edgeApi.register('PUT', '/edges/{id}', withDatabaseConnection(dbClient.connect, databaseUri), async request => {
  console.log('Payload = ', request.body);

  const cost = await computeCostUseCase(graphNodeRepository.getById, routeRepository.getRoute)(
    request.body.from,
    request.body.target
  );

  return updateEdgeUseCase(edgeRepository.updateEdge)(request.pathParameters?.id as string, { ...request.body, cost });
});

edgeApi.register('GET', '/edges', withDatabaseConnection(dbClient.connect, databaseUri), async request => {
  return getEdgesUseCase(edgeRepository.getEdges)();
});

edgeApi.register('GET', '/edges/{id}', withDatabaseConnection(dbClient.connect, databaseUri), async request => {
  return getEdgeByIdUseCase(edgeRepository.getById)(request.pathParameters?.id as string);
});

edgeApi.register('DELETE', '/edges/{id}', withDatabaseConnection(dbClient.connect, databaseUri), async request => {
  return deleteEdgeUseCase(edgeRepository.deleteEdge)(request.pathParameters?.id as string);
});

export const handler = async (event: HttpRequest): Promise<HttpResponse> => edgeApi.execute(event);
