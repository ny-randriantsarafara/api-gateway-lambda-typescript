import { CreatePlayerDTO, Player } from '../entities/player.entity';

export type PlayerFilters = Record<string, any>;
export type Get = (filters?: PlayerFilters) => Promise<Player[]>;
export type GetById = (id: string) => Promise<Player>;
export type Create = (data: CreatePlayerDTO) => Promise<Player>;
export type Update = (id: string, data: CreatePlayerDTO) => Promise<Player>;
export type Delete = (id: string) => Promise<void>;

export type PlayerRepository = {
  get: Get;
  create: Create;
  getById: GetById;
  update: Update;
  delete: Delete;
};
