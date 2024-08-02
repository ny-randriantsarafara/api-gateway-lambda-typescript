import { model, Schema } from 'mongoose';
import { Player } from '../../domain/entities/player.entity';

const AddressSchema = new Schema({
  streetNumber: { type: String },
  neighborHood: { type: String },
  district: { type: String },
  postalCode: { type: String },
  region: { type: String },
  country: { type: String },
});

const ContactSchema = new Schema({
  phoneNumbers: { type: [String] },
  emails: { type: [String] },
});

const PlayerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  address: { type: AddressSchema },
  contact: { type: ContactSchema },
});

export const PLAYER = 'Player';

export const PlayerModel = model<Player>(PLAYER, PlayerSchema);
