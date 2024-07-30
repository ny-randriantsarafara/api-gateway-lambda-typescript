import { model, Schema } from 'mongoose';
import { Edge } from '../../domain/entities/edge.entity';
import { GRAPH_NODE_SCHEMA_NAME } from './graph-node.schema';

export const EDGE_SCHEMA_NAME = 'Edge';

const EdgeSchema = new Schema<Edge>({
  from: { type: Schema.Types.ObjectId, ref: GRAPH_NODE_SCHEMA_NAME, required: true },
  target: { type: Schema.Types.ObjectId, ref: GRAPH_NODE_SCHEMA_NAME, required: true },
  cost: { type: Number, required: true },
});

export const EdgeModel = model<Edge>(EDGE_SCHEMA_NAME, EdgeSchema);
