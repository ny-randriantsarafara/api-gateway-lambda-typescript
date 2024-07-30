import { MongoDBClient } from '@packages/mongodb';
import { CategoryRepository, Filters } from '../../domain/repositories/category.repository';
import { Category } from '../../domain/entities/category.entity';

const removeId = ({ _id, ...category }: Category & { _id: any }) => player;

export const categoryRepository = (client: MongoDBClient): CategoryRepository => ({
  createCategory: async (category: Category) => {
    return removeId(await client.create(category));
  },
  getCategories: async (filters: Filters = {}) => {
    return (await client.getAll(filters)).map((item: { _id: any } & Category) => removeId(item));
  },
  getById: async (id: string) => {
    const category = await client.getOne({ id });
    if (typeof category === 'undefined') {
      return;
    }
    return removeId(category);
  },
  updateCategory: async (id: string, category: Category) => {
    const existingCategory = await client.getOne({ id });
    if (typeof existingCategory === 'undefined') {
      return;
    }
    await client.update(existingCategory._id, category);
    const updatedCategory = await client.getOne({ id });
    return removeId(updatedCategory);
  },
  deleteCategory: async (id: string) => {
    const category = await client.getOne({ id });
    if (typeof category === 'undefined') {
      return;
    }
    await client.delete(category._id);
    return category;
  },
});
