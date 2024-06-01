import { MongoDBClient } from '@packages/mongodb';
import { Filters, PlayerRepository } from '../../domain/repositories/player.repository';
import { Player } from '../../domain/entities/player.entity';

const removeId = ({ _id, ...player }: Player & { _id: any }) => player;

export const playerRepository = (client: MongoDBClient<Player>): PlayerRepository => ({
  createPlayer: async (player: Player) => {
    return removeId(await client.create(player));
  },
  getPlayers: async (filters?: Filters) => {
    return (await client.getAll(filters)).map((item: { _id: any; } & Player) => removeId(item));
  },
  getById: async (id: string) => {
    const player = await client.getOne({ id });
    if (typeof player === 'undefined') {
      return;
    }
    return removeId(player);
  },
  updatePlayer: async (id: string, player: Player) => {
    const existingPlayer = await client.getOne({ id });
    if (typeof existingPlayer === 'undefined') {
      return;
    }
    await client.update(existingPlayer._id, player);
    const updatedPlayer = await client.getOne({ id });
    return removeId(updatedPlayer);
  },
  deletePlayer: async (id: string) => {
    const player = await client.getOne({ id });
    if (typeof player === 'undefined') {
      return;
    }
    await client.delete(player._id);
    return player;
  },
});
