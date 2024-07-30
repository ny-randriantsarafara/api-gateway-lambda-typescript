import { CreatePlayerDTO, Player } from '../../domain/entities/player.entity';
import { GetPlayers } from '../../domain/repositories/player.repository';

export const getPlayersUseCase =
  (getPlayers: GetPlayers) =>
  async (input: any): Promise<Player[]> => {
    try {
      const playersDbModel = await getPlayers(input);
      return playersDbModel.map(player => Player.create<Player, CreatePlayerDTO>(player));
    } catch (error) {
      // TODO: Handle error correctly
      throw error;
    }
  };
