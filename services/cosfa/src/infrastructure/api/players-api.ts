import { config } from '@packages/shared';
import { createMongoDBClient } from '@packages/mongodb';
import { api, HttpRequest, withDatabaseConnection } from '@packages/api';
import { PlayerModel } from '../schemas/player.schema';
import { createPlayerUseCase } from '../../application/use-cases/create-player.use-case';
import { deletePlayerUseCase } from '../../application/use-cases/delete-player.use-case';
import { getPlayerByIdUseCase } from '../../application/use-cases/get-player-by-id.use-case';
import { getPlayersUseCase } from '../../application/use-cases/get-players.use-case';
import { updatePlayerUseCase } from '../../application/use-cases/update-player.use-case';
import { playerRepositoryBuilder } from '../repositories/player.repository';

const { databaseUri } = config();

const client = createMongoDBClient(PlayerModel);
const playerRepository = playerRepositoryBuilder(client);

const playersApi = api();

playersApi.register(
  'POST',
  '/players',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => createPlayerUseCase(playerRepository.createPlayer)(request.body)
);

playersApi.register(
  'GET',
  '/players/{id}',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => getPlayerByIdUseCase(playerRepository.getById)(request.pathParameters?.id as string)
);

playersApi.register(
  'GET',
  '/players',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => getPlayersUseCase(playerRepository.getPlayers)({})
);

playersApi.register(
  'PUT',
  '/players/{id}',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) =>
    updatePlayerUseCase(playerRepository.updatePlayer)(request.pathParameters?.id as string, request.body)
);

playersApi.register(
  'DELETE',
  '/players/{id}',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) =>
    deletePlayerUseCase(playerRepository.deletePlayer)(request.pathParameters?.id as string)
);

export const handler = async (input: HttpRequest) => playersApi.execute(input);
