import { api, HttpRequest, withDatabaseConnection } from '@packages/api';
import { updatePlayerUseCase } from '../../application/use-cases/update-player.use-case';
import { config } from '@packages/shared';
import { createMongoDBClient } from '@packages/mongodb';
import { Player } from '../../domain/entities/player.entity';
import { PlayerModel } from '../schemas/player.schema';
import { playerRepository } from '../repositories/player.repository';

const { databaseUri } = config();

const client = createMongoDBClient<Player>(PlayerModel);
const repository = playerRepository(client);

export const handler = api(withDatabaseConnection(client.connect, databaseUri), async (request: HttpRequest) =>
  updatePlayerUseCase(repository.updatePlayer)(request.pathParameters?.id as string, request.body)
);
