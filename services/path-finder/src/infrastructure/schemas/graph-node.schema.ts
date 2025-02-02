import { model, Schema } from 'mongoose';
import { GraphNode } from '../../domain/entities/graph-node.entity';
import { LocationSchema } from './location.schema';

export type GraphNodeSchemaDTO = Pick<GraphNode, 'name' | 'neighbors'> & {
  location: { type: string; coordinates: [number, number] };
};

export const GRAPH_NODE_SCHEMA_NAME = 'GraphNode';

const GraphNodeSchema = new Schema<GraphNodeSchemaDTO>({
  name: { type: String, required: true },
  location: { type: LocationSchema, required: true },
});

export const GraphNodeModel = model<GraphNodeSchemaDTO>(GRAPH_NODE_SCHEMA_NAME, GraphNodeSchema);
