import { api, HttpRequest, withDatabaseConnection } from '@packages/api';
import { deletePlayerUseCase } from '../../application/use-cases/delete-player.use-case';
import { playerRepository } from '../repositories/player.repository';
import { createMongoDBClient } from '@packages/mongodb';
import { Player } from '../../domain/entities/player.entity';
import { PlayerModel } from '../schemas/player.schema';
import { config } from '@packages/shared';

const { databaseUri } = config();

const client = createMongoDBClient<Player>(PlayerModel);
const repository = playerRepository(client);

export const handler = api(withDatabaseConnection(client.connect, databaseUri), async (request: HttpRequest) =>
  deletePlayerUseCase(repository.deletePlayer)(request.pathParameters?.id as string)
);
