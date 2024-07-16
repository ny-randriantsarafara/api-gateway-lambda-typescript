import { Edge } from '../../../domain/entities/edge.entity';
import { UpdateEdge } from '../../../domain/repositories/edge.repository';

export const updateEdgeUseCase = (updateEdge: UpdateEdge) => async (id: string, input: Edge) => {
  const result = await updateEdge(id, input);
  if (typeof result === 'undefined') {
    throw new Error('Graph node could not be updated.');
  }
  return new Edge(result.id, result.from, result.target, result.cost);
};
