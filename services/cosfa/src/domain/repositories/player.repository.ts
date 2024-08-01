import { CreatePlayerDTO, Player } from '../entities/player.entity';

export type PlayerFilters = Record<string, any>;
export type GetPlayers = (filters?: PlayerFilters) => Promise<Player[]>;
export type GetPlayerById = (id: string) => Promise<Player>;
export type CreatePlayer = (data: CreatePlayerDTO) => Promise<Player>;
export type UpdatePlayer = (id: string, data: CreatePlayerDTO) => Promise<Player>;
export type DeletePlayer = (id: string) => Promise<void>;

export type PlayerRepository = {
  get: GetPlayers;
  create: CreatePlayer;
  getById: GetPlayerById;
  update: UpdatePlayer;
  delete: DeletePlayer;
};
