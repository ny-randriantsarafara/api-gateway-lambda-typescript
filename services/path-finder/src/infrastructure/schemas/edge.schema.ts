import { Schema, model } from 'mongoose';
import { Edge } from '../../domain/entities/edge.entity';

const EdgeSchema = new Schema<Edge>({
  from: { type: Schema.Types.ObjectId, required: true },
  target: { type: Schema.Types.ObjectId, required: true },
  cost: { type: Number, required: true },
});

export const EdgeModel = model<Edge>('Edge', EdgeSchema);
