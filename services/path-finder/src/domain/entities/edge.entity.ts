import { GraphNode } from './graph-node.entity';

export class Edge {
  from: GraphNode;
  target: GraphNode;
  cost: number;

  constructor(from: GraphNode, target: GraphNode, cost: number) {
    this.from = from;
    this.target = target;
    this.cost = cost;
  }
}
