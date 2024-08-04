import { GetGraphNodes } from '../../../domain/repositories/graph-node.repository';
import { GraphNode } from '../../../domain/entities/graph-node.entity';
import { CreateGraphNodeDTO } from '../../../domain/object-values/graph-node.dto';

export const getGraphNodesUseCase = (getGraphNodes: GetGraphNodes) => async () => {
  const result = await getGraphNodes();
  return result.map(node =>
    GraphNode.create<GraphNode, CreateGraphNodeDTO>({
      id: node.id,
      name: node.name,
      neighbors: node.neighbors,
      coordinates: node.coordinates,
    }),
  );
};
