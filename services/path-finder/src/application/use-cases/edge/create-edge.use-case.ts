import { CreateEdge } from '../../../domain/repositories/edge.repository';
import { CreateEdgeDTO } from '../../../domain/object-values/edge.dto';
import { Edge } from '../../../domain/entities/edge.entity';

export const createEdgeUseCase = (createEdge: CreateEdge) => async (input: Edge) => {
  const result = await createEdge(input);
  return Edge.create<Edge, CreateEdgeDTO>({
    id: result.id,
    from: result.from,
    target: result.target,
    cost: result.cost,
  });
};
