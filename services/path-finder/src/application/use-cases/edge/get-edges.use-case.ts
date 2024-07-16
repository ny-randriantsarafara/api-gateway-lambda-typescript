import { GetEdges } from '../../../domain/repositories/edge.repository';
import { Edge } from '../../../domain/entities/edge.entity';

export const getEdgesUseCase = (getEdges: GetEdges) => async () => {
  const result = await getEdges();
  return result.map(edge => new Edge(edge.id, edge.from, edge.target, edge.cost));
};
