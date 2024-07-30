import { GetPlayerById } from '../../domain/repositories/player.repository';

export const getPlayerByIdUseCase = (getPlayerById: GetPlayerById) => async (id: string) => {
  const players = await getPlayerById(id);
  return players;
};