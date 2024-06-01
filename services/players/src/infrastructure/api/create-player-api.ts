import { config } from '@packages/shared';
import { createMongoDBClient } from '@packages/mongodb';
import { api, HttpRequest, withDatabaseConnection } from '@packages/api';
import { playerRepository } from '../repositories/player.repository';
import { PlayerModel } from '../schemas/player.schema';
import { createPlayerUseCase } from '../../application/use-cases/create-player.use-case';

const { databaseUri } = config();

const client = createMongoDBClient(PlayerModel);
const repository = playerRepository(client);

export const handler = api(withDatabaseConnection(client.connect, databaseUri), async (request: HttpRequest) =>
  createPlayerUseCase(repository.createPlayer)(request.body)
);
