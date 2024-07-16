import { UpdateGraphNode } from '../../../domain/repositories/graph-node.repository';
import { GraphNode } from '../../../domain/entities/graph-node.entity';

export const updateGraphNodeUseCase = (updateGraphNode: UpdateGraphNode) => async (id: string, data: GraphNode) => {
  const result = await updateGraphNode(id, data);
  if (typeof result === 'undefined') {
    throw new Error('Graph node could not be updated.');
  }
  return new GraphNode(result.id, result.name, result.neighbors);
};
