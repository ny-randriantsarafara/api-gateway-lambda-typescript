import { GraphNode } from './graph-node.entity';

export class Edge {
  target: GraphNode;
  cost: number;

  constructor(target: GraphNode, cost: number) {
    this.target = target;
    this.cost = cost;
  }
}
