import { CreatePlayerDTO, Player } from '../../domain/entities/player.entity';
import { GetPlayerById } from '../../domain/repositories/player.repository';

export const getPlayerByIdUseCase = (getPlayerById: GetPlayerById) => async (id: string) => {
  const playerDbModel = await getPlayerById(id);
  return Player.create<Player, CreatePlayerDTO>(playerDbModel);
};
