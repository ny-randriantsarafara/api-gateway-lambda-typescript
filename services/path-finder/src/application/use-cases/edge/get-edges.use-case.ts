import { GetEdges } from '../../../domain/repositories/edge.repository';
import { Edge } from '../../../domain/entities/edge.entity';

export const getEdgesUseCase = (getEdges: GetEdges) => async () => {
  const result = await getEdges();
  return result.map(edge => Edge.create({ id: edge.id, from: edge.from, target: edge.target, cost: edge.cost }));
};
