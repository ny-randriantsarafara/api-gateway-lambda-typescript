import { MongoDBClient, repositoryBuilder } from '@packages/mongodb';
import { Category } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../domain/repositories/category.repository';

export const categoryRepository = (client: MongoDBClient): CategoryRepository => ({
  ...repositoryBuilder<Category>(client),
});
