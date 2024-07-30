import { Edge } from '../../../domain/entities/edge.entity';
import { UpdateEdge } from '../../../domain/repositories/edge.repository';
import { CreateEdgeDTO } from '../../../domain/object-values/edge.dto';

export const updateEdgeUseCase = (updateEdge: UpdateEdge) => async (id: string, input: Edge) => {
  const result = await updateEdge(id, input);
  if (typeof result === 'undefined') {
    throw new Error('Graph node could not be updated.');
  }
  return Edge.create<Edge, CreateEdgeDTO>({
    id: result.id,
    from: result.from,
    target: result.target,
    cost: result.cost,
  });
};
