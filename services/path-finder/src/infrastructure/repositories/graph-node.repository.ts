import { MongoDBClient } from '@packages/mongodb';
import { GraphNode } from '../../domain/entities/graph-node.entity';
import { GraphNodeRepository } from '../../domain/repositories/graph-node.repository';

const removeId = ({ _id, ...graphNode }: GraphNode & { _id: any }) => graphNode;

export const graphNodeRepository = (client: MongoDBClient<GraphNode>): GraphNodeRepository => ({
  createGraphNode: async (graphNode: GraphNode) => {
    return removeId(await client.create(graphNode));
  },
  getGraphNodes: async () => {
    return (await client.getAll()).map((item: { _id: any } & GraphNode) => removeId(item));
  },
  getById: async (id: string) => {
    const graphNode = await client.getOne({ id });
    if (typeof graphNode === 'undefined') {
      return;
    }
    return removeId(graphNode);
  },
  updateGraphNode: async (id: string, graphNode: GraphNode) => {
    const existingGraphNode = await client.getOne({ id });
    if (typeof existingGraphNode === 'undefined') {
      return;
    }
    await client.update(existingGraphNode._id, graphNode);
    const updatedGraphNode = await client.getOne({ id });
    return removeId(updatedGraphNode);
  },
  deleteGraphNode: async (id: string) => {
    const graphNode = await client.getOne({ id });
    if (typeof graphNode === 'undefined') {
      return;
    }
    await client.delete(graphNode._id);
    return graphNode;
  },
});
