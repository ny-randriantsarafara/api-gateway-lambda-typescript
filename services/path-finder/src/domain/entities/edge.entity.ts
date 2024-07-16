import { GraphNode } from './graph-node.entity';
import { Identifier } from '../object-values/identifier.type';

export class Edge {
  id: Identifier;
  from: GraphNode;
  target: GraphNode;
  cost: number;

  constructor(id: Identifier, from: GraphNode, target: GraphNode, cost: number) {
    this.id = id;
    this.from = from;
    this.target = target;
    this.cost = cost;
  }
}
