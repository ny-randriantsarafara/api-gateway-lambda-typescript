import { GraphNode } from './types';

const buildPath = (cameFrom: Map<GraphNode, GraphNode>, current: GraphNode): GraphNode[] => {
  const path = [current];
  while (cameFrom.has(current)) {
    current = cameFrom.get(current)!;
    path.push(current);
  }
  return path.reverse();
};

export const aStar = (nodes: GraphNode[], start: GraphNode, end: GraphNode): GraphNode[] | null => {
  const openSet = new Set<GraphNode>([start]);
  const cameFrom = new Map<GraphNode, GraphNode>();

  // Cost from start to node
  const gScore = new Map<GraphNode, number>();
  gScore.set(start, 0);

  // Estimated cost from start to end through node
  const fScore = new Map<GraphNode, number>();
  fScore.set(start, start.estimatedCostToGoal);

  while (openSet.size > 0) {
    const current: GraphNode = [...Array.from(openSet)].reduce((a, c) => {
      if (fScore.get(a)! < (fScore.get(c)! || Infinity)) {
        return a;
      }
      return c;
    });

    if (current.id === end.id) {
      return buildPath(cameFrom, current);
    }

    openSet.delete(current);

    for (const neighbor of current.neighbors) {
      const tentativeGScore = gScore.get(current)! + neighbor.cost.costFromParent;
      const neighborNode = nodes.find(node => node.id === neighbor.node);

      if (typeof neighborNode === 'undefined') {
        throw new Error(`Node ${neighbor.node} not found`);
      }

      if (tentativeGScore < (gScore.get(neighborNode) || Infinity)) {
        cameFrom.set(neighborNode, current);
        gScore.set(neighborNode, tentativeGScore);
        fScore.set(neighborNode, tentativeGScore + neighbor.cost.estimatedCostToGoal);
        openSet.add(neighborNode);
      }
    }
  }

  return null;
};
