import { model, Schema } from 'mongoose';
import { Category } from '../../domain/entities/category.entity';

const CategorySchema = new Schema({
  name: { type: String, required: true },
  ageGroup: { type: Number, required: true },
  gender: { type: String, required: true },
  description: { type: String },
});

export const CATEGORY = 'Category';

export const CategoryModel = model<Category>(CATEGORY, CategorySchema);
