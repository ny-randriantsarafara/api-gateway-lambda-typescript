import { MongoDBClient } from '@packages/mongodb';
import { Category } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../domain/repositories/category.repository';

const mapCategory = (category: Category & { _id: string }) => {
  return {
    ...category,
    id: category._id,
  };
};

export const categoryRepositoryBuilder = (client: MongoDBClient): CategoryRepository => ({
  createCategory: async (category: Category) => {
    return mapCategory(await client.create(category));
  },
  getCategories: async () => {
    return (await client.getAll({})).map(
      (
        item: {
          _id: any;
        } & Category
      ) => mapCategory(item)
    );
  },
  getById: async (id: string) => {
    const category = await client.getById(id);
    return mapCategory(category);
  },
  updateCategory: async (id: string, category: Category) => {
    const updatedCategory = await client.update(id, category);
    return mapCategory(updatedCategory);
  },
  deleteCategory: async (id: string) => {
    const category = await client.getById(id);
    await client.delete(id);
    return category;
  },
});
