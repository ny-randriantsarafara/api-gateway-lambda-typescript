import { CreateGraphNode } from '../../../domain/repositories/graph-node.repository';
import { GraphNode } from '../../../domain/entities/graph-node.entity';

export const createGraphNodeUseCase = (createGraphNode: CreateGraphNode) => async (data: GraphNode) => {
  const result = await createGraphNode(data);
  return new GraphNode(result.id, result.name, result.neighbors);
};
