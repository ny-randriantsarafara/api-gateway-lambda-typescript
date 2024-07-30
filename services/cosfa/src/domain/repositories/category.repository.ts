import { Category } from '../entities/category.entity';

export type Filters = Record<string, any>;
export type GetCategories = (filters?: Filters) => Promise<Category[]>;
export type GetCategoryById = (id: string) => Promise<Category | undefined>;
export type CreateCategory = (data: Category) => Promise<Category>;
export type UpdateCategory = (id: string, data: Category) => Promise<Category | undefined>;
export type DeleteCategory = (id: string) => Promise<void>;

export type CategoryRepository = {
  getCategories: GetCategories;
  createCategory: CreateCategory;
  getById: GetCategoryById;
  updateCategory: UpdateCategory;
  deleteCategory: DeleteCategory;
};
