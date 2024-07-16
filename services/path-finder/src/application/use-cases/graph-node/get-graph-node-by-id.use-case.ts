import { GetGraphNodeById } from '../../../domain/repositories/graph-node.repository';
import { GraphNode } from '../../../domain/entities/graph-node.entity';

export const getGraphNodeByIdUseCase = (getGraphNode: GetGraphNodeById) => async (id: string) => {
  const result = await getGraphNode(id);
  if (typeof result === 'undefined') {
    throw new Error('Graph node not found');
  }
  return new GraphNode(result.id, result.name, result.neighbors);
};
