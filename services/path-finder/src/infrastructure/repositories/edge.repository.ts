import { MongoDBClient } from '@packages/mongodb';
import { Edge } from '../../domain/entities/edge.entity';
import { EdgeRepository } from '../../domain/repositories/edge.repository';
import { GraphNodeDBModel, mapGraphNode } from './graph-node.repository';

const mapEdge = (edge: Edge & { _id: string }) => {
  return {
    ...edge,
    id: edge._id,
    from: mapGraphNode(edge.from as GraphNodeDBModel),
    target: mapGraphNode(edge.target as GraphNodeDBModel),
  };
};

export const edgeRepositoryBuilder = (client: MongoDBClient): EdgeRepository => ({
  createEdge: async (edge: Edge) => {
    return mapEdge(await client.create(edge, { hydrates: ['from', 'target'] }));
  },
  getEdges: async () => {
    return (await client.getAll({}, { hydrates: ['from', 'target'] })).map(
      (
        item: {
          _id: any;
        } & Edge
      ) => mapEdge(item)
    );
  },
  getById: async (id: string) => {
    const edge = await client.getById(id, { hydrates: ['from', 'target'] });
    if (typeof edge === 'undefined') {
      return;
    }
    return mapEdge(edge);
  },
  updateEdge: async (id: string, edge: Edge) => {
    const updatedEdge = await client.update(id, edge, { hydrates: ['from', 'target'] });
    return mapEdge(updatedEdge);
  },
  deleteEdge: async (id: string) => {
    const edge = await client.getById(id);
    if (typeof edge === 'undefined') {
      return;
    }
    await client.delete(id);
    return edge;
  },
});
