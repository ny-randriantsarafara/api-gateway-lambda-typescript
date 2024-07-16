import { MongoDBClient } from '@packages/mongodb';
import { GraphNode } from '../../domain/entities/graph-node.entity';
import { GraphNodeRepository } from '../../domain/repositories/graph-node.repository';

const mapGraphNode = (graphNode: GraphNode & { _id: string }) => ({ ...graphNode, id: graphNode._id });

export const graphNodeRepository = (client: MongoDBClient<GraphNode>): GraphNodeRepository => ({
  createGraphNode: async (graphNode: GraphNode) => {
    return mapGraphNode(await client.create(graphNode));
  },
  getGraphNodes: async () => {
    return (await client.getAll()).map((item: { _id: any } & GraphNode) => mapGraphNode(item));
  },
  getById: async (id: string) => {
    const graphNode = await client.getById(id);
    if (typeof graphNode === 'undefined') {
      return;
    }
    return mapGraphNode(graphNode);
  },
  updateGraphNode: async (id: string, graphNode: GraphNode) => {
    await client.update(id, graphNode);
    const updatedGraphNode = await client.getById(id);
    return mapGraphNode(updatedGraphNode);
  },
  deleteGraphNode: async (id: string) => {
    const graphNode = await client.getById(id);
    if (typeof graphNode === 'undefined') {
      return;
    }
    await client.delete(id);
    return graphNode;
  },
});
