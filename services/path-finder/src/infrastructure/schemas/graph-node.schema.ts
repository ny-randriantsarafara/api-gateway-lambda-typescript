import { model, Schema } from 'mongoose';
import { GraphNode } from '../../domain/entities/graph-node.entity';

const GraphNodeSchema = new Schema<GraphNode>({
  name: { type: String, required: true },
});

export const GraphNodeModel = model<GraphNode>('GraphNode', GraphNodeSchema);
