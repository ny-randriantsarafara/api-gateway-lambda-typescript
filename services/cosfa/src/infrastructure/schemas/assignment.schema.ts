import { model, Schema } from 'mongoose';
import { Assignment } from '../../domain/entities/assignment.entity';
import { PLAYER } from './player.schema';
import { CATEGORY } from './category.schema';

const AssignmentSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: PLAYER, required: true },
  category: { type: Schema.Types.ObjectId, ref: CATEGORY, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export const ASSIGNMENT = 'Assignment';

export const AssignmentModel = model<Assignment>(ASSIGNMENT, AssignmentSchema);
