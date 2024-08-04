import { ListResponse } from '@packages/api';
import { Category } from '../entities/category.entity';

export type CategoryCriteria = Record<string, any>;
export type GetCategories = (criteria: CategoryCriteria, fieldFilters: string[]) => Promise<ListResponse<Category>>;
export type GetFiltersValues = (fieldFilters: string[]) => Promise<Record<string, any>>;
export type GetCategoryById = (id: string) => Promise<Category | undefined>;
export type CreateCategory = (data: Category) => Promise<Category>;
export type UpdateCategory = (id: string, data: Category) => Promise<Category | undefined>;
export type DeleteCategory = (id: string) => Promise<void>;

export type CategoryRepository = {
  get: GetCategories;
  getFiltersValues: GetFiltersValues;
  create: CreateCategory;
  getById: GetCategoryById;
  update: UpdateCategory;
  delete: DeleteCategory;
};
