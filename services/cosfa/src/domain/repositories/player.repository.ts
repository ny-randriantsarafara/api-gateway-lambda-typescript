import { CreatePlayerDTO, Player } from '../entities/player.entity';
import {Criteria} from "@packages/mongodb";

export type PlayerFilters = Criteria<Player>;
export type GetPlayers = (filters: PlayerFilters) => Promise<Player[]>;
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
