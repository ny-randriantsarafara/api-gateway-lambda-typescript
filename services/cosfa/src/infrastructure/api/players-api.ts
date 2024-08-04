import { config } from '@packages/shared';
import { createMongoDBClient } from '@packages/mongodb';
import { api, HttpRequest, withDatabaseConnection } from '@packages/api';
import { PlayerModel } from '../schemas/player.schema';
import { createPlayerUseCase } from '../../application/use-cases/create-player.use-case';
import { deletePlayerUseCase } from '../../application/use-cases/delete-player.use-case';
import { getPlayerByIdUseCase } from '../../application/use-cases/get-player-by-id.use-case';
import { getPlayersUseCase } from '../../application/use-cases/get-players.use-case';
import { updatePlayerUseCase } from '../../application/use-cases/update-player.use-case';
import { playerRepository } from '../repositories/player.repository';

const { databaseUri } = config();

const client = createMongoDBClient(PlayerModel);
const repository = playerRepository(client);

const playersApi = api();

playersApi.register(
  'POST',
  '/players',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => createPlayerUseCase(repository.create)(request.body),
);

playersApi.register(
  'GET',
  '/players/{id}',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => getPlayerByIdUseCase(repository.getById)(request.pathParameters?.id as string),
);

playersApi.register(
  'GET',
  '/players',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => getPlayersUseCase(repository.get)(request.queryStringParameters || {}),
);

playersApi.register(
  'GET',
  '/players/filters-values',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) =>
    repository.getFiltersValues((request.queryStringParameters?.fields?.split(',') || []) as string[]),
);

playersApi.register(
  'PUT',
  '/players/{id}',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) =>
    updatePlayerUseCase(repository.update)(request.pathParameters?.id as string, request.body),
);

playersApi.register(
  'DELETE',
  '/players/{id}',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => deletePlayerUseCase(repository.delete)(request.pathParameters?.id as string),
);

export const handler = async (input: HttpRequest) => playersApi.execute(input);
