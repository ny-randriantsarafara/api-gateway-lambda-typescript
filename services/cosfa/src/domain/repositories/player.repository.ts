import { Player } from '../entities/player.entity';

export type Filters = Record<string, any>;
export type GetPlayers = (filters?: Filters) => Promise<Player[]>;
export type GetPlayerById = (id: string) => Promise<Player | undefined>;
export type CreatePlayer = (data: Player) => Promise<Player>;
export type UpdatePlayer = (id: string, data: Player) => Promise<Player | undefined>;
export type DeletePlayer = (id: string) => Promise<void>;

export type PlayerRepository = {
  getPlayers: GetPlayers;
  createPlayer: CreatePlayer;
  getById: GetPlayerById;
  updatePlayer: UpdatePlayer;
  deletePlayer: DeletePlayer;
};