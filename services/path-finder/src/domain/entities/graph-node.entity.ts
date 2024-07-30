import { Identifier } from '../object-values/identifier.type';
import { BaseEntity } from './base.entity';
import { Edge } from './edge.entity';
import { CreateGraphNodeDTO } from '../object-values/graph-node.dto';

export class GraphNode extends BaseEntity<GraphNode> {
  id: Identifier;
  name: string;
  coordinates: [number, number]; // longitude, latitude
  neighbors: Edge[];

  constructor(options: CreateGraphNodeDTO) {
    super(options);
    Object.assign(this, options);
  }
}
