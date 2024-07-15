import { model, Schema } from 'mongoose';
import { GraphNode } from '../../domain/entities/graph-node.entity';

const GraphNodeSchema = new Schema<GraphNode>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  neighbors: [{ type: Schema.Types.ObjectId, ref: 'Edge' }],
});

GraphNodeSchema.path('id');

export const GraphNodeModel = model<GraphNode>('GraphNode', GraphNodeSchema);
