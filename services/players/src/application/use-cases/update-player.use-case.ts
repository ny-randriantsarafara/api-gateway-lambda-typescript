import { UpdatePlayer } from '../../domain/repositories/player.repository';
import { Player } from '../../domain/entities/player.entity';

export const updatePlayerUseCase = (updatePlayer: UpdatePlayer) => async (id: string, player: Player): Promise<Player | undefined> => {
  return updatePlayer(id, player);
};