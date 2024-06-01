import { config } from '@packages/shared';
import { createMongoDBClient } from '@packages/mongodb';
import { api, HttpRequest, withDatabaseConnection } from '@packages/api';

import { getPlayersUseCase } from '../../application/use-cases/get-players.use-case';
import { playerRepository } from '../repositories/player.repository';
import { PlayerModel } from '../schemas/player.schema';
import { Player } from '../../domain/entities/player.entity';

const { databaseUri } = config();

const client = createMongoDBClient<Player>(PlayerModel);
const repository = playerRepository(client);

export const handler = api(withDatabaseConnection(client.connect, databaseUri), async (request: HttpRequest) =>
  getPlayersUseCase(repository.getPlayers)({})
);
