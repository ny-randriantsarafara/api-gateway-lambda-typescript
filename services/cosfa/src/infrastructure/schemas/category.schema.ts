import { model, Schema } from 'mongoose';
import { Category } from '../../domain/entities/category.entity';

const CategorySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  ageGroup: { type: Number, required: true },
  gender: { type: String, required: true },
  description: { type: String },
});

CategorySchema.path('id');

export const CategoryModel = model<Category>('Category', CategorySchema);
