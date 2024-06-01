import { model, Schema } from 'mongoose';
import { Player } from '../../domain/entities/player.entity';

const PlayerSchema = new Schema<Player>({
  id: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
});

PlayerSchema.path('id');

export const PlayerModel = model<Player>('Player', PlayerSchema);
