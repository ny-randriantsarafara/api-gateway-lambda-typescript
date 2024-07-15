import { Identifier } from '../object-values/identifier.type';
import { Edge } from './edge.entity';

export class GraphNode {
  id: Identifier;
  name: string;
  neighbors: Edge[];

  constructor(id: Identifier, name: string, neighbors: Edge[]) {
    this.id = id;
    this.name = name;
    this.neighbors = neighbors;
  }
}
