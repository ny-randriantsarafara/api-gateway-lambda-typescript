import { DeleteEdge } from '../../../domain/repositories/edge.repository';

export const deleteEdgeUseCase = (deleteEdge: DeleteEdge) => async (id: string) => {
  const result = await deleteEdge(id);
};
