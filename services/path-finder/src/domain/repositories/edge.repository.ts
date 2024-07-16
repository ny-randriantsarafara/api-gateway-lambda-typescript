import { Edge } from '../entities/edge.entity';

export type GetEdges = () => Promise<Edge[]>;
export type GetEdgeById = (id: string) => Promise<Edge | undefined>;
export type CreateEdge = (data: Edge) => Promise<Edge>;
export type UpdateEdge = (id: string, data: Edge) => Promise<Edge | undefined>;
export type DeleteEdge = (id: string) => Promise<void>;

export type EdgeRepository = {
  getEdges: GetEdges;
  createEdge: CreateEdge;
  getById: GetEdgeById;
  updateEdge: UpdateEdge;
  deleteEdge: DeleteEdge;
};
