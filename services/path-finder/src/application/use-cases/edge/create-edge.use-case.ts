import { CreateEdge } from '../../../domain/repositories/edge.repository';
import { Edge } from '../../../domain/entities/edge.entity';

export const createEdgeUseCase = (createEdge: CreateEdge) => async (input: Edge) => {
  const result = await createEdge(input);
  return new Edge(result.id, result.from, result.target, result.cost);
};
