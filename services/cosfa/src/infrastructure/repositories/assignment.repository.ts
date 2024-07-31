import { MongoDBClient } from '@packages/mongodb';
import { Assignment } from '../../domain/entities/assignment.entity';
import { AssignmentRepository } from '../../domain/repositories/assignment.repository';

const mapAssignment = (assignment: Assignment & { _id: string }) => {
  return {
    ...assignment,
    id: assignment._id,
  };
};

export const assignmentRepositoryBuilder = (client: MongoDBClient): AssignmentRepository => ({
  createAssignment: async (assignment: Assignment) => {
    return mapAssignment(await client.create(assignment));
  },
  getCategories: async () => {
    return (await client.getAll({})).map(
      (
        item: {
          _id: any;
        } & Assignment
      ) => mapAssignment(item)
    );
  },
  getById: async (id: string) => {
    const assignment = await client.getById(id);
    return mapAssignment(assignment);
  },
  updateAssignment: async (id: string, assignment: Assignment) => {
    const updatedAssignment = await client.update(id, assignment);
    return mapAssignment(updatedAssignment);
  },
  deleteAssignment: async (id: string) => {
    const assignment = await client.getById(id);
    await client.delete(id);
    return assignment;
  },
});
