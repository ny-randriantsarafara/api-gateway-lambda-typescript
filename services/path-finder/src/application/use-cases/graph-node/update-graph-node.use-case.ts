import { UpdateGraphNode } from '../../../domain/repositories/graph-node.repository';
import { GraphNode } from '../../../domain/entities/graph-node.entity';
import { CreateGraphNodeDTO } from '../../../domain/object-values/graph-node.dto';

export const updateGraphNodeUseCase = (updateGraphNode: UpdateGraphNode) => async (id: string, data: GraphNode) => {
  const result = await updateGraphNode(id, data);
  if (typeof result === 'undefined') {
    throw new Error('Graph node could not be updated.');
  }
  return GraphNode.create<GraphNode, CreateGraphNodeDTO>({
    id: result.id,
    name: result.name,
    neighbors: result.neighbors,
    coordinates: result.coordinates,
  });
};
