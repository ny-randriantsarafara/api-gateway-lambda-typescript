import { CreatePlayer } from '../../domain/repositories/player.repository';
import { Player } from '../../domain/entities/player.entity';

export const createPlayerUseCase = (createPlayer: CreatePlayer) => (input: any) => {
  try {
    const player = Player.create(input) as Player;
    return createPlayer(player);
  } catch (error) {
    // TODO: Handle error correctly
    throw error;
  }
};
