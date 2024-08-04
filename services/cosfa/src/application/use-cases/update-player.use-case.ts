import { UpdatePlayer } from '../../domain/repositories/player.repository';
import { CreatePlayerDTO, Player } from '../../domain/entities/player.entity';

export const updatePlayerUseCase =
  (updatePlayer: UpdatePlayer) =>
    async (id: string, player: Player): Promise<Player | undefined> => {
      const playerDbModel = await updatePlayer(id, player);
      return Player.create<Player, CreatePlayerDTO>(playerDbModel);
    };
