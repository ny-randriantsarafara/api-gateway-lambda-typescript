import { api, HttpRequest, withDatabaseConnection } from '@packages/api';
import { createMongoDBClient } from '@packages/mongodb';
import { config } from '@packages/shared';
import { playerRepository } from '../repositories/player.repository';
import { PlayerModel } from '../schemas/player.schema';
import { Player } from '../../domain/entities/player.entity';
import { getPlayerByIdUseCase } from '../../application/use-cases/get-player-by-id.use-case';

const { databaseUri } = config();
const client = createMongoDBClient<Player>(PlayerModel);
const repository = playerRepository(client);

export const handler = api(withDatabaseConnection(client.connect, databaseUri), async (request: HttpRequest) =>
  getPlayerByIdUseCase(repository.getById)(request.pathParameters?.id as string)
);
