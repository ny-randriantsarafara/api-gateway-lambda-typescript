import { Player } from '../../domain/entities/player.entity';
import { GetPlayers } from '../../domain/repositories/player.repository';
import { BaseEntity } from '@packages/shared';

export const getPlayersUseCase = (getPlayers: GetPlayers) => async (input: any): Promise<BaseEntity[]> => {
  try {
    const playersDbModel = await getPlayers(input);
    return playersDbModel.map((player) => Player.create(player));
  } catch (error) {
    // TODO: Handle error correctly
    throw error;
  }
};
