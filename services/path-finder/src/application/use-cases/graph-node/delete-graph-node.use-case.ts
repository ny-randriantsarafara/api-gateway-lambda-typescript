import { DeleteGraphNode } from '../../../domain/repositories/graph-node.repository';

export const deleteGraphNodeUseCase = (deleteGraphNode: DeleteGraphNode) => async (id: string) => {
  const result = await deleteGraphNode(id);
};
