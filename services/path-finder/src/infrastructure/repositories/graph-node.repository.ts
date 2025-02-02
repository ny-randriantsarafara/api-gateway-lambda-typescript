import { MongoDBClient } from '@packages/mongodb';
import { GraphNode } from '../../domain/entities/graph-node.entity';
import { GraphNodeRepository } from '../../domain/repositories/graph-node.repository';

export type GraphNodeDBModel = GraphNode & { _id: string; location: { type: string; coordinates: [number, number] } };

export const mapGraphNode = (graphNode: GraphNodeDBModel) => {
  return {
    id: graphNode._id,
    name: graphNode.name,
    coordinates: graphNode.location.coordinates,
    neighbors: graphNode.neighbors,
  };
};

export const graphNodeRepositoryBuilder = (client: MongoDBClient): GraphNodeRepository => ({
  createGraphNode: async (graphNode: GraphNode) => {
    const { coordinates, ...rest } = graphNode;
    return mapGraphNode(await client.create({ ...rest, location: { type: 'Point', coordinates } }));
  },
  getGraphNodes: async () => {
    return (await client.getAll({})).map((item: GraphNodeDBModel) => mapGraphNode(item));
  },
  getById: async (id: string) => {
    console.log(`Getting graph node by id = ${id}`);
    const graphNode = await client.getById(id);
    return mapGraphNode(graphNode);
  },
  updateGraphNode: async (id: string, graphNode: GraphNode) => {
    const { coordinates, ...rest } = graphNode;
    await client.update(id, { ...rest, location: { type: 'Point', coordinates } });
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
