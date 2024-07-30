export const deletePlayerUseCase = (deletePlayer: (id: string) => Promise<void>) => async (id: string) => {
  await deletePlayer(id);
};