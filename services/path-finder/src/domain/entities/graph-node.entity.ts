import { Identifier } from '../object-values/identifier.type';
import { Edge } from './edge.entity';

export class GraphNode {
  id: Identifier;
  neighbors: Edge[];

  constructor(id: Identifier, neighbors: Edge[]) {
    this.id = id;
    this.neighbors = neighbors;
  }
}
