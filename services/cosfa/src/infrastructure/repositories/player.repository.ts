import { MongoDBClient } from '@packages/mongodb';
import { Player } from '../../domain/entities/player.entity';
import { PlayerRepository } from '../../domain/repositories/player.repository';

const mapPlayer = (player: Player & { _id: string }) => {
  return {
    ...player,
    id: player._id,
  };
};

export const playerRepositoryBuilder = (client: MongoDBClient): PlayerRepository => ({
  createPlayer: async (player: Player) => {
    return mapPlayer(await client.create(player));
  },
  getPlayers: async () => {
    return (await client.getAll({})).map(
      (
        item: {
          _id: any;
        } & Player
      ) => mapPlayer(item)
    );
  },
  getById: async (id: string) => {
    const player = await client.getById(id);
    return mapPlayer(player);
  },
  updatePlayer: async (id: string, player: Player) => {
    const updatedPlayer = await client.update(id, player);
    return mapPlayer(updatedPlayer);
  },
  deletePlayer: async (id: string) => {
    const player = await client.getById(id);
    await client.delete(id);
    return player;
  },
});
