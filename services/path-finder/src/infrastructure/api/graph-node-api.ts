import { api, HttpRequest, HttpResponse, withDatabaseConnection } from '@packages/api';
import { config } from '@packages/shared';
import { createMongoDBClient } from '@packages/mongodb';

import { GraphNodeModel } from '../schemas/graph-node.schema';
import { graphNodeRepository } from '../repositories/graph-node.repository';
import { createGraphNodeUseCase } from '../../application/use-cases/graph-node/create-graph-node.use-case';
import { getGraphNodesUseCase } from '../../application/use-cases/graph-node/get-graph-nodes.use-case';
import { getGraphNodeByIdUseCase } from '../../application/use-cases/graph-node/get-graph-node-by-id.use-case';
import { updateGraphNodeUseCase } from '../../application/use-cases/graph-node/update-graph-node.use-case';

const graphNodeApi = api();

const { databaseUri } = config();
const dbClient = createMongoDBClient(GraphNodeModel);

const repository = graphNodeRepository(dbClient);

graphNodeApi.register('POST', '/graph-nodes', withDatabaseConnection(dbClient.connect, databaseUri), async request => {
  return createGraphNodeUseCase(repository.createGraphNode)(request.body);
});

graphNodeApi.register(
    'PUT',
    '/graph-nodes/{id}',
    withDatabaseConnection(dbClient.connect, databaseUri),
    async request => {
        console.log({ pathParameters: request.pathParameters, body: request.body });
        return updateGraphNodeUseCase(repository.updateGraphNode)(request.pathParameters?.id as string, request.body);
    }
);

graphNodeApi.register('GET', '/graph-nodes', withDatabaseConnection(dbClient.connect, databaseUri), async request => {
  return getGraphNodesUseCase(repository.getGraphNodes)();
});

graphNodeApi.register(
  'GET',
  '/graph-nodes/{id}',
  withDatabaseConnection(dbClient.connect, databaseUri),
  async request => {
    return getGraphNodeByIdUseCase(repository.getById)(request.pathParameters?.id as string);
  }
);

export const handler = async (event: HttpRequest): Promise<HttpResponse> => graphNodeApi.execute(event);
