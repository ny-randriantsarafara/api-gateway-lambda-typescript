import { Criteria } from '@packages/mongodb';
import { CreatePlayerDTO, Player } from '../entities/player.entity';
import { ListResponse } from '@packages/api';

export type PlayerCriteria = Criteria<Player>;
export type GetPlayers = (criteria: PlayerCriteria, fieldFilters: string[]) => Promise<ListResponse<Player>>;
export type GetFiltersValues = (fieldFilters: string[]) => Promise<Record<string, any>>;
export type GetPlayerById = (id: string) => Promise<Player>;
export type CreatePlayer = (data: CreatePlayerDTO) => Promise<Player>;
export type UpdatePlayer = (id: string, data: CreatePlayerDTO) => Promise<Player>;
export type DeletePlayer = (id: string) => Promise<void>;

export type PlayerRepository = {
  get: GetPlayers;
  getFiltersValues: GetFiltersValues;
  create: CreatePlayer;
  getById: GetPlayerById;
  update: UpdatePlayer;
  delete: DeletePlayer;
};
