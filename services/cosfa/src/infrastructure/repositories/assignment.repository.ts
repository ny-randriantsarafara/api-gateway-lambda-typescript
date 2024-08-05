import { mapDBModel, MongoDBClient, repositoryBuilder } from '@packages/mongodb';
import { AssignmentRepository } from '../../domain/repositories/assignment.repository';
import { Assignment } from '../../domain/entities/assignment.entity';

export const assignmentRepository = (client: MongoDBClient): AssignmentRepository => ({
  ...repositoryBuilder<Assignment>(client),
  createMany: async (assignments: Assignment[]): Promise<Assignment[]> => {
    const created = await client.createMany(assignments);
    return created.map(item => mapDBModel(item));
  },
});
