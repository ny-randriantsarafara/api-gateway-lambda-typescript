import { GetGraphNodeById } from '../../../domain/repositories/graph-node.repository';
import { GraphNode } from '../../../domain/entities/graph-node.entity';
import { CreateGraphNodeDTO } from '../../../domain/object-values/graph-node.dto';

export const getGraphNodeByIdUseCase = (getGraphNode: GetGraphNodeById) => async (id: string) => {
  const result = await getGraphNode(id);
  if (typeof result === 'undefined') {
    throw new Error('Graph node not found');
  }
  return GraphNode.create<GraphNode, CreateGraphNodeDTO>({
    id: result.id,
    name: result.name,
    neighbors: result.neighbors,
    coordinates: result.coordinates,
  });
};
