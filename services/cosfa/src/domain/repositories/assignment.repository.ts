import { Assignment } from '../entities/assignment.entity';
import { ListResponse } from '@packages/api';

export type AssignmentCriteria = Record<string, any>;
export type GetAssignments = (
  criteria: AssignmentCriteria,
) => Promise<ListResponse<Assignment>>;
export type GetAssignmentById = (id: string) => Promise<Assignment | undefined>;
export type CreateAssignment = (data: Assignment) => Promise<Assignment>;
export type BulkCreateAssignments = (assignments: Assignment[]) => Promise<Assignment[]>;
export type UpdateAssignment = (id: string, data: Assignment) => Promise<Assignment | undefined>;
export type DeleteAssignment = (id: string) => Promise<void>;

export type AssignmentRepository = {
  get: GetAssignments;
  create: CreateAssignment;
  createMany: BulkCreateAssignments;
  getById: GetAssignmentById;
  update: UpdateAssignment;
  delete: DeleteAssignment;
};
