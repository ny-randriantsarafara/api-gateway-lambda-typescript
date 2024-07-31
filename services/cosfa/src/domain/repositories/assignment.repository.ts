import { Assignment } from '../entities/assignment.entity';

export type AssignmentFilters = Record<string, any>;
export type GetCategories = (filters?: AssignmentFilters) => Promise<Assignment[]>;
export type GetAssignmentById = (id: string) => Promise<Assignment | undefined>;
export type CreateAssignment = (data: Assignment) => Promise<Assignment>;
export type UpdateAssignment = (id: string, data: Assignment) => Promise<Assignment | undefined>;
export type DeleteAssignment = (id: string) => Promise<void>;

export type AssignmentRepository = {
  get: GetCategories;
  create: CreateAssignment;
  getById: GetAssignmentById;
  update: UpdateAssignment;
  delete: DeleteAssignment;
};
