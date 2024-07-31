import { MongoDBClient, repositoryBuilder } from '@packages/mongodb';
import { AssignmentRepository } from '../../domain/repositories/assignment.repository';
import { Assignment } from '../../domain/entities/assignment.entity';

export const assignmentRepository = (client: MongoDBClient): AssignmentRepository => ({
  ...repositoryBuilder<Assignment>(client),
});
