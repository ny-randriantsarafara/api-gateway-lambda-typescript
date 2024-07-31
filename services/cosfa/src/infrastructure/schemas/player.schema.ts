import { model, Schema } from 'mongoose';
import { Player } from '../../domain/entities/player.entity';

const PlayerSchema = new Schema({
  id: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
});

export const PLAYER = 'Player';

export const PlayerModel = model<Player>(PLAYER, PlayerSchema);
