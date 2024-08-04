import { GetGraphNodeById } from '../../../domain/repositories/graph-node.repository';
import { GetRoute } from '../../../infrastructure/repositories/osrm.repository';
import { Identifier } from '../../../domain/object-values/identifier.type';
import { RouteResponse } from './compute-cost.use-case.types';

export const computeCostUseCase =
  (getGraphNodeById: GetGraphNodeById, getRoute: GetRoute<RouteResponse>) =>
    async (fromNodeID: Identifier, toNodeID: Identifier): Promise<number> => {
      console.log(`Computing distance from ${fromNodeID} to ${toNodeID}`);

      const [fromNode, toNode] = await Promise.all([getGraphNodeById(fromNodeID), getGraphNodeById(toNodeID)]);

      console.log(`From node: ${JSON.stringify(fromNode)}`, `To node: ${JSON.stringify(toNode)}`);

      const {
        distances: [[distance]],
      } = await getRoute({ source: fromNode.coordinates, destination: toNode.coordinates });

      console.log(`Distance: ${distance}`);

      return distance;
    };