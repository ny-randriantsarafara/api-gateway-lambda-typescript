import { MongoDBClient, repositoryBuilder } from '@packages/mongodb';
import { PlayerRepository } from '../../domain/repositories/player.repository';
import { Player } from '../../domain/entities/player.entity';

export const playerRepository = (client: MongoDBClient): PlayerRepository => ({ ...repositoryBuilder<Player>(client) });
