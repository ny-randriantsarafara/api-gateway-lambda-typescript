import { GetGraphNodes } from '../../../domain/repositories/graph-node.repository';
import { GraphNode } from '../../../domain/entities/graph-node.entity';

export const getGraphNodesUseCase = (getGraphNodes: GetGraphNodes) => async () => {
  const result = await getGraphNodes();
  return result.map(node => new GraphNode(node.id, node.name, node.neighbors));
};
