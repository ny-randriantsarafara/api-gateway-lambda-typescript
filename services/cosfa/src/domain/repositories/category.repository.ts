import { Category } from '../entities/category.entity';

export type CategoryFilters = Record<string, any>;
export type GetCategories = (filters?: CategoryFilters) => Promise<Category[]>;
export type GetCategoryById = (id: string) => Promise<Category | undefined>;
export type CreateCategory = (data: Category) => Promise<Category>;
export type UpdateCategory = (id: string, data: Category) => Promise<Category | undefined>;
export type DeleteCategory = (id: string) => Promise<void>;

export type CategoryRepository = {
  get: GetCategories;
  create: CreateCategory;
  getById: GetCategoryById;
  update: UpdateCategory;
  delete: DeleteCategory;
};
