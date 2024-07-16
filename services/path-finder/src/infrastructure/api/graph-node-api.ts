import { api, HttpRequest, HttpResponse, withDatabaseConnection } from '@packages/api';
import { config } from '@packages/shared';
import { createMongoDBClient } from '@packages/mongodb';

import { GraphNodeModel } from '../schemas/graph-node.schema';
import { graphNodeRepository } from '../repositories/graph-node.repository';
import { createGraphNodeUseCase } from '../../application/use-cases/graph-node/create-graph-node.use-case';

const graphNodeApi = api();

const { databaseUri } = config();
const dbClient = createMongoDBClient(GraphNodeModel);

const repository = graphNodeRepository(dbClient);

graphNodeApi.register('POST', '/graph-nodes', withDatabaseConnection(dbClient.connect, databaseUri), async request => {
  return createGraphNodeUseCase(repository.createGraphNode)(request.body);
});

export const handler = async (event: HttpRequest): Promise<HttpResponse> => graphNodeApi.execute(event);
