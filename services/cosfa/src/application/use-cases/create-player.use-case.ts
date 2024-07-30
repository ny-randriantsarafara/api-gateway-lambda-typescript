import { CreatePlayer } from '../../domain/repositories/player.repository';
import { CreatePlayerDTO, Player } from '../../domain/entities/player.entity';

export const createPlayerUseCase = (createPlayer: CreatePlayer) => async (input: any) => {
  try {
    const playerDbModel = await createPlayer(input);
    return Player.create<Player, CreatePlayerDTO>(playerDbModel);
  } catch (error) {
    // TODO: Handle error correctly
    throw error;
  }
};
