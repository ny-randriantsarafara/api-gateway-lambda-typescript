import { Player } from '../../domain/entities/player.entity';
import { GetPlayers } from '../../domain/repositories/player.repository';
import { ListResponse } from '@packages/api';

export const getPlayersUseCase =
  (getPlayers: GetPlayers) =>
  async (input: any): Promise<ListResponse<Player>> => {
    try {
      const result = await getPlayers(input, [
        'address.neighborhood',
        'address.district',
        'address.region',
        'address.country',
      ]);
      return { ...result, data: result.data.map(player => Player.create(player)) };
    } catch (error) {
      // TODO: Handle error correctly
      throw error;
    }
  };
