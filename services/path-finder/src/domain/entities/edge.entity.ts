import { GraphNode } from './graph-node.entity';
import { Identifier } from '../object-values/identifier.type';
import { BaseEntity } from './base.entity';
import { CreateEdgeDTO } from '../object-values/edge.dto';

export class Edge extends BaseEntity<Edge> {
  id: Identifier;
  from: GraphNode;
  target: GraphNode;
  cost: number;

  constructor(options: CreateEdgeDTO) {
    super(options);
    Object.assign(this, options);
  }
}
