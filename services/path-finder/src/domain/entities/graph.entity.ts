import { Identifier } from '../object-values/identifier.type';
import { Edge } from './edge.entity';
import { GraphNode } from './graph-node.entity';

export class Graph {
  nodes: Map<Identifier, GraphNode>;

  constructor() {
    this.nodes = new Map();
  }

  addNode(node: GraphNode) {
    this.nodes.set(node.id, node);
  }

  addEdge(from: Identifier, to: Identifier, cost: number = 1) {
    let fromNode = this.nodes.get(from);
    let toNode = this.nodes.get(to);
    if (fromNode && toNode) {
      fromNode.neighbors.push(new Edge(toNode, cost));
      toNode.neighbors.push(new Edge(fromNode, cost));
    }
  }

  findShortestPath(
    startId: Identifier,
    goalId: Identifier,
    heuristic: (a: GraphNode, b: GraphNode) => number
  ): Identifier[] | null {
    console.log(`Finding shortest path from ${startId} to ${goalId}`);
    const openSet = new Set<GraphNode>();
    const cameFrom = new Map<GraphNode, GraphNode>();

    const gScore = new Map<GraphNode, number>();
    const fScore = new Map<GraphNode, number>();

    const visited = new Set<GraphNode>();

    const startNode = this.nodes.get(startId);
    const goalNode = this.nodes.get(goalId);

    if (!startNode || !goalNode) {
      return null;
    }

    gScore.set(startNode, 0);
    fScore.set(startNode, heuristic(startNode, goalNode));

    openSet.add(startNode);

    while (openSet.size > 0) {
      let current = [...openSet].reduce((a, b) => (fScore.get(a)! < fScore.get(b)! ? a : b));

      if (current === goalNode) {
        const path = [];
        while (current) {
          path.unshift(current.id);
          current = cameFrom.get(current)!;
        }
        return path;
      }

      openSet.delete(current);
      visited.add(current);

      for (const edge of current.neighbors) {
        const neighbor = edge.target;

        if (visited.has(neighbor)) continue;

        const tentativeGScore = gScore.get(current)! + edge.cost;

        if (tentativeGScore < (gScore.get(neighbor) || Infinity)) {
          cameFrom.set(neighbor, current);
          gScore.set(neighbor, tentativeGScore);
          fScore.set(neighbor, gScore.get(neighbor)! + heuristic(neighbor, goalNode));

          if (!openSet.has(neighbor)) {
            openSet.add(neighbor);
          }
        }
      }
    }

    return null;
  }
}
