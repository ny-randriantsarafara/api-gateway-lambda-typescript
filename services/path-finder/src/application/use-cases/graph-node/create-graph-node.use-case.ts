import { CreateGraphNode } from '../../../domain/repositories/graph-node.repository';
import { GraphNode } from '../../../domain/entities/graph-node.entity';
import {CreateGraphNodeDTO} from "../../../domain/object-values/graph-node.dto";

export const createGraphNodeUseCase = (createGraphNode: CreateGraphNode) => async (data: GraphNode) => {
  const result = await createGraphNode(data);
  return GraphNode.create<GraphNode, CreateGraphNodeDTO>({
    id: result.id,
    name: result.name,
    neighbors: result.neighbors,
  });
};
