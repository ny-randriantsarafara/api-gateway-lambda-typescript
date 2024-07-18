import { api, HttpRequest, HttpResponse, withDatabaseConnection } from '@packages/api';
import { config } from '@packages/shared';
import { createMongoDBClient } from '@packages/mongodb';
import { EdgeModel } from '../schemas/edge.schema';
import { edgeRepositoryBuilder } from '../repositories/edge.repository';
import { createEdgeUseCase } from '../../application/use-cases/edge/create-edge.use-case';
import { deleteEdgeUseCase } from '../../application/use-cases/edge/delete-edge.use-case';
import { updateEdgeUseCase } from '../../application/use-cases/edge/update-edge.use-case';
import { getEdgesUseCase } from '../../application/use-cases/edge/get-edges.use-case';
import { getEdgeByIdUseCase } from '../../application/use-cases/edge/get-edge-by-id.use-case';
import { GetRoute, osrmRepositoryBuilder } from '../repositories/osrm.repository';
import { builder as httpClientBuilder } from '@packages/http-client';
import { Identifier } from '../../domain/object-values/identifier.type';
import { GetGraphNodeById } from '../../domain/repositories/graph-node.repository';
import { graphNodeRepositoryBuilder } from '../repositories/graph-node.repository';
import { GraphNodeModel } from '../schemas/graph-node.schema';

const edgeApi = api();

const { databaseUri, osrmBaseUrl } = config();
const dbClient = createMongoDBClient(EdgeModel);

const edgeRepository = edgeRepositoryBuilder(dbClient);

const graphNodeRepository = graphNodeRepositoryBuilder(createMongoDBClient(GraphNodeModel));

const httpClient = httpClientBuilder(osrmBaseUrl);

type RouteResponse = {
  code: string;
  distances: number[][];
  destinations: LocationPoint[];
  durations: number[][];
  sources: LocationPoint[];
};

type LocationPoint = {
  hint: string;
  distance: number;
  name: string;
  location: [number, number];
};

const routeRepository = osrmRepositoryBuilder<RouteResponse>(
  httpClient,
  {
    service: 'table',
    version: 'v1',
    profile: 'driving',
  },
  { sources: 0, destinations: 1, annotations: 'distance,duration'}
);

const computeCostUseCase =
  (getGraphNodeById: GetGraphNodeById, getRoute: GetRoute<RouteResponse>) =>
  async (fromNodeID: Identifier, toNodeID: Identifier): Promise<number> => {
    console.log(`Computing distance from ${fromNodeID} to ${toNodeID}`);

    const [fromNode, toNode] = await Promise.all([getGraphNodeById(fromNodeID), getGraphNodeById(toNodeID)]);

    console.log(`From node: ${JSON.stringify(fromNode)}`, `To node: ${JSON.stringify(toNode)}`);

    const {
      distances: [[distance]],
    } = await getRoute({ source: fromNode.coordinates, destination: toNode.coordinates });

    console.log(`Distance: ${distance}`);

    return distance;
  };

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
