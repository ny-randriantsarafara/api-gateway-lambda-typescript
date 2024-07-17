import { GetEdgeById } from '../../../domain/repositories/edge.repository';
import { Edge } from '../../../domain/entities/edge.entity';

export const getEdgeByIdUseCase = (getEdge: GetEdgeById) => async (id: string) => {
  const result = await getEdge(id);
  if (typeof result === 'undefined') {
    throw new Error('Edge node not found');
  }
  return Edge.create({ id: result.id, from: result.from, target: result.target, cost: result.cost });
};
