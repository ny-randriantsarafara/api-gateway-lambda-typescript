import { MongoDBClient } from '@packages/mongodb';
import { Edge } from '../../domain/entities/edge.entity';
import { EdgeRepository } from '../../domain/repositories/edge.repository';

const mapEdge = (edge: Edge & { _id: string }) => ({ ...edge, id: edge._id });

export const edgeRepository = (client: MongoDBClient<Edge>): EdgeRepository => ({
  createEdge: async (edge: Edge) => {
    return mapEdge(await client.create(edge));
  },
  getEdges: async () => {
    return (await client.getAll()).map((item: { _id: any } & Edge) => mapEdge(item));
  },
  getById: async (id: string) => {
    const edge = await client.getById(id);
    if (typeof edge === 'undefined') {
      return;
    }
    return mapEdge(edge);
  },
  updateEdge: async (id: string, edge: Edge) => {
    await client.update(id, edge);
    const updatedEdge = await client.getById(id);
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
