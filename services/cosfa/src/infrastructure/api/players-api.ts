import { config } from '@packages/shared';
import { createMongoDBClient } from '@packages/mongodb';
import { api, HttpRequest, withDatabaseConnection } from '@packages/api';
import { playerRepository } from '../repositories/player.repository';
import { PlayerModel } from '../schemas/player.schema';
import { createPlayerUseCase } from '../../application/use-cases/create-player.use-case';
import { deletePlayerUseCase } from '../../application/use-cases/delete-player.use-case';
import { getPlayerByIdUseCase } from '../../application/use-cases/get-player-by-id.use-case';
import { getPlayersUseCase } from '../../application/use-cases/get-players.use-case';
import { updatePlayerUseCase } from '../../application/use-cases/update-player.use-case';

const { databaseUri } = config();

const client = createMongoDBClient(PlayerModel);
const repository = playerRepository(client);

const playersApi = api();

playersApi.register(
  'POST',
  '/players',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => createPlayerUseCase(repository.createPlayer)(request.body)
);

playersApi.register(
  'GET',
  '/players/{id}',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => getPlayerByIdUseCase(repository.getById)(request.pathParameters?.id as string)
);

playersApi.register(
  'GET',
  '/players',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => getPlayersUseCase(repository.getPlayers)({})
);

playersApi.register(
  'PUT',
  '/players/{id}',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) =>
    updatePlayerUseCase(repository.updatePlayer)(request.pathParameters?.id as string, request.body)
);

playersApi.register(
  'DELETE',
  '/players/{id}',
  withDatabaseConnection(client.connect, databaseUri),
  async (request: HttpRequest) => deletePlayerUseCase(repository.deletePlayer)(request.pathParameters?.id as string)
);

export const handler = async (input: HttpRequest) => playersApi.execute(input);
